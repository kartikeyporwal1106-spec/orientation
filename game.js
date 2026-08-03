/* ═══════════════════════════════════════════════════════════════
   UPSIFS MARIO PLATFORMER — 130 Batchmates & Engine Fixes
   Reliable Pipe Entry/Exit, Clean Controls & Student Name Reveal
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ═══════════════ CONFIG & GRID ═══════════════
  const TS = 16;           // Tile size (16x16)
  const ROWS = 14;         // Level height in tiles
  const COLS = 360;        // Expanded level width (~5760px) for 130 coins
  const INTERNAL_H = ROWS * TS; // 224px fixed internal height
  const GND = 12;          // Ground row index
  const GRAVITY = 0.36;
  const MAX_FALL = 6.5;
  const JUMP_VEL_1 = -5.8; // 1st Jump (Ground)
  const JUMP_VEL_2 = -5.0; // 2nd Jump (Mid-Air Double Jump)
  const WALK_ACC = 0.16;   // Smooth non-slippery acceleration
  const WALK_DEC = 0.15;
  const MAX_WALK = 2.0;    // Balanced speed sensitivity

  // Tile IDs
  const _ = 0, G = 1, D = 2, B = 3, Q = 4, U = 5;
  const P1 = 6, P2 = 7, P3 = 8, P4 = 9;      // Standard pipe
  const W1 = 10, W2 = 11;                      // Warp pipe top
  const FL = 12, FT = 13;                      // Flagpole
  const CW = 15, CT = 16, CD = 17, ST = 18;    // Castle & Stairs

  const SOLID = new Set([G, D, B, Q, U, P1, P2, P3, P4, W1, W2, CW, CT, CD, ST]);

  // ═══════════════ GAME STATE ═══════════════
  let cvs, ctx, cW = 320, cH = 224;
  let lvlCvs, lvlCtx;
  let grid = [];
  let gameState = 'start'; // start | play | die | pipe | flag | win | over
  let camX = 0;
  let frame = 0;
  let score = 0, coinCt = 0, lives = 3, timer = 600;
  let timerAcc = 0, dieTimer = 0;
  let tileCache = {};
  let overlay, overlayTitle, overlayText, overlaySub;

  // Jump Control Tracker (Max 2 jumps: Single = 1, Double = 2)
  let jumpCount = 0;
  let spacePrevPressed = false;

  // Player
  let P = {};
  // Entities
  let enemies = [], coins = [], popCoins = [], particles = [], fireworks = [], brickBits = [];

  // Pipe Warp Sequential Chain: Pipe 1 -> Pipe 2 -> Pipe 3 -> Pipe 4...
  let pipeList = []; // Stores column indices of warp pipes in order
  let pipeMap = {};  // Maps entry pipe col -> exit pipe col
  let pw = null;

  // Flagpole / Victory
  let fs = null, flagBannerRow = 3;

  // Background Parallax
  let bgClouds = [], bgHills = [];
  let imgs = {}, imgN = 0, imgDone = 0;
  let keys = {};
  let touchState = { left: false, right: false, jump: false, down: false };

  // ═══════════════ ASSET LOADING ═══════════════
  function ldImg(k, s) {
    imgN++;
    const i = new Image();
    i.onload = () => { imgs[k] = i; imgDone++; };
    i.onerror = () => imgDone++;
    i.src = s;
  }

  function loadAssets() {
    const c = 'assets/pixel-platformer/Tiles/Characters/';
    ldImg('pi', c + 'tile_0000.png');  // Stand
    ldImg('pw1', c + 'tile_0001.png'); // Walk 1
    ldImg('pw2', c + 'tile_0002.png'); // Walk 2
    ldImg('pj', c + 'tile_0003.png');  // Jump
    ldImg('g1', c + 'tile_0015.png');  // Goomba 1
    ldImg('g2', c + 'tile_0016.png');  // Goomba 2
    ldImg('k1', c + 'tile_0021.png');  // Koopa 1
    ldImg('k2', c + 'tile_0022.png');  // Koopa 2
    ldImg('ks', c + 'tile_0023.png');  // Koopa Shell
  }

  // ═══════════════ TILE PRE-RENDERING ═══════════════
  function mkTile(id, fn) {
    const canvas = document.createElement('canvas');
    canvas.width = TS; canvas.height = TS;
    const x = canvas.getContext('2d');
    x.imageSmoothingEnabled = false;
    fn(x);
    tileCache[id] = canvas;
  }

  function p(n) { return Math.max(1, Math.round(TS * n / 16)); }

  function prerenderTiles() {
    // Grass Top
    mkTile(G, c => {
      c.fillStyle = '#c89060'; c.fillRect(0, 0, TS, TS);
      c.fillStyle = '#a07848';
      c.fillRect(p(2), p(8), p(3), p(2)); c.fillRect(p(10), p(11), p(4), p(2));
      c.fillStyle = '#5a9e20'; c.fillRect(0, 0, TS, p(5));
      c.fillStyle = '#7bc030'; c.fillRect(0, 0, TS, p(3));
      c.fillRect(p(2), p(5), p(1), p(2)); c.fillRect(p(13), p(5), p(1), p(2));
    });

    // Dirt Sub-layer
    mkTile(D, c => {
      c.fillStyle = '#c89060'; c.fillRect(0, 0, TS, TS);
      c.fillStyle = '#a07848';
      c.fillRect(p(1), p(2), p(3), p(2)); c.fillRect(p(8), p(6), p(3), p(2)); c.fillRect(p(4), p(10), p(4), p(3));
      c.fillStyle = '#8a6030'; c.fillRect(0, 0, TS, p(1));
    });

    // Brick Block
    mkTile(B, c => {
      c.fillStyle = '#c05820'; c.fillRect(0, 0, TS, TS);
      c.fillStyle = '#8a4018';
      c.fillRect(0, p(7), TS, p(1)); c.fillRect(p(7), 0, p(1), p(7));
      c.fillRect(p(3), p(8), p(1), p(8)); c.fillRect(p(11), p(8), p(1), p(8));
      c.fillStyle = '#d87830';
      c.fillRect(p(1), p(1), p(5), p(1)); c.fillRect(p(9), p(1), p(5), p(1));
    });

    // ? Question Block
    mkTile(Q, c => {
      c.fillStyle = '#e09020'; c.fillRect(0, 0, TS, TS);
      c.fillStyle = '#805010';
      c.fillRect(0, 0, TS, p(1)); c.fillRect(0, TS - p(1), TS, p(1));
      c.fillRect(0, 0, p(1), TS); c.fillRect(TS - p(1), 0, p(1), TS);
      c.fillStyle = '#ffffff';
      c.fillRect(p(5), p(3), p(6), p(2)); c.fillRect(p(9), p(5), p(2), p(2));
      c.fillRect(p(6), p(7), p(4), p(2)); c.fillRect(p(6), p(10), p(2), p(2));
      c.fillStyle = '#c07818'; c.fillRect(p(1), TS - p(2), TS - p(2), p(1));
    });

    // Empty Used ? Block
    mkTile(U, c => {
      c.fillStyle = '#806040'; c.fillRect(0, 0, TS, TS);
      c.fillStyle = '#503820';
      c.fillRect(0, 0, TS, p(1)); c.fillRect(0, TS - p(1), TS, p(1));
      c.fillRect(0, 0, p(1), TS); c.fillRect(TS - p(1), 0, p(1), TS);
    });

    // Pipe Tiles
    function drawPipeTop(c, side) {
      c.fillStyle = '#1c7a1c'; c.fillRect(0, 0, TS, TS);
      c.fillStyle = '#2d9b2d'; c.fillRect(p(1), p(3), TS - p(2), TS - p(3));
      c.fillStyle = '#3db83d'; c.fillRect(p(2), p(3), p(5), TS - p(3));
      c.fillStyle = '#60d060'; c.fillRect(p(3), p(4), p(2), TS - p(5));
      c.fillStyle = '#1c7a1c'; c.fillRect(0, 0, TS, p(3));
      c.fillStyle = '#2d9b2d'; c.fillRect(p(1), 0, TS - p(2), p(2));
      if (side === 'right') {
        c.fillStyle = '#145014'; c.fillRect(TS - p(4), p(3), p(3), TS - p(3));
      }
    }
    function drawPipeBody(c, side) {
      c.fillStyle = '#1c7a1c'; c.fillRect(0, 0, TS, TS);
      c.fillStyle = '#2d9b2d'; c.fillRect(p(2), 0, TS - p(4), TS);
      c.fillStyle = '#3db83d'; c.fillRect(p(3), 0, p(4), TS);
      c.fillStyle = '#60d060'; c.fillRect(p(4), 0, p(2), TS);
      if (side === 'right') {
        c.fillStyle = '#145014'; c.fillRect(TS - p(4), 0, p(3), TS);
      }
    }
    mkTile(P1, c => drawPipeTop(c, 'left'));
    mkTile(P2, c => drawPipeTop(c, 'right'));
    mkTile(P3, c => drawPipeBody(c, 'left'));
    mkTile(P4, c => drawPipeBody(c, 'right'));
    mkTile(W1, c => {
      drawPipeTop(c, 'left');
      c.fillStyle = '#ffffff'; c.globalAlpha = 0.5;
      c.fillRect(p(6), p(8), p(3), p(4));
      c.globalAlpha = 1.0;
    });
    mkTile(W2, c => drawPipeTop(c, 'right'));

    // Flagpole & Top
    mkTile(FL, c => {
      c.fillStyle = '#888888'; c.fillRect(p(7), 0, p(2), TS);
      c.fillStyle = '#bbbbbb'; c.fillRect(p(7), 0, p(1), TS);
    });
    mkTile(FT, c => {
      c.fillStyle = '#888888'; c.fillRect(p(7), p(6), p(2), TS - p(6));
      c.fillStyle = '#ffd700'; c.fillRect(p(5), p(1), p(6), p(6));
    });

    // Castle & Stairs
    mkTile(CW, c => {
      c.fillStyle = '#b8b8b8'; c.fillRect(0, 0, TS, TS);
      c.fillStyle = '#808080'; c.fillRect(0, p(7), TS, p(1)); c.fillRect(p(7), 0, p(1), TS);
    });
    mkTile(CT, c => {
      c.fillStyle = '#b8b8b8'; c.fillRect(0, p(5), TS, TS - p(5));
      c.fillRect(0, p(1), p(4), p(4)); c.fillRect(p(6), p(1), p(4), p(4)); c.fillRect(p(12), p(1), p(4), p(4));
    });
    mkTile(CD, c => {
      c.fillStyle = '#b8b8b8'; c.fillRect(0, 0, TS, TS);
      c.fillStyle = '#1a1a1a'; c.fillRect(p(3), p(2), TS - p(6), TS - p(2));
    });
    mkTile(ST, c => {
      c.fillStyle = '#c89060'; c.fillRect(0, 0, TS, TS);
      c.fillStyle = '#8a5830';
      c.fillRect(0, 0, TS, p(1)); c.fillRect(0, TS - p(1), TS, p(1));
      c.fillRect(0, 0, p(1), TS); c.fillRect(TS - p(1), 0, p(1), TS);
    });
  }

  // ═══════════════ LEVEL BUILDER (130+ COINS) ═══════════════
  function buildLevel() {
    grid = Array.from({ length: ROWS }, () => Array(COLS).fill(_));
    enemies = []; coins = []; pipeList = []; pipeMap = {};

    function makeGround(startCol, endCol) {
      for (let c = startCol; c <= endCol; c++) {
        grid[GND][c] = G; grid[GND + 1][c] = D;
      }
    }
    function makePipe(col, height, isWarp) {
      const topRow = GND - height;
      grid[topRow][col] = isWarp ? W1 : P1;
      grid[topRow][col + 1] = isWarp ? W2 : P2;
      for (let r = topRow + 1; r < GND; r++) {
        grid[r][col] = P3; grid[r][col + 1] = P4;
      }
      if (isWarp) pipeList.push(col);
    }
    function setBlocks(row, startCol, endCol, tileType) {
      for (let c = startCol; c <= endCol; c++) grid[row][c] = tileType;
    }
    function buildStairs(col, height) {
      for (let step = 1; step <= height; step++) {
        for (let r = GND - step; r < GND; r++) grid[r][col + step - 1] = ST;
      }
    }
    function addEnemy(type, col) {
      enemies.push({
        type, x: col * TS, y: (GND - 1) * TS, vx: type === 'koopa' ? -0.7 : -0.5, vy: 0,
        w: 14, h: 14, alive: true, st: 'walk', dir: -1, fr: 0, ft: 0, dt: 0, shellVx: 0, active: false
      });
    }
    function addCoin(col, row) {
      coins.push({ x: col * TS + 2, y: row * TS + 2, w: 12, h: 12, got: false, fr: 0 });
    }
    function addCoinRow(colStart, colEnd, row) {
      for (let c = colStart; c <= colEnd; c++) addCoin(c, row);
    }

    // Build Ground across the whole level with strategic gaps
    makeGround(0, 80);
    makeGround(83, 160);
    makeGround(163, 240);
    makeGround(243, 355);

    // ── SECTION 1: START RUN (0 - 40) ── 15 Coins
    addCoinRow(6, 12, 8);
    grid[8][15] = Q; grid[8][17] = Q; grid[8][19] = Q;
    makePipe(22, 2, true); // Pipe #1
    addEnemy('goomba', 26); addEnemy('goomba', 29);
    addCoinRow(30, 37, 7);

    // ── SECTION 2: BRICK GARDEN & PIPE #2 (41 - 80) ── 25 Coins
    setBlocks(8, 42, 48, B); grid[8][44] = Q; grid[8][46] = Q;
    addCoinRow(42, 48, 6);
    makePipe(52, 3, true); // Pipe #2
    addEnemy('koopa', 56); addEnemy('goomba', 60);
    setBlocks(5, 62, 68, B); grid[5][65] = Q;
    addCoinRow(62, 68, 3);
    addCoinRow(70, 78, 8);

    // ── SECTION 3: STAIR VALLEY & PIPE #3 (81 - 130) ── 30 Coins
    buildStairs(83, 4);
    for (let s = 4; s >= 1; s--) {
      for (let r = GND - s; r < GND; r++) grid[r][92 - s + 1] = ST;
    }
    addCoinRow(84, 91, 5);
    makePipe(98, 4, true); // Pipe #3
    addEnemy('goomba', 102); addEnemy('koopa', 106);
    setBlocks(8, 110, 118, B); grid[8][112] = Q; grid[8][116] = Q;
    addCoinRow(110, 118, 6);
    addCoinRow(120, 128, 8);

    // ── SECTION 4: PIPE CORRIDOR & PIPE #4 (131 - 190) ── 30 Coins
    makePipe(134, 2, true); // Pipe #4
    addEnemy('goomba', 138); addEnemy('goomba', 142);
    setBlocks(6, 144, 152, B); grid[6][148] = Q;
    addCoinRow(144, 152, 4);
    makePipe(158, 3, true); // Pipe #5
    addEnemy('koopa', 166); addEnemy('goomba', 170);
    addCoinRow(172, 182, 7);
    makePipe(186, 2, true); // Pipe #6

    // ── SECTION 5: FINAL COIN SPRINT (191 - 320) ── 30+ Coins
    addEnemy('goomba', 194); addEnemy('goomba', 198);
    setBlocks(8, 200, 210, B); grid[8][204] = Q; grid[8][208] = Q;
    addCoinRow(200, 210, 6);
    makePipe(216, 3, true); // Pipe #7
    addEnemy('koopa', 222); addEnemy('goomba', 228);
    addCoinRow(230, 242, 8);
    addCoinRow(246, 260, 7);
    addCoinRow(264, 280, 8);
    addCoinRow(284, 305, 7);

    // ── SECTION 6: FLAGPOLE & CASTLE (310 - 360) ──
    buildStairs(310, 8);

    // Flagpole at col 330
    for (let r = 3; r < GND; r++) grid[r][330] = FL;
    grid[2][330] = FT;
    flagBannerRow = 3;

    // Castle at 335 - 342
    for (let c = 335; c <= 342; c++) {
      for (let r = GND - 5; r < GND; r++) grid[r][c] = CW;
      grid[GND - 6][c] = CT;
    }
    grid[GND - 2][338] = CD; grid[GND - 1][338] = CD;
    grid[GND - 2][339] = CD; grid[GND - 1][339] = CD;

    // Connect Pipe Sequential Warp Chain: Pipe #N -> Pipe #N+1
    for (let i = 0; i < pipeList.length; i++) {
      const nextPipeCol = pipeList[(i + 1) % pipeList.length];
      pipeMap[pipeList[i]] = nextPipeCol;
    }
  }

  // ═══════════════ PRE-RENDER LEVEL MAP ═══════════════
  function prerenderLevel() {
    lvlCvs = document.createElement('canvas');
    lvlCvs.width = COLS * TS; lvlCvs.height = ROWS * TS;
    lvlCtx = lvlCvs.getContext('2d');
    lvlCtx.imageSmoothingEnabled = false;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (grid[r][c] !== _ && tileCache[grid[r][c]]) {
          lvlCtx.drawImage(tileCache[grid[r][c]], c * TS, r * TS);
        }
      }
    }
  }

  function updateLevelTile(col, row) {
    lvlCtx.clearRect(col * TS, row * TS, TS, TS);
    if (grid[row][col] !== _ && tileCache[grid[row][col]]) {
      lvlCtx.drawImage(tileCache[grid[row][col]], col * TS, row * TS);
    }
  }

  // ═══════════════ PARALLAX BACKGROUND ═══════════════
  function initBackground() {
    bgClouds = []; bgHills = [];
    const span = COLS * TS * 0.5;
    for (let i = 0; i < 30; i++) {
      bgClouds.push({
        x: Math.random() * span, y: 8 + Math.random() * 40,
        w: 32 + Math.random() * 32, h: 12 + Math.random() * 10
      });
    }
    for (let i = 0; i < 20; i++) {
      bgHills.push({
        x: i * 160 + Math.random() * 40, w: 70 + Math.random() * 60,
        h: 20 + Math.random() * 25,
        color: i % 2 === 0 ? '#48a020' : '#3c8c18'
      });
    }
  }

  function drawBg() {
    ctx.fillStyle = '#6cb4ee';
    ctx.fillRect(0, 0, cW, cH);

    const hOff = camX * 0.2;
    bgHills.forEach(h => {
      const x = Math.round(h.x - hOff);
      if (x + h.w < -50 || x > cW + 50) return;
      ctx.fillStyle = h.color;
      const baseY = GND * TS;
      for (let r = 0; r < h.h; r++) {
        const pct = r / h.h;
        const rw = Math.round(h.w * (0.2 + 0.8 * pct));
        ctx.fillRect(Math.round(x + (h.w - rw) / 2), baseY - h.h + r, rw, 1);
      }
    });

    const cOff = camX * 0.1;
    ctx.fillStyle = '#ffffff';
    bgClouds.forEach(cl => {
      const x = Math.round(cl.x - cOff);
      if (x + cl.w < -50 || x > cW + 50) return;
      ctx.fillRect(x + cl.w * 0.2, cl.y, cl.w * 0.6, cl.h * 0.5);
      ctx.fillRect(x, cl.y + cl.h * 0.3, cl.w, cl.h * 0.7);
    });
  }

  // ═══════════════ TILE COLLISION HELPERS ═══════════════
  function tileAt(c, r) {
    if (c < 0 || c >= COLS || r < 0) return _;
    if (r >= ROWS) return D;
    return grid[r][c];
  }

  function isSolidTile(c, r) {
    return SOLID.has(tileAt(c, r));
  }

  function moveAxis(e, axis) {
    if (axis === 'x') {
      e.x += e.vx;
      const left = Math.floor(e.x / TS);
      const right = Math.floor((e.x + e.w - 1) / TS);
      const top = Math.floor(e.y / TS);
      const bot = Math.floor((e.y + e.h - 1) / TS);

      if (e.vx > 0) {
        for (let r = top; r <= bot; r++) {
          if (isSolidTile(right, r)) {
            e.x = right * TS - e.w; e.vx = 0; return 'right';
          }
        }
      } else if (e.vx < 0) {
        for (let r = top; r <= bot; r++) {
          if (isSolidTile(left, r)) {
            e.x = (left + 1) * TS; e.vx = 0; return 'left';
          }
        }
      }
    } else {
      e.y += e.vy;
      const left = Math.floor((e.x + 1) / TS);
      const right = Math.floor((e.x + e.w - 2) / TS);
      const top = Math.floor(e.y / TS);
      const bot = Math.floor((e.y + e.h - 1) / TS);

      if (e.vy > 0) {
        for (let c = left; c <= right; c++) {
          if (isSolidTile(c, bot)) {
            e.y = bot * TS - e.h; e.vy = 0; e.onGnd = true; return 'down';
          }
        }
        e.onGnd = false;
      } else if (e.vy < 0) {
        for (let c = left; c <= right; c++) {
          if (isSolidTile(c, top)) {
            e.y = (top + 1) * TS; e.vy = 0;
            if (e === P) hitBlock(c, top);
            return 'up';
          }
        }
      }
    }
    return null;
  }

  // Trigger sequential batchmate student name (Student 1 to Student 130)
  function triggerCoinStudentName() {
    if (typeof window.revealStudentName === 'function' && Array.isArray(window.studentNames)) {
      const idx = (window.currentStudentIndex || 0) % window.studentNames.length;
      window.revealStudentName(window.studentNames[idx]);
      window.currentStudentIndex = (window.currentStudentIndex || 0) + 1;
    }
  }

  function hitBlock(col, row) {
    const t = grid[row][col];
    if (t === Q) {
      grid[row][col] = U;
      updateLevelTile(col, row);
      score += 100; coinCt++;
      updateHUD();
      popCoins.push({ x: col * TS + 2, y: row * TS - TS, vy: -3.8, life: 22 });
      triggerCoinStudentName();
    } else if (t === B) {
      grid[row][col] = _;
      updateLevelTile(col, row);
      score += 50;
      updateHUD();
      for (let i = 0; i < 4; i++) {
        brickBits.push({
          x: col * TS + (i % 2) * 8, y: row * TS + Math.floor(i / 2) * 8,
          vx: (i % 2 === 0 ? -1.2 : 1.2), vy: -3.5 - Math.random() * 1.5,
          life: 30
        });
      }
    }
  }

  // Robust helper to check if Mario is standing on top of ANY pipe
  function findWarpPipeCol() {
    const c1 = Math.floor(P.x / TS);
    const c2 = Math.floor((P.x + P.w) / TS);
    for (let c of [c1, c2, c1 - 1, c2 + 1]) {
      if (pipeMap[c] !== undefined) {
        // Check horizontal proximity to pipe top
        if (Math.abs((P.x + P.w / 2) - (c * TS + TS)) <= 20) {
          return c;
        }
      }
    }
    return null;
  }

  // ═══════════════ PLAYER ENGINE & JUMP CONTROLS ═══════════════
  function resetPlayer() {
    P = {
      x: 3 * TS, y: (GND - 1) * TS, vx: 0, vy: 0,
      w: 12, h: 15, dir: 1, onGnd: false, fr: 0, ft: 0, inv: 0
    };
    jumpCount = 0;
  }

  function updatePlayer() {
    const left = keys['ArrowLeft'] || keys['KeyA'] || touchState.left;
    const right = keys['ArrowRight'] || keys['KeyD'] || touchState.right;
    const jumpRaw = keys['ArrowUp'] || keys['KeyW'] || keys['Space'] || touchState.jump;
    const down = keys['ArrowDown'] || keys['KeyS'] || touchState.down;

    // Movement (Smooth, balanced sensitivity)
    if (left) { P.vx = Math.max(P.vx - WALK_ACC, -MAX_WALK); P.dir = -1; }
    else if (right) { P.vx = Math.min(P.vx + WALK_ACC, MAX_WALK); P.dir = 1; }
    else { P.vx = Math.abs(P.vx) < WALK_DEC ? 0 : P.vx + (P.vx > 0 ? -WALK_DEC : WALK_DEC); }

    // Reset Jump Count on Landing
    if (P.onGnd) {
      jumpCount = 0;
    }

    // Spacebar Jump Trigger:
    // 1st press = Single Jump (Ground)
    // 2nd press = Double Jump (Mid-Air)
    // 3rd+ press = Ignored
    const jumpJustPressed = jumpRaw && !spacePrevPressed;
    spacePrevPressed = jumpRaw;

    if (jumpJustPressed) {
      if (P.onGnd || jumpCount === 0) {
        P.vy = JUMP_VEL_1;
        P.onGnd = false;
        jumpCount = 1;
      } else if (jumpCount === 1) { // Mid-air double jump!
        P.vy = JUMP_VEL_2;
        jumpCount = 2;
        particles.push({ x: P.x + 2, y: P.y + P.h, vx: 0, vy: 1, life: 10, color: '#ffffff', sz: 4 });
      }
    }

    // Gravity
    P.vy = Math.min(P.vy + GRAVITY, MAX_FALL);

    // Apply movement & tile collisions
    moveAxis(P, 'x');
    moveAxis(P, 'y');

    // Camera boundary
    if (P.x < camX) { P.x = camX; P.vx = 0; }

    // Robust Pipe Warp Trigger
    if (down) {
      const pipeCol = findWarpPipeCol();
      if (pipeCol !== null) {
        startPipeWarp(pipeCol);
      }
    }

    // Animation frames
    P.ft++;
    if (P.onGnd && Math.abs(P.vx) > 0.3) {
      if (P.ft > 5) { P.fr = (P.fr + 1) % 3; P.ft = 0; }
    } else if (!P.onGnd) {
      P.fr = 0;
    } else {
      P.fr = 0; P.ft = 0;
    }

    if (P.inv > 0) P.inv--;

    // Fall Into Pit
    if (P.y > (ROWS + 2) * TS) playerDie();

    // Flagpole Check
    const px = Math.floor((P.x + P.w / 2) / TS);
    const py1 = Math.floor(P.y / TS);
    const py2 = Math.floor((P.y + P.h) / TS);
    if (tileAt(px, py1) === FL || tileAt(px, py2) === FL) {
      if (gameState === 'play') startFlag(px);
    }
  }

  // ═══════════════ ENEMY AI & MOVEMENT ═══════════════
  function updateEnemies() {
    enemies.forEach(e => {
      if (!e.alive && e.dt > 0) { e.dt--; return; }
      if (!e.alive) return;

      if (!e.active && e.x < camX + cW + 180) e.active = true;
      if (!e.active) return;

      if (e.st === 'walk') {
        e.x += e.vx;
        const sideCol = e.vx > 0 ? Math.floor((e.x + e.w) / TS) : Math.floor(e.x / TS);
        const midRow = Math.floor((e.y + e.h / 2) / TS);

        if (isSolidTile(sideCol, midRow)) {
          e.vx *= -1;
          e.x = e.vx > 0 ? (sideCol + 1) * TS : sideCol * TS - e.w;
        }

        e.vy = Math.min(e.vy + GRAVITY, MAX_FALL);
        e.y += e.vy;

        const footRow = Math.floor((e.y + e.h) / TS);
        const footCol = Math.floor((e.x + e.w / 2) / TS);
        if (isSolidTile(footCol, footRow)) {
          e.y = footRow * TS - e.h; e.vy = 0;
        }

        e.ft++;
        if (e.ft > 10) { e.fr = (e.fr + 1) % 2; e.ft = 0; }

      } else if (e.st === 'shell-move') {
        e.x += e.shellVx;
        const sc = e.shellVx > 0 ? Math.floor((e.x + e.w) / TS) : Math.floor(e.x / TS);
        const sr = Math.floor((e.y + e.h / 2) / TS);

        if (isSolidTile(sc, sr)) {
          e.shellVx *= -1;
        }

        enemies.forEach(o => {
          if (o === e || !o.alive) return;
          if (Math.abs(e.x - o.x) < 14 && Math.abs(e.y - o.y) < 14) {
            o.alive = false; o.dt = 20;
            score += 200; updateHUD();
          }
        });
      }

      if (gameState !== 'play' || P.inv > 0) return;

      const dx = P.x + P.w / 2 - (e.x + e.w / 2);
      const dy = P.y + P.h / 2 - (e.y + e.h / 2);

      if (Math.abs(dx) < (P.w + e.w) / 2 - 2 && Math.abs(dy) < (P.h + e.h) / 2 - 2) {
        if (P.vy > 0 && P.y + P.h < e.y + e.h * 0.7) {
          P.vy = -4.8;
          score += e.type === 'koopa' ? 400 : 200;
          updateHUD();

          if (e.type === 'koopa' && e.st === 'walk') {
            e.st = 'shell'; e.fr = 0;
          } else if (e.type === 'koopa' && e.st === 'shell') {
            e.st = 'shell-move'; e.shellVx = dx > 0 ? -4.5 : 4.5;
          } else {
            e.alive = false; e.dt = 25;
          }
          particles.push({ x: e.x + 4, y: e.y, vx: 0, vy: -1.5, life: 15, color: '#ffffff', sz: 3 });
        } else if (e.st === 'shell') {
          e.st = 'shell-move';
          e.shellVx = dx > 0 ? -4.5 : 4.5;
          P.inv = 12;
        } else {
          playerDie();
        }
      }
    });
  }

  // ═══════════════ COINS & PARTICLES ═══════════════
  function updateCoins() {
    coins.forEach(c => {
      if (c.got) return;
      c.fr = (c.fr + 1) % 40;
      if (P.x + P.w > c.x && P.x < c.x + c.w && P.y + P.h > c.y && P.y < c.y + c.h) {
        c.got = true; score += 100; coinCt++; updateHUD();
        particles.push({ x: c.x, y: c.y, vx: 0, vy: -1, life: 15, color: '#ffd700', sz: 3 });
        triggerCoinStudentName();
      }
    });

    popCoins.forEach(c => {
      c.y += c.vy; c.vy += 0.22; c.life--;
    });
    popCoins = popCoins.filter(c => c.life > 0);
  }

  function updateParticles() {
    particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.life--; });
    particles = particles.filter(p => p.life > 0);
    brickBits.forEach(b => { b.x += b.vx; b.y += b.vy; b.vy += 0.2; b.life--; });
    brickBits = brickBits.filter(b => b.life > 0);
  }

  // ═══════════════ SEQUENTIAL PIPE WARP ENGINE ═══════════════
  // Pipe 1 -> Pipe 2 -> Pipe 3 -> Pipe 4... with Jump In & Jump Out Animation
  function startPipeWarp(entryCol) {
    gameState = 'pipe';
    const exitCol = pipeMap[entryCol] !== undefined ? pipeMap[entryCol] : entryCol + 30;
    pw = { phase: 'jumpIn', t: 0, dur: 20, entryCol, exitCol, sy: P.y };
    P.vx = 0; P.vy = 0;
  }

  function updatePipe() {
    pw.t++;
    if (pw.phase === 'jumpIn') {
      // Sinks down into entry pipe
      P.y = pw.sy + (pw.t / pw.dur) * TS * 1.5;
      if (pw.t >= pw.dur) { pw.phase = 'fadeBlack'; pw.t = 0; pw.dur = 25; }
    } else if (pw.phase === 'fadeBlack') {
      if (pw.t === 1) {
        P.x = pw.exitCol * TS + 2;
        P.y = (GND - 1) * TS; // At exit pipe top
      }
      if (pw.t >= pw.dur) { pw.phase = 'jumpOut'; pw.t = 0; pw.dur = 20; pw.sy = P.y; }
    } else if (pw.phase === 'jumpOut') {
      // Jumps UP OUT of exit pipe!
      P.y = pw.sy - Math.sin((pw.t / pw.dur) * Math.PI) * TS * 1.8;
      if (pw.t >= pw.dur) {
        P.y = (GND - 1) * TS; P.onGnd = true;
        camX = Math.max(0, P.x - cW * 0.3);
        gameState = 'play'; pw = null;
      }
    }
  }

  // ═══════════════ FLAGPOLE & WHITE CONGRATULATIONS SCREEN ═══════════════
  function startFlag(col) {
    gameState = 'flag';
    P.vx = 0; P.vy = 0;
    P.x = col * TS - P.w + 2;
    fs = { phase: 'slide', t: 0, grabY: P.y, flagRow: flagBannerRow, walkTarget: 338 * TS };
    score += 5000; updateHUD();
  }

  function updateFlag() {
    fs.t++;
    if (fs.phase === 'slide') {
      P.y = Math.min(P.y + 2.2, (GND - 1) * TS);
      if (fs.t % 3 === 0 && fs.flagRow < GND - 1) fs.flagRow++;
      if (P.y >= (GND - 1) * TS) { fs.phase = 'walk'; fs.t = 0; P.dir = 1; }
    } else if (fs.phase === 'walk') {
      P.x += 1.6; P.dir = 1;
      P.ft++;
      if (P.ft > 5) { P.fr = (P.fr + 1) % 3; P.ft = 0; }
      if (P.x >= fs.walkTarget) { fs.phase = 'fireworks'; fs.t = 0; }
    } else if (fs.phase === 'fireworks') {
      if (fs.t === 1 || fs.t === 20 || fs.t === 40 || fs.t === 60 || fs.t === 80) {
        launchFirework();
      }
      if (fs.t >= 110) {
        gameState = 'win';
        // White Congratulations Overlay
        const winHTML = `
          <div style="color: #000000; text-align: center;">
            <div style="font-size: 1.4rem; font-family: var(--font-pixel); color: #ff8800; text-shadow: none; margin-bottom: 0.3rem;">CONGRATULATIONS!</div>
            <div style="font-size: 1.05rem; font-family: var(--font-pixel); color: #111122; margin-bottom: 0.2rem;">WELCOME TO UPSIFS</div>
            <div style="font-size: 0.78rem; font-family: var(--font-pixel); color: #40d040;">CLASS OF 2026</div>
            <div style="font-size: 0.68rem; font-family: var(--font-sans); color: #333333; margin-top: 0.3rem;">YOU REVEALED BATCHMATE DOSSIER! SCORE: ${score}</div>
          </div>
        `;
        showWhiteOverlay(winHTML, 'PRESS ENTER / TAP TO PLAY AGAIN');
      }
    }
  }

  function launchFirework() {
    const colors = ['#ff3030', '#30ff30', '#ffff30', '#ff30ff', '#30ffff', '#ff8800'];
    const fx = camX + cW * 0.2 + Math.random() * cW * 0.6;
    fireworks.push({
      x: fx, y: INTERNAL_H, vy: -2.5 - Math.random() * 1.2, phase: 'launch', t: 0,
      color: colors[Math.floor(Math.random() * colors.length)], parts: []
    });
  }

  function updateFireworks() {
    fireworks.forEach(fw => {
      fw.t++;
      if (fw.phase === 'launch') {
        fw.y += fw.vy;
        if (fw.t > 20 + Math.random() * 10) {
          fw.phase = 'explode';
          for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            const spd = 1.2 + Math.random() * 1.4;
            fw.parts.push({
              x: fw.x, y: fw.y,
              vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd,
              life: 30 + Math.random() * 15
            });
          }
        }
      } else if (fw.phase === 'explode') {
        fw.parts.forEach(pt => {
          pt.x += pt.vx; pt.y += pt.vy; pt.vy += 0.03; pt.life--;
        });
        fw.parts = fw.parts.filter(pt => pt.life > 0);
        if (fw.parts.length === 0) fw.phase = 'done';
      }
    });
    fireworks = fireworks.filter(fw => fw.phase !== 'done');
  }

  // ═══════════════ PLAYER DEATH ═══════════════
  function playerDie() {
    if (gameState !== 'play') return;
    gameState = 'die'; P.vy = -6.2; P.vx = 0; dieTimer = 0;
  }

  function updateDeath() {
    P.vy += GRAVITY; P.y += P.vy; dieTimer++;
    if (dieTimer > 80) {
      lives--;
      if (lives <= 0) {
        gameState = 'over';
        showOverlay('GAME OVER', 'SCORE: ' + score, 'PRESS ENTER / TAP TO RESTART');
      } else {
        resetLevel();
      }
    }
  }

  // ═══════════════ CAMERA ═══════════════
  function updateCamera() {
    const target = P.x - cW * 0.35;
    camX = Math.max(camX, target);
    camX = Math.max(0, Math.min(camX, COLS * TS - cW));
  }

  // ═══════════════ HUD UPDATE ═══════════════
  function updateHUD() {
    const se = document.getElementById('hud-score');
    const ce = document.getElementById('hud-coins');
    const te = document.getElementById('hud-time');
    if (se) se.textContent = String(score).padStart(6, '0');
    if (ce) ce.textContent = String(coinCt).padStart(2, '0');
    if (te) te.textContent = String(Math.max(0, timer)).padStart(3, '0');
  }

  // ═══════════════ MAIN RENDER LOOP ═══════════════
  function drawSprite(img, x, y, w, h, flip) {
    if (!img) return;
    if (flip) {
      ctx.save(); ctx.translate(Math.round(x + w), Math.round(y)); ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0, w, h); ctx.restore();
    } else {
      ctx.drawImage(img, Math.round(x), Math.round(y), w, h);
    }
  }

  function render() {
    ctx.clearRect(0, 0, cW, cH);

    // 1. Background
    drawBg();

    // 2. Pre-rendered Level Map
    const sx = Math.max(0, Math.floor(camX));
    const drawW = Math.min(cW, lvlCvs.width - sx);
    if (drawW > 0) {
      ctx.drawImage(lvlCvs, sx, 0, drawW, INTERNAL_H, 0, 0, drawW, INTERNAL_H);
    }

    // 3. Flag Banner
    const fbx = Math.round(330 * TS + 1 - camX);
    const fby = (fs ? fs.flagRow : flagBannerRow) * TS;
    ctx.fillStyle = '#e02020';
    for (let r = 0; r < TS; r++) {
      const w = Math.round((1 - r / TS) * TS * 0.75);
      if (w > 0) ctx.fillRect(fbx - w, fby + r, w, 1);
    }

    // 4. Collectible Coins
    coins.forEach(c => {
      if (c.got) return;
      const cx = Math.round(c.x - camX);
      if (cx < -20 || cx > cW + 20) return;
      const bright = c.fr < 20;
      ctx.fillStyle = bright ? '#ffd700' : '#c8a000';
      const cw = bright ? 10 : 6;
      ctx.fillRect(cx + (12 - cw) / 2, c.y, cw, 12);
      ctx.fillStyle = bright ? '#ffeb3b' : '#dab000';
      ctx.fillRect(cx + (12 - cw) / 2 + 1, c.y + 2, Math.max(1, cw - 3), 8);
    });

    // 5. Popping ? Coins
    popCoins.forEach(c => {
      const cx = Math.round(c.x - camX);
      ctx.fillStyle = '#ffd700'; ctx.fillRect(cx, c.y, 10, 10);
      ctx.fillStyle = '#ffeb3b'; ctx.fillRect(cx + 2, c.y + 2, 6, 6);
    });

    // 6. Enemies
    enemies.forEach(e => {
      if (!e.alive && e.dt <= 0) return;
      const ex = Math.round(e.x - camX);
      if (ex < -30 || ex > cW + 30) return;

      if (!e.alive) {
        ctx.globalAlpha = e.dt / 25;
        ctx.fillStyle = '#ffffff'; ctx.fillRect(ex, e.y, e.w, e.h);
        ctx.globalAlpha = 1.0;
        return;
      }

      if (e.type === 'goomba') {
        const img = e.fr === 0 ? imgs.g1 : imgs.g2;
        if (img) drawSprite(img, ex, e.y, TS, TS, false);
        else { ctx.fillStyle = '#c06030'; ctx.fillRect(ex, e.y, e.w, e.h); }
      } else if (e.type === 'koopa') {
        if (e.st === 'shell' || e.st === 'shell-move') {
          const img = imgs.ks;
          if (img) drawSprite(img, ex, e.y + 4, TS, TS - 4, false);
          else { ctx.fillStyle = '#40a040'; ctx.fillRect(ex, e.y + 4, e.w, e.h - 4); }
        } else {
          const img = e.fr === 0 ? imgs.k1 : imgs.k2;
          if (img) drawSprite(img, ex, e.y, TS, TS, e.dir > 0);
          else { ctx.fillStyle = '#40a040'; ctx.fillRect(ex, e.y, e.w, e.h); }
        }
      }
    });

    // 7. Player
    if (gameState !== 'die' || dieTimer % 4 < 2) {
      const px = Math.round(P.x - camX);
      let pImg;
      if (!P.onGnd) pImg = imgs.pj || imgs.pw1;
      else if (Math.abs(P.vx) > 0.3) pImg = P.fr === 1 ? imgs.pw2 : imgs.pw1;
      else pImg = imgs.pi || imgs.pw1;

      if (P.inv > 0 && frame % 4 < 2) { /* Invincibility blink */ }
      else if (pImg) drawSprite(pImg, px - 2, P.y - 1, TS, TS, P.dir < 0);
      else { ctx.fillStyle = '#e04040'; ctx.fillRect(px, P.y, P.w, P.h); }
    }

    // 8. Particles & Brick Bits
    particles.forEach(pt => {
      ctx.fillStyle = pt.color; ctx.globalAlpha = pt.life / 20;
      ctx.fillRect(Math.round(pt.x - camX), Math.round(pt.y), pt.sz, pt.sz);
      ctx.globalAlpha = 1.0;
    });

    brickBits.forEach(b => {
      ctx.fillStyle = '#c05820';
      ctx.fillRect(Math.round(b.x - camX), Math.round(b.y), 8, 8);
    });

    // 9. Fireworks
    fireworks.forEach(fw => {
      if (fw.phase === 'launch') {
        ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(fw.x - camX), Math.round(fw.y), 2, 4);
      } else if (fw.phase === 'explode') {
        fw.parts.forEach(pt => {
          ctx.fillStyle = fw.color; ctx.globalAlpha = Math.min(1, pt.life / 18);
          ctx.fillRect(Math.round(pt.x - camX), Math.round(pt.y), 3, 3);
        });
        ctx.globalAlpha = 1.0;
      }
    });

    // 10. Pipe Fade
    if (gameState === 'pipe' && pw) {
      const alpha = pw.phase === 'fadeBlack' ? 1.0 : (pw.phase === 'jumpIn' ? pw.t / pw.dur * 0.8 : (1 - pw.t / pw.dur) * 0.8);
      ctx.fillStyle = '#000000'; ctx.globalAlpha = alpha;
      ctx.fillRect(0, 0, cW, cH);
      ctx.globalAlpha = 1.0;
    }

    // 11. Canvas Hearts Lives Bar
    ctx.fillStyle = '#ff3030';
    for (let i = 0; i < lives; i++) {
      const lx = 4 + i * 11;
      ctx.fillRect(lx, 3, 3, 2); ctx.fillRect(lx + 4, 3, 3, 2);
      ctx.fillRect(lx, 5, 7, 2); ctx.fillRect(lx + 1, 7, 5, 2); ctx.fillRect(lx + 2, 9, 3, 1);
    }
  }

  // ═══════════════ ENGINE LOOP ═══════════════
  function gameLoop() {
    frame++;

    if (gameState === 'play') {
      updatePlayer();
      updateEnemies();
      updateCoins();
      updateParticles();
      updateCamera();

      timerAcc++;
      if (timerAcc >= 60) { timerAcc = 0; timer--; updateHUD(); }
      if (timer <= 0) playerDie();

    } else if (gameState === 'die') {
      updateDeath();
      updateParticles();

    } else if (gameState === 'pipe') {
      updatePipe();

    } else if (gameState === 'flag') {
      updateFlag();
      updateFireworks();
      updateCamera();

    } else if (gameState === 'win') {
      updateFireworks();
    }

    render();
    requestAnimationFrame(gameLoop);
  }

  // ═══════════════ CONTROLLER ═══════════════
  function startGame() {
    score = 0; coinCt = 0; lives = 3; timer = 600; timerAcc = 0;
    camX = 0; dieTimer = 0;
    popCoins = []; particles = []; fireworks = []; brickBits = [];
    pw = null; fs = null;
    buildLevel();
    prerenderLevel();
    resetPlayer();
    initBackground();
    updateHUD();
    hideOverlay();
    if (overlay) overlay.style.background = '';
    gameState = 'play';
  }

  function resetLevel() {
    camX = 0; dieTimer = 0; timer = 600;
    popCoins = []; particles = []; fireworks = []; brickBits = [];
    pw = null; fs = null;
    buildLevel();
    prerenderLevel();
    resetPlayer();
    updateHUD();
    hideOverlay();
    if (overlay) overlay.style.background = '';
    gameState = 'play';
  }

  // ═══════════════ OVERLAY MESSAGES ═══════════════
  function showOverlay(title, text, sub) {
    if (overlay) {
      overlay.style.background = 'rgba(0, 0, 0, 0.75)';
      overlay.classList.remove('hidden');
    }
    if (overlayTitle) overlayTitle.textContent = title || '';
    if (overlayText) overlayText.innerHTML = text || '';
    if (overlaySub) overlaySub.textContent = sub || '';
  }

  function showWhiteOverlay(htmlContent, subText) {
    if (overlay) {
      overlay.style.background = '#ffffff';
      overlay.classList.remove('hidden');
    }
    if (overlayTitle) overlayTitle.textContent = '';
    if (overlayText) overlayText.innerHTML = htmlContent || '';
    if (overlaySub) {
      overlaySub.textContent = subText || '';
      overlaySub.style.color = '#333333';
    }
  }

  function hideOverlay() {
    if (overlay) overlay.classList.add('hidden');
  }

  // ═══════════════ INPUT HANDLERS ═══════════════
  function setupInput() {
    window.addEventListener('keydown', e => {
      keys[e.code] = true;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        if (gameState === 'play' || gameState === 'start') e.preventDefault();
      }
      if (e.code === 'Enter') {
        if (gameState === 'start' || gameState === 'over' || gameState === 'win') {
          startGame();
          e.preventDefault();
        }
      }
    });

    window.addEventListener('keyup', e => { keys[e.code] = false; });

    // Touch Controls
    const touchMap = {
      'touch-left': 'left', 'touch-right': 'right',
      'touch-down': 'down', 'touch-jump': 'jump'
    };

    Object.keys(touchMap).forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const k = touchMap[id];
      const handle = (val) => (e) => {
        if (e.cancelable) e.preventDefault();
        touchState[k] = val;

        if (val && (gameState === 'start' || gameState === 'over' || gameState === 'win')) {
          startGame();
        }
      };

      el.addEventListener('touchstart', handle(true), { passive: false });
      el.addEventListener('touchend', handle(false), { passive: false });
      el.addEventListener('mousedown', handle(true));
      el.addEventListener('mouseup', handle(false));
      el.addEventListener('mouseleave', handle(false));
    });

    cvs.addEventListener('click', () => {
      if (gameState === 'start' || gameState === 'over' || gameState === 'win') startGame();
    });
  }

  // ═══════════════ CANVAS SETUP ═══════════════
  function setupCanvas() {
    const container = document.getElementById('mario-viewport');
    if (!container) return false;

    cvs = document.getElementById('mario-canvas');
    if (!cvs) return false;

    ctx = cvs.getContext('2d');
    if (!ctx) return false;

    const w = container.clientWidth;
    const h = container.clientHeight;
    const aspect = w / Math.max(1, h);

    cW = Math.round(INTERNAL_H * aspect);
    cH = INTERNAL_H;

    cvs.width = cW;
    cvs.height = cH;
    ctx.imageSmoothingEnabled = false;
    return true;
  }

  // ═══════════════ INITIALIZATION ═══════════════
  window.initMarioGame = function () {
    if (!setupCanvas()) return;

    overlay = document.getElementById('game-overlay');
    overlayTitle = document.getElementById('game-overlay-title');
    overlayText = document.getElementById('game-overlay-text');
    overlaySub = document.getElementById('game-overlay-sub');

    loadAssets();
    prerenderTiles();

    function waitAssets() {
      if (imgDone < imgN) { setTimeout(waitAssets, 40); return; }

      buildLevel();
      prerenderLevel();
      resetPlayer();
      initBackground();
      updateHUD();
      setupInput();

      const instructionsHTML = `
        <div class="ctrl-box">
          <div class="ctrl-row">• <strong>SPACEBAR:</strong> Jump (Double tap = Double Jump)</div>
          <div class="ctrl-row">• <strong>◄ / ► or A / D:</strong> Move Left / Right</div>
          <div class="ctrl-row">• <strong>▼ or S:</strong> Enter Pipe</div>
          <div class="ctrl-row green-text">• <strong>COLLECT COINS TO REVEAL BATCHMATES!</strong></div>
        </div>
      `;

      showOverlay('WORLD 1-1', instructionsHTML, 'PRESS ENTER / TOUCH TO PLAY');

      window.addEventListener('resize', () => {
        setupCanvas();
      });

      gameLoop();
    }
    waitAssets();
  };

})();
