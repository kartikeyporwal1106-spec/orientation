(function () {
  'use strict';

  const canvas = document.getElementById('mode-game-canvas');
  const marioCanvas = document.getElementById('mario-canvas');
  const overlay = document.getElementById('game-overlay');
  const hudScore = () => document.getElementById('hud-score');
  const hudCoins = () => document.getElementById('hud-coins');
  const hudTime = () => document.getElementById('hud-time');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let mode = 'classic';
  let playerName = 'Max Verstappen';
  let running = false;
  let lastTime = 0;
  let keys = {};
  let state = {};

  function resize() {
    const parent = canvas.parentElement;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const width = parent?.clientWidth || 960;
    const height = parent?.clientHeight || 150;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function setHud(score, coins, time) {
    if (hudScore()) hudScore().textContent = String(Math.max(0, Math.floor(score))).padStart(6, '0');
    if (hudCoins()) hudCoins().textContent = String(Math.max(0, Math.floor(coins))).padStart(2, '0');
    if (hudTime()) hudTime().textContent = String(Math.max(0, Math.floor(time))).padStart(3, '0');
  }

  function showModeOverlay(title, text, sub) {
    if (!overlay) return;
    overlay.classList.remove('hidden');
    overlay.style.background = 'rgba(0, 0, 0, 0.66)';
    document.getElementById('game-overlay-title').textContent = title;
    document.getElementById('game-overlay-text').innerHTML = text;
    document.getElementById('game-overlay-sub').textContent = sub;
  }

  function hideModeOverlay() {
    overlay?.classList.add('hidden');
  }

  function startF1() {
    const w = canvas.clientWidth || 960;
    const h = canvas.clientHeight || 150;
    state = {
      type: 'f1',
      started: false,
      x: w * 0.5,
      speed: 0,
      score: 0,
      lap: 1,
      time: 300,
      heat: 0,
      obstacles: [],
      markers: [],
      spawn: 0,
      stripe: 0
    };
    setHud(0, 0, state.time);
    showModeOverlay('MAX GP CIRCUIT', '<div class="ctrl-box"><div class="ctrl-row">LEFT / RIGHT: Steer</div><div class="ctrl-row">UP: Accelerate · DOWN: Brake</div><div class="ctrl-row green-text">Use DRS lines, collect apex markers, avoid rival cars.</div></div>', 'PRESS ENTER / TAP FOR LIGHTS OUT');
  }

  function startPokemon() {
    const w = canvas.clientWidth || 960;
    const h = canvas.clientHeight || 150;
    state = {
      type: 'pokemon',
      started: false,
      trainerX: w * 0.5,
      hp: 100,
      attackFlash: 0,
      score: 0,
      caught: 0,
      time: 300,
      balls: [],
      wild: makeWildPokemon(w, h),
      grass: Array.from({ length: 36 }, (_, i) => ({ x: i * 38, y: h - 18 - Math.random() * 20 }))
    };
    setHud(0, 0, state.time);
    showModeOverlay('KANTO ROUTE 26', '<div class="ctrl-box"><div class="ctrl-row">LEFT / RIGHT: Move Ash</div><div class="ctrl-row">SPACE / ENTER: Throw Pokeball</div><div class="ctrl-row green-text">Catch when calm. Fight when it charges.</div></div>', 'PRESS ENTER / TAP TO TRAIN');
  }

  function makeWildPokemon(w, h) {
    const names = ['PIKACHU', 'CHARMANDER', 'BULBASAUR', 'SQUIRTLE', 'EEVEE'];
    return {
      name: names[Math.floor(Math.random() * names.length)],
      x: 80 + Math.random() * Math.max(120, w - 160),
      y: 40 + Math.random() * Math.max(30, h - 95),
      vx: Math.random() > 0.5 ? 1.1 : -1.1,
      mood: 0,
      hp: 3,
      maxHp: 3
    };
  }

  function beginIfNeeded() {
    if (!state.started) {
      state.started = true;
      hideModeOverlay();
    }
  }

  function updateF1(dt) {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    beginIfNeeded();
    if (keys.ArrowUp || keys.KeyW) state.speed = Math.min(9, state.speed + dt * 0.018);
    else state.speed = Math.max(2.2, state.speed - dt * 0.006);
    if (keys.ArrowDown || keys.KeyS) state.speed = Math.max(1.2, state.speed - dt * 0.025);
    if (keys.ArrowLeft || keys.KeyA) state.x -= dt * 0.28;
    if (keys.ArrowRight || keys.KeyD) state.x += dt * 0.28;
    state.x = Math.max(w * 0.28, Math.min(w * 0.72, state.x));
    state.heat = Math.max(0, state.heat - dt * 0.02);

    state.spawn -= dt;
    if (state.spawn <= 0) {
      const lanes = [0.36, 0.45, 0.55, 0.64];
      state.spawn = 460 - Math.min(230, state.score * 0.025);
      state.obstacles.push({
        x: w * lanes[Math.floor(Math.random() * lanes.length)],
        y: -36,
        color: Math.random() > 0.5 ? '#f4f4f4' : '#00d2be',
        accent: Math.random() > 0.5 ? '#d71920' : '#f7d117',
        hit: false
      });
      if (Math.random() > 0.34) state.markers.push({ x: w * (0.30 + Math.random() * 0.40), y: -18, got: false });
    }

    state.stripe += state.speed * dt * 0.06;
    state.time -= dt * 0.012;
    state.score += state.speed * dt * 0.018;
    if (state.score > state.lap * 900) state.lap += 1;

    state.obstacles.forEach(car => { car.y += state.speed * dt * 0.04; });
    state.markers.forEach(marker => { marker.y += state.speed * dt * 0.045; });

    const carBox = { x: state.x - 15, y: h - 52, w: 30, h: 38 };
    state.obstacles.forEach(car => {
      if (!car.hit && rectsHit(carBox, { x: car.x - 16, y: car.y - 18, w: 32, h: 36 })) {
        car.hit = true;
        state.heat = 180;
        state.speed = Math.max(1.3, state.speed * 0.45);
        state.score = Math.max(0, state.score - 120);
      }
    });
    state.markers.forEach(marker => {
      if (!marker.got && rectsHit(carBox, { x: marker.x - 12, y: marker.y - 12, w: 24, h: 24 })) {
        marker.got = true;
        state.score += 150;
      }
    });
    state.obstacles = state.obstacles.filter(car => car.y < h + 40);
    state.markers = state.markers.filter(marker => marker.y < h + 30 && !marker.got);
    setHud(state.score, state.lap, state.time);
  }

  function updatePokemon(dt) {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    beginIfNeeded();
    if (keys.ArrowLeft || keys.KeyA) state.trainerX -= dt * 0.22;
    if (keys.ArrowRight || keys.KeyD) state.trainerX += dt * 0.22;
    state.trainerX = Math.max(28, Math.min(w - 28, state.trainerX));
    state.time -= dt * 0.012;
    state.attackFlash = Math.max(0, state.attackFlash - dt);

    const wild = state.wild;
    wild.x += wild.vx * dt * 0.055;
    wild.mood += dt * 0.004;
    if (wild.x < 34 || wild.x > w - 34) wild.vx *= -1;
    if (wild.mood > 12) {
      wild.mood = 0;
      wild.vx *= -1.15;
      state.attackFlash = 180;
      state.hp = Math.max(0, state.hp - 6);
    }

    state.balls.forEach(ball => {
      ball.y -= dt * 0.34;
      ball.x += ball.vx * dt * 0.03;
      if (!ball.hit && distance(ball.x, ball.y, wild.x, wild.y) < 24) {
        ball.hit = true;
        wild.hp -= 1;
        state.score += 80;
        if (wild.hp <= 0) {
          state.caught += 1;
          state.score += 260;
          state.wild = makeWildPokemon(w, h);
        }
      }
    });
    state.balls = state.balls.filter(ball => ball.y > -20 && !ball.hit);
    setHud(state.score, state.caught, state.time);
  }

  function drawF1() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#07142f';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#06122d';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#0b1f4d';
    for (let i = 0; i < 6; i++) {
      ctx.fillRect(i * 190 - (state.stripe % 190), 0, 92, h);
    }
    ctx.fillStyle = '#202738';
    ctx.beginPath();
    ctx.moveTo(w * 0.22, h);
    ctx.lineTo(w * 0.40, 0);
    ctx.lineTo(w * 0.60, 0);
    ctx.lineTo(w * 0.78, h);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#d71920';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(w * 0.23, h);
    ctx.lineTo(w * 0.40, 0);
    ctx.moveTo(w * 0.77, h);
    ctx.lineTo(w * 0.60, 0);
    ctx.stroke();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.setLineDash([12, 14]);
    ctx.lineDashOffset = -state.stripe;
    [0.42, 0.5, 0.58].forEach(line => {
      ctx.beginPath();
      ctx.moveTo(w * line, 0);
      ctx.lineTo(w * line, h);
      ctx.stroke();
    });
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.fillStyle = '#f7d117';
    state.markers.forEach(marker => drawDiamond(marker.x, marker.y, 10));
    state.obstacles.forEach(car => drawF1Car(car.x, car.y, car.color, car.accent, false));
    drawF1Car(state.x, h - 35, '#0b1f4d', '#f7d117');
    if (state.heat > 0) {
      ctx.fillStyle = `rgba(215, 25, 32, ${Math.min(0.32, state.heat / 600)})`;
      ctx.fillRect(0, 0, w, h);
    }
    drawF1Telemetry(w, h);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 12px Outfit, sans-serif';
    ctx.fillText(playerName, 14, h - 12);
  }

  function drawPokemon() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#ff6b70');
    grad.addColorStop(0.44, '#d8292f');
    grad.addColorStop(0.45, '#1a1a1a');
    grad.addColorStop(0.52, '#fff6dc');
    grad.addColorStop(1, '#67b85a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.arc(w - 82, 34, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.45);
    ctx.lineTo(w, h * 0.45);
    ctx.stroke();
    ctx.fillStyle = '#2f8a3d';
    state.grass.forEach(g => {
      ctx.fillRect(g.x, g.y, 5, 18);
      ctx.fillRect(g.x + 8, g.y + 4, 5, 14);
    });
    drawPokemonCreature(state.wild);
    state.balls.forEach(ball => drawPokeball(ball.x, ball.y, 7));
    drawAshSprite(state.trainerX, h - 18);
    drawPokedexPanel(w, h);
    if (state.attackFlash > 0) {
      ctx.fillStyle = `rgba(255, 203, 5, ${Math.min(0.28, state.attackFlash / 700)})`;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 12px Outfit, sans-serif';
    ctx.fillText(`${playerName} HP ${state.hp}`, 14, h - 12);
  }

  function rectsHit(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function distance(ax, ay, bx, by) {
    return Math.hypot(ax - bx, ay - by);
  }

  function drawDiamond(x, y, r) {
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.lineTo(x + r, y);
    ctx.lineTo(x, y + r);
    ctx.lineTo(x - r, y);
    ctx.closePath();
    ctx.fill();
  }

  function drawF1Car(x, y, body, accent) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    ctx.fillStyle = '#050505';
    ctx.fillRect(-25, -21, 50, 8);
    ctx.fillRect(-23, 15, 46, 8);
    ctx.fillRect(-19, -28, 38, 6);
    ctx.fillRect(-17, 24, 34, 5);
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(0, -31);
    ctx.lineTo(14, -18);
    ctx.lineTo(11, 24);
    ctx.lineTo(0, 34);
    ctx.lineTo(-11, 24);
    ctx.lineTo(-14, -18);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.fillRect(-5, -24, 10, 44);
    ctx.fillRect(-15, -10, 30, 7);
    if (body === '#0b1f4d') {
      ctx.fillStyle = '#d71920';
      ctx.fillRect(-10, 8, 20, 9);
      ctx.fillRect(-22, -19, 8, 6);
      ctx.fillRect(14, -19, 8, 6);
      ctx.fillStyle = '#f7d117';
      ctx.fillRect(-3, -28, 6, 10);
    }
    ctx.fillStyle = '#96f2ff';
    ctx.fillRect(-5, -9, 10, 9);
    ctx.fillStyle = '#ffef9f';
    ctx.fillRect(-3, 25, 6, 8);
    ctx.restore();
  }

  function drawF1Telemetry(w, h) {
    ctx.fillStyle = 'rgba(6, 18, 45, 0.9)';
    ctx.fillRect(12, 10, 150, 42);
    ctx.strokeStyle = '#f7d117';
    ctx.strokeRect(12, 10, 150, 42);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 11px Outfit, sans-serif';
    ctx.fillText(`LAP ${state.lap}`, 24, 28);
    ctx.fillText(`SPEED ${Math.round(state.speed * 37)} KM/H`, 24, 44);
  }

  function drawPokemonCreature(wild) {
    ctx.fillStyle = '#ffcb05';
    ctx.beginPath();
    ctx.arc(wild.x, wild.y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#17224d';
    ctx.fillRect(wild.x - 8, wild.y - 5, 4, 4);
    ctx.fillRect(wild.x + 5, wild.y - 5, 4, 4);
    ctx.fillStyle = '#ef5350';
    ctx.fillRect(wild.x - 18, wild.y + 4, 7, 6);
    ctx.fillRect(wild.x + 11, wild.y + 4, 7, 6);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 10px Outfit, sans-serif';
    ctx.fillText(`${wild.name} HP ${wild.hp}`, wild.x - 36, wild.y - 28);
  }

  function drawPokedexPanel(w, h) {
    const panelW = Math.min(210, w * 0.26);
    const x = w - panelW - 12;
    const y = 10;
    ctx.fillStyle = '#d8292f';
    ctx.fillRect(x, y, panelW, 70);
    ctx.fillStyle = '#8f141a';
    ctx.fillRect(x + 5, y + 5, panelW - 10, 60);
    ctx.fillStyle = '#9ee7ff';
    ctx.fillRect(x + 14, y + 15, 54, 38);
    ctx.fillStyle = '#ffcb05';
    ctx.beginPath();
    ctx.arc(x + 41, y + 34, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 10px Outfit, sans-serif';
    ctx.fillText('POKEDEX', x + 80, y + 25);
    ctx.fillText(state.wild.name, x + 80, y + 42);
    ctx.fillText(`HP ${state.wild.hp}/${state.wild.maxHp}  CAUGHT ${state.caught}`, x + 80, y + 58);
  }

  function drawAshSprite(x, groundY) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(groundY));
    ctx.imageSmoothingEnabled = false;

    // Shoes and jeans
    ctx.fillStyle = '#17224d';
    ctx.fillRect(-12, -18, 8, 16);
    ctx.fillRect(4, -18, 8, 16);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-14, -3, 10, 4);
    ctx.fillRect(4, -3, 10, 4);

    // Jacket, shirt, arms
    ctx.fillStyle = '#2f6fc8';
    ctx.fillRect(-14, -37, 28, 20);
    ctx.fillStyle = '#fff4d5';
    ctx.fillRect(-5, -36, 10, 18);
    ctx.fillStyle = '#f1b184';
    ctx.fillRect(-20, -34, 6, 16);
    ctx.fillRect(14, -34, 6, 16);

    // Head and hair
    ctx.fillStyle = '#f1b184';
    ctx.fillRect(-9, -51, 18, 15);
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(-11, -54, 22, 6);
    ctx.fillRect(-12, -49, 5, 8);

    // Ash-style red cap with white front
    ctx.fillStyle = '#d8292f';
    ctx.fillRect(-13, -61, 26, 8);
    ctx.fillRect(-17, -56, 16, 5);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-4, -61, 8, 8);
    ctx.fillStyle = '#2f8a3d';
    ctx.fillRect(-1, -58, 3, 3);

    // Face pixels
    ctx.fillStyle = '#17224d';
    ctx.fillRect(-5, -46, 3, 3);
    ctx.fillRect(5, -46, 3, 3);
    ctx.fillStyle = '#a65f3a';
    ctx.fillRect(-2, -40, 7, 2);
    ctx.restore();
  }

  function drawPokeball(x, y, r) {
    ctx.fillStyle = '#ef5350';
    ctx.beginPath();
    ctx.arc(x, y, r, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#17224d';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.moveTo(x - r, y);
    ctx.lineTo(x + r, y);
    ctx.stroke();
  }

  function loop(now) {
    if (!running) return;
    const dt = Math.min(34, now - lastTime || 16);
    lastTime = now;
    if (state.started) {
      if (mode === 'f1') updateF1(dt);
      if (mode === 'pokemon') updatePokemon(dt);
    }
    if (mode === 'f1') drawF1();
    if (mode === 'pokemon') drawPokemon();
    requestAnimationFrame(loop);
  }

  window.activateModeGame = function (nextMode, nextPlayerName) {
    mode = nextMode || 'classic';
    playerName = nextPlayerName || (mode === 'f1' ? 'Max Verstappen' : 'Ash Ketchum');
    resize();
    if (mode === 'classic') {
      running = false;
      canvas.style.display = 'none';
      if (marioCanvas) marioCanvas.style.display = 'block';
      return;
    }

    canvas.style.display = 'block';
    if (marioCanvas) marioCanvas.style.display = 'none';
    if (mode === 'f1') startF1();
    if (mode === 'pokemon') startPokemon();
    if (!running) {
      running = true;
      lastTime = performance.now();
      requestAnimationFrame(loop);
    }
  };

  if (typeof window.getCurrentArcadeMode === 'function') {
    const current = window.getCurrentArcadeMode();
    window.activateModeGame(current.theme, current.playerName);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('keydown', event => {
    keys[event.code] = true;
    if (mode === 'classic') return;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'Enter'].includes(event.code)) {
      event.preventDefault();
    }
    if (event.code === 'Enter') beginIfNeeded();
    if (mode === 'pokemon' && (event.code === 'Space' || event.code === 'Enter') && state.started) {
      state.balls.push({ x: state.trainerX, y: canvas.clientHeight - 48, vx: (state.wild.x - state.trainerX) * 0.025, hit: false });
    }
  });
  window.addEventListener('keyup', event => { keys[event.code] = false; });
  canvas.addEventListener('click', () => {
    if (mode === 'classic') return;
    if (!state.started) beginIfNeeded();
    else if (mode === 'pokemon') state.balls.push({ x: state.trainerX, y: canvas.clientHeight - 48, vx: (state.wild.x - state.trainerX) * 0.025, hit: false });
  });
})();
