/* ═══════════════════════════════════════════════
   UPSIFS — RETRO 8-BIT ARCADE SCRIPT
   Three.js WebGL & GSAP Endless Infinite Super Mario Engine (60 FPS)
   Full-Viewport Scaling + Drifting 8-Bit Clouds
   ═══════════════════════════════════════════════ */

// ═══════════════ STUDENT NAMES DATABASE ═══════════════
const studentNames = [
  "STUDENT 1: RAHUL SHARMA (B.SC CYBER SEC)",
  "STUDENT 2: ANANYA SINGH (M.SC FORENSICS)",
  "STUDENT 3: VIKRAM ADITYA (DIGITAL EVIDENCE)",
  "STUDENT 4: PRIYA SHARMA (CYBER CRIME INV)",
  "STUDENT 5: AMAN VERMA (B.SC CYBER SEC)",
  "STUDENT 6: SNEHA PATEL (M.SC FORENSICS)",
  "STUDENT 7: DEEPAK KUMAR (DNA FORENSICS)",
  "STUDENT 8: AARAV MEHTA (CYBER SECURITY)",
  "STUDENT 9: RIYA GUPTA (FORENSIC TOXICOLOGY)",
  "STUDENT 10: ROHIT VERMA (DIGITAL EVIDENCE)",
  "STUDENT 11: ISHA TIVARI (CYBER AUDIT)",
  "STUDENT 12: KAVYA REDDY (BALLISTICS LAB)",
  "STUDENT 13: ADITYA ROY (NETWORK FORENSICS)",
  "STUDENT 14: NEHA CHOWDHURY (M.SC FORENSICS)",
  "STUDENT 15: HARSH VARDHAN (B.SC CYBER SEC)",
  "STUDENT 16: POOJA JOSHI (QUESTIONED DOCS)",
  "STUDENT 17: TARUN MALHOTRA (ETHICAL HACKING)",
  "STUDENT 18: ANUSHKA SEN (FORENSIC SEROLOGY)",
  "STUDENT 19: MANISH PANDEY (CLOUD FORENSICS)",
  "STUDENT 20: SANYA KAPOOR (B.SC CYBER SEC)",
  "STUDENT 21: ABHINAV MISHRA (DIGITAL EVIDENCE)",
  "STUDENT 22: SHWETA DUBEY (FORENSIC CHEMISTRY)",
  "STUDENT 23: VISHAL SRIVASTAVA (CYBER SEC)",
  "STUDENT 24: PRIYANKA DAS (FINGERPRINT LAB)",
  "STUDENT 25: DEVENDRA RATHORE (MOBILE FORENSICS)",
  "STUDENT 26: TANVI SAXENA (M.SC FORENSICS)",
  "STUDENT 27: SIDDHARTH NAIR (B.SC CYBER SEC)",
  "STUDENT 28: SIMRAN KAUR (FORENSIC PSYCHOLOGY)",
  "STUDENT 29: YASH TRIPATHI (MALWARE ANALYSIS)",
  "STUDENT 30: KRITI RAWAT (DIGITAL EVIDENCE)",
  "STUDENT 31: KUNAL DESHMUKH (CYBER LAWS)",
  "STUDENT 32: SHREYA BANSAL (M.SC FORENSICS)",
  "STUDENT 33: ALOK AGARWAL (CRYPTO INVESTIGATION)",
  "STUDENT 34: MEGHA THAKUR (FORENSIC BIOLOGY)",
  "STUDENT 35: SACHIN YADAV (B.SC CYBER SEC)",
  "STUDENT 36: ANIKET TIWARI (NETWORK SECURITY)",
  "STUDENT 37: RADHIKA SHAH (DIGITAL EVIDENCE)",
  "STUDENT 38: UTKARSH CHAUHAN (FORENSIC PHYSICS)",
  "STUDENT 39: SWATI JAIN (CYBER CRIMINOLOGY)",
  "STUDENT 40: AKASH GUPTA (B.SC CYBER SEC)",
  "STUDENT 41: NISHA CHATURVEDI (DNA LAB)",
  "STUDENT 42: SHIVAM RATHI (OSINT & RECON)",
  "STUDENT 43: AANCHAL BHATIA (M.SC FORENSICS)",
  "STUDENT 44: RISHABH JOSHI (DIGITAL EVIDENCE)",
  "STUDENT 45: PALAK SOOD (CYBER THREAT INTEL)",
  "STUDENT 46: VAIBHAV KULKARNI (BALLISTICS)",
  "STUDENT 47: RICHA SINHA (B.SC CYBER SEC)",
  "STUDENT 48: NIKHIL SARENE (FINANCIAL CRIMES)",
  "STUDENT 49: DIVYA SHARMA (M.SC FORENSICS)",
  "STUDENT 50: PARTH DWIVEDI (REVERSE ENGG)",
  "STUDENT 51: CHARU MEHTA (DIGITAL EVIDENCE)",
  "STUDENT 52: GAU RAV DAVE (B.SC CYBER SEC)",
  "STUDENT 53: MUSKAN AGARWAL (TOXICOLOGY)",
  "STUDENT 54: ARYAN KHANNA (SOC ANALYST)",
  "STUDENT 55: DRISHTI BAJAJ (M.SC FORENSICS)",
  "STUDENT 56: RAHUL SOLANKI (CYBER LAWS)",
  "STUDENT 57: TANIYA MITTAL (DIGITAL EVIDENCE)",
  "STUDENT 58: MAYANK GARG (B.SC CYBER SEC)",
  "STUDENT 59: DISHA CHABRA (CRIME SCENE INV)",
  "STUDENT 60: VARUN PILLAI (IOT FORENSICS)",
  "STUDENT 61: SAMIKSHA RAO (M.SC FORENSICS)",
  "STUDENT 62: HARSHIT CHOUDHARY (CYBER SEC)",
  "STUDENT 63: RHEAA SEHGAL (QUESTIONED DOCS)",
  "STUDENT 64: AYUSH MAHAJAN (DIGITAL EVIDENCE)",
  "STUDENT 65: SAKSHI PATIL (SEROLOGY LAB)",
  "STUDENT 66: AMIT KUMAR (B.SC CYBER SEC)",
  "STUDENT 67: GARIMA TIWARI (M.SC FORENSICS)",
  "STUDENT 68: CHIRAG DESAI (CLOUD FORENSICS)",
  "STUDENT 69: PAYAL SHARMA (DIGITAL EVIDENCE)",
  "STUDENT 70: KARAN VEER (CYBER AUDIT)",
  "STUDENT 71: DEEPIKA NAIDU (FORENSIC PSYCH)",
  "STUDENT 72: ROHAN CHOPRA (B.SC CYBER SEC)",
  "STUDENT 73: MANSI TRIPATHI (M.SC FORENSICS)",
  "STUDENT 74: SOURAV BHATTACHARJEE (NETWORK SEC)",
  "STUDENT 75: ESHA SRIVASTAVA (DIGITAL EVIDENCE)",
  "STUDENT 76: SHUBHAM RANA (MALWARE LAB)",
  "STUDENT 77: ARCHANA VERMA (TOXICOLOGY)",
  "STUDENT 78: RAJESH PAWAR (B.SC CYBER SEC)",
  "STUDENT 79: JYOTI KAUSHIK (M.SC FORENSICS)",
  "STUDENT 80: VIVEK PANDEY (INCIDENT RESPONSE)",
  "STUDENT 81: URVASHI NATH (DIGITAL EVIDENCE)",
  "STUDENT 82: PRANAV KASHYAP (ETHICAL HACKING)",
  "STUDENT 83: PRERNA SINGHAL (DNA FORENSICS)",
  "STUDENT 84: DINESH RAWAT (B.SC CYBER SEC)",
  "STUDENT 85: KANIKA BALA (M.SC FORENSICS)",
  "STUDENT 86: GURPREET SINGH (OSINT LAB)",
  "STUDENT 87: MONIKA YADAV (DIGITAL EVIDENCE)",
  "STUDENT 88: PRATEEK AGARWAL (CYBER SEC)",
  "STUDENT 89: ADITI JHA (CRIME SCENE MANAGEMENT)",
  "STUDENT 90: SAHIL NANDA (B.SC CYBER SEC)",
  "STUDENT 91: PREETI BISHT (M.SC FORENSICS)",
  "STUDENT 92: BHARAT SHARMA (MOBILE FORENSICS)",
  "STUDENT 93: SNEHAL PRADHAN (DIGITAL EVIDENCE)",
  "STUDENT 94: HEMANT RATHI (CYBER THREAT INTEL)",
  "STUDENT 95: AKANKSHA SURI (FORENSIC PHYSICS)",
  "STUDENT 96: RAJAT VERMA (B.SC CYBER SEC)",
  "STUDENT 97: VAISHNAVI SHAH (M.SC FORENSICS)",
  "STUDENT 98: ABHISHEK GUPTA (CLOUD AUDITING)",
  "STUDENT 99: RUCHI PANDEY (DIGITAL EVIDENCE)",
  "STUDENT 100: KARTIKEYA MISHRA (CYBER LAWS)",
  "STUDENT 101: NAMRATA SEN (BALLISTICS LAB)",
  "STUDENT 102: SUMIT CHAUDHARY (B.SC CYBER SEC)",
  "STUDENT 103: PRIYAL MALHOTRA (M.SC FORENSICS)",
  "STUDENT 104: ANAND SRIVASTAVA (CRYPTO FORENSICS)",
  "STUDENT 105: GEETIKA KOHLI (DIGITAL EVIDENCE)",
  "STUDENT 106: TARUN DEEP (BLOCKCHAIN SEC)",
  "STUDENT 107: SHIPRA CHAUHAN (FINGERPRINT PRINT)",
  "STUDENT 108: GAURAV MISHRA (B.SC CYBER SEC)",
  "STUDENT 109: SONAL TIWARI (M.SC FORENSICS)",
  "STUDENT 110: NAVEEN JOSHI (NETWORK INTEL)",
  "STUDENT 111: TEJASWINI NAIR (DIGITAL EVIDENCE)",
  "STUDENT 112: RAHUL DESHMUKH (CYBER AUDIT)",
  "STUDENT 113: MEENAKSHI ROY (FORENSIC BIOLOGY)",
  "STUDENT 114: AAKASH VERMA (B.SC CYBER SEC)",
  "STUDENT 115: MONA SHARMA (M.SC FORENSICS)",
  "STUDENT 116: LOKESH KAUSHIK (DRONE FORENSICS)",
  "STUDENT 117: JYOTSNA PATEL (DIGITAL EVIDENCE)",
  "STUDENT 118: SURAJ PRASAD (REVERSE ENGG)",
  "STUDENT 119: MEGHA RANI (FORENSIC TOXICOLOGY)",
  "STUDENT 120: PIYUSH CHANDRA (B.SC CYBER SEC)",
  "STUDENT 121: SONIA SEHGAL (M.SC FORENSICS)",
  "STUDENT 122: CHETAN KUMAR (CYBER THREAT ANALYST)",
  "STUDENT 123: ANKITA DUBEY (DIGITAL EVIDENCE)",
  "STUDENT 124: TUSHAR SAXENA (NETWORK DEFENSE)",
  "STUDENT 125: BHAWNA BANSAL (QUESTIONED DOCS)",
  "STUDENT 126: VISHNU THAKUR (B.SC CYBER SEC)",
  "STUDENT 127: SIMRANJEET KAUR (M.SC FORENSICS)",
  "STUDENT 128: ASHISH DWIVEDI (MOBILE FORENSICS)",
  "STUDENT 129: RITU CHATURVEDI (DIGITAL EVIDENCE)",
  "STUDENT 130: SHIVANI TANDON (CYBER CRIMINOLOGY)"
];

let activeSeniorYear = '2';
let activeSeniorQuickFilter = '';
const SENIOR_ACCESS_KEY = 'upsifs_senior_access_code';
const SENIOR_FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzd55ExHTpaKooyEFivmZEQ38sAMfAahtCviZgUK4HYV-01-Nn8CS08P1omWKx3CdaPoQ/exec';
const RESOURCE_FEED_ENDPOINT = '/api/resources/list';
const ARCADE_THEME_KEY = 'upsifs_arcade_theme';
const JUNIOR_FEEDBACK_KEY = 'upsifs_junior_feedback_notes';

const arcadeThemes = {
  classic: {
    bodyClass: '',
    logo: 'UPSIFS 2026',
    sidebarBrand: 'PAUSE MENU',
    hudPlayer: 'MARIO',
    hudWorld: 'WORLD 1-1',
    collectibleIcon: '🪙',
    bannerIcon: '🍄',
    bannerText: 'COLLECT COINS TO REVEAL BATCHMATES!',
    overlayTitle: 'WORLD 1-1',
    overlayText: '♦ UPSIFS SUPER BROS ♦',
    overlaySub: 'PRESS ENTER / TAP TO START'
  },
  app: {
    bodyClass: 'theme-app',
    logo: '',
    sidebarBrand: 'APP MENU',
    hudPlayer: 'UPSIFS',
    hudWorld: 'CAMPUS HUB',
    collectibleIcon: '•',
    bannerIcon: '✦',
    bannerText: 'Explore resources, gallery, seniors, and batchmate links.',
    overlayTitle: 'CAMPUS HUB',
    overlayText: 'UPSIFS APP MODE',
    overlaySub: 'PRESS ENTER / TAP TO START'
  }
};

let activeArcadeTheme = 'classic';
let activeTabName = 'home';
let arcadeGameInitialized = false;
const validTabNames = new Set(['home', 'about', 'resources', 'seniors', 'gallery', 'devs']);

// ═══════════════ TAB SWITCHING ═══════════════
function switchTab(tabName, updateHistory = true) {
  if (!validTabNames.has(tabName)) return;
  const previousTabName = activeTabName;

  document.querySelectorAll('.nav-btn').forEach(btn => {
    const isActive = btn.dataset.tab === tabName;
    btn.classList.toggle('active', isActive);
  });

  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === '#' + tabName || (tabName === 'home' && href === '#')) {
      link.classList.add('active');
    } else if (href && href.startsWith('#')) {
      link.classList.remove('active');
    }
  });

  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });

  const target = document.getElementById('tab-' + tabName);
  if (target) {
    activeTabName = tabName;
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (tabName === 'seniors') {
      updateSeniorFilters();
    }

    if (updateHistory && previousTabName !== tabName && window.history?.pushState) {
      const url = tabName === 'home' ? window.location.pathname : `#${tabName}`;
      window.history.pushState({ tab: tabName }, '', url);
    }
  }
}

window.switchTab = switchTab;

window.addEventListener('popstate', (event) => {
  const historyTab = event.state?.tab;
  if (validTabNames.has(historyTab)) {
    switchTab(historyTab, false);
    return;
  }

  if (activeTabName !== 'home') {
    switchTab('home', false);
    window.history.replaceState({ tab: 'home' }, '', window.location.pathname);
  }
});

function setTextById(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

const homeCopyByTheme = {
  classic: {
    title: 'WELCOME FRESHERS',
    subtitle: 'CLASS OF 2026 · PLAYER 1 READY?',
    resources: 'academic resources',
    gallery: 'college gallery',
    community: 'JUNIOR DETAIL SUBMISSION',
    seniors: 'connect with seniors',
    profile: '📝 ADD / UPDATE PROFILE',
    feedback: 'FEEDBACK ↗'
  },
  app: {
    title: 'Welcome Freshers 2026',
    subtitle: 'Resources, gallery, seniors, and community in one student-built hub',
    resources: 'academic resources →',
    gallery: 'college gallery →',
    community: 'Junior Detail Submission',
    seniors: 'connect with seniors →',
    profile: 'Update Profile →',
    feedback: 'Feedback →'
  }
};

const homeHeadlineLines = [
  'Welcome Freshers 2026',
  'All your UPSIFS. Right Here',
  'Notes? Photos? Seniors? Found.',
  'One tiny hub. Big campus energy.',
  'Less searching. More surviving.',
  'Ask seniors before panic-googling.',
  'Resources with less drama.',
  'Freshers, start here.'
];
let homeHeadlineIndex = 0;
let homeSketchShapeIndex = 0;
let homeHeadlineTimer = null;

function applyHomeCopy(themeName) {
  const copy = homeCopyByTheme[themeName] || homeCopyByTheme.classic;
  setTextById('home-title', copy.title);
  setTextById('home-subtitle', copy.subtitle);
  setTextById('home-resources-btn', copy.resources);
  setTextById('home-gallery-btn', copy.gallery);
  setTextById('home-community-btn', copy.community);
  setTextById('home-seniors-btn', copy.seniors);
  setTextById('home-profile-btn', copy.profile);
  setTextById('home-feedback-btn', copy.feedback);
}

function redrawHomeTitleSketch() {
  const sketch = document.querySelector('.home-title-sketch');
  if (!sketch) return;
  homeSketchShapeIndex = (homeSketchShapeIndex + 1) % 4;
  sketch.dataset.shape = String(homeSketchShapeIndex);
  sketch.classList.remove('draw-now');
  sketch.classList.add('is-redrawing');
  void sketch.offsetWidth;
  sketch.classList.add('draw-now');
  window.setTimeout(() => {
    sketch.classList.remove('is-redrawing', 'draw-now');
  }, 3000);
}

function startHomeHeadlineRotation() {
  if (homeHeadlineTimer || activeArcadeTheme !== 'app' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  homeHeadlineTimer = window.setInterval(() => {
    const title = document.getElementById('home-title');
    if (!title || activeArcadeTheme !== 'app') return;
    homeHeadlineIndex = (homeHeadlineIndex + 1) % homeHeadlineLines.length;
    title.classList.remove('title-swapping');
    void title.offsetWidth;
    title.textContent = homeHeadlineLines[homeHeadlineIndex];
    title.classList.add('title-swapping');
    redrawHomeTitleSketch();
  }, 12000);
}

function stopHomeHeadlineRotation() {
  if (!homeHeadlineTimer) return;
  window.clearInterval(homeHeadlineTimer);
  homeHeadlineTimer = null;
}

function applyArcadeTheme(themeName) {
  const theme = arcadeThemes[themeName] || arcadeThemes.classic;
  activeArcadeTheme = arcadeThemes[themeName] ? themeName : 'classic';

  document.body.classList.remove('theme-app');
  if (theme.bodyClass) {
    document.body.classList.add(theme.bodyClass);
  }
  applyHomeCopy(activeArcadeTheme === 'app' ? 'app' : 'classic');

  const logo = document.querySelector('.logo-text');
  if (logo) logo.textContent = theme.logo;

  const sidebarBrand = document.querySelector('.sidebar-brand');
  if (sidebarBrand) sidebarBrand.textContent = theme.sidebarBrand;

  document.querySelectorAll('.theme-option').forEach(button => {
    button.classList.toggle('active', button.dataset.themeOption === activeArcadeTheme);
  });

  if (activeArcadeTheme === 'app') {
    homeHeadlineIndex = 0;
    setTextById('home-title', homeHeadlineLines[homeHeadlineIndex]);
    redrawHomeTitleSketch();
    startHomeHeadlineRotation();
  } else {
    stopHomeHeadlineRotation();
    ensureArcadeGame();
  }
}

function ensureArcadeGame() {
  if (arcadeGameInitialized || typeof window.initMarioGame !== 'function') return;
  arcadeGameInitialized = true;
  window.initMarioGame();
}

function toggleGameDock() {
  if (activeArcadeTheme === 'app') return;
  const collapsed = document.body.classList.toggle('game-collapsed');
  const button = document.getElementById('game-toggle-btn');
  if (button) {
    button.textContent = collapsed ? 'GAME ▲' : 'GAME ▼';
    button.setAttribute('aria-expanded', String(!collapsed));
  }
}

window.toggleGameDock = toggleGameDock;

function selectArcadeTheme(themeName) {
  applyArcadeTheme(themeName);
  localStorage.setItem(ARCADE_THEME_KEY, activeArcadeTheme);
}

window.selectArcadeTheme = selectArcadeTheme;
window.getActiveArcadeThemeConfig = function () {
  return arcadeThemes[activeArcadeTheme] || arcadeThemes.classic;
};
window.getCurrentArcadeMode = function () {
  return {
    theme: activeArcadeTheme,
    playerName: 'UPSIFS'
  };
};

function changeArcadePlayerName() {
  alert('Player names are no longer used on this site.');
}

window.changeArcadePlayerName = changeArcadePlayerName;

function switchSeniorYear(year) {
  activeSeniorYear = year;
  document.querySelectorAll('.senior-year-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.year === year);
  });

  updateSeniorFilters();
}

window.switchSeniorYear = switchSeniorYear;

// ═══════════════ ACADEMIC RESOURCE BROWSER ═══════════════
const resourceState = {
  folderId: '',
  query: '',
  items: [],
  breadcrumbs: [{ id: '', name: 'academic resources' }],
  loading: false,
  error: ''
};

function resourceIcon(item) {
  if (item?.type === 'folder') return 'folder';
  const mime = String(item?.mimeType || '').toLowerCase();
  const ext = String(item?.extension || '').toLowerCase();
  if (mime.includes('pdf') || ext === 'pdf') return 'pdf';
  if (mime.startsWith('image/') || ['jpg', 'jpeg', 'png', 'webp'].includes(ext)) return 'image';
  if (mime.includes('presentation') || ['ppt', 'pptx'].includes(ext)) return 'slides';
  if (mime.includes('document') || ['doc', 'docx'].includes(ext)) return 'doc';
  if (mime.includes('zip') || ['zip', 'rar', '7z'].includes(ext)) return 'zip';
  return 'file';
}

function escapeResourceText(value) {
  return String(value || '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function formatBytes(size) {
  if (!Number.isFinite(size)) return 'size unknown';
  if (size < 1024) return `${size} B`;
  const units = ['KB', 'MB', 'GB'];
  let value = size / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unit]}`;
}

function formatResourceDate(value) {
  if (!value) return 'date unknown';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'date unknown';
  return date.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
}

function filteredResources() {
  const query = resourceState.query.trim().toLowerCase();
  const items = [...resourceState.items].sort((a, b) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
    return String(a.name || '').localeCompare(String(b.name || ''), undefined, { sensitivity: 'base' });
  });
  if (!query) return items;
  return items.filter(item => [item.name, item.mimeType, item.extension, item.type].join(' ').toLowerCase().includes(query));
}

function renderResourceBreadcrumbs() {
  const wrap = document.getElementById('resource-breadcrumbs');
  if (!wrap) return;
  wrap.replaceChildren(...resourceState.breadcrumbs.map((crumb, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = crumb.name;
    button.disabled = index === resourceState.breadcrumbs.length - 1;
    button.addEventListener('click', () => {
      resourceState.breadcrumbs = resourceState.breadcrumbs.slice(0, index + 1);
      loadResourceFolder(crumb.id);
    });
    return button;
  }));
}

function renderFolderCard(item) {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'resource-folder-card';
  card.innerHTML = `
    <span>${escapeResourceText(item.name)}</span>
  `;
  card.addEventListener('click', () => {
    resourceState.breadcrumbs.push({ id: item.id, name: item.name });
    loadResourceFolder(item.id);
  });
  return card;
}

function renderResourceCard(item) {
  const card = document.createElement('article');
  card.className = 'resource-file-card';

  card.innerHTML = `
    <div class="resource-file-icon" aria-hidden="true">${resourceIcon(item)}</div>
    <div class="resource-file-main">
      <h4>${escapeResourceText(item.name)}</h4>
      <p>${escapeResourceText(item.mimeType || 'file')} · ${formatBytes(item.size)} · ${formatResourceDate(item.modifiedTime)}</p>
    </div>
    <div class="resource-actions">
      <button class="resource-action view" type="button" ${item.previewable ? '' : 'disabled'}>preview</button>
      <a class="resource-action download" href="${item.downloadUrl}">download</a>
    </div>
  `;
  card.querySelector('.resource-action.view')?.addEventListener('click', () => {
    openResourcePreview(item.id, item.name, item.mimeType);
  });
  return card;
}

function renderResources() {
  const groupWrap = document.getElementById('resource-groups');
  const count = document.getElementById('resource-count');
  if (!groupWrap) return;

  renderResourceBreadcrumbs();

  if (resourceState.loading) {
    if (count) count.textContent = 'loading academic resources...';
    groupWrap.innerHTML = '<p class="resource-empty">loading resources...</p>';
    return;
  }

  if (resourceState.error) {
    if (count) count.textContent = 'resources unavailable';
    groupWrap.innerHTML = `<p class="resource-empty">${escapeResourceText(resourceState.error)}</p>`;
    return;
  }

  const visible = filteredResources();
  const folders = visible.filter(item => item.type === 'folder');
  const files = visible.filter(item => item.type !== 'folder');
  if (count) count.textContent = `${folders.length} folders · ${files.length} files`;

  if (!visible.length) {
    groupWrap.innerHTML = '<p class="resource-empty">No matching folders or files found.</p>';
    return;
  }

  const folderGrid = document.createElement('div');
  folderGrid.className = 'resource-folder-grid';
  folders.forEach(folder => folderGrid.appendChild(renderFolderCard(folder)));

  const fileGrid = document.createElement('div');
  fileGrid.className = 'resource-file-grid';
  files.forEach(file => fileGrid.appendChild(renderResourceCard(file)));

  groupWrap.replaceChildren(folderGrid, fileGrid);
}

window.renderResources = renderResources;

async function loadResourceFolder(folderId = resourceState.folderId) {
  resourceState.folderId = folderId || '';
  resourceState.loading = true;
  resourceState.error = '';
  renderResources();

  try {
    const suffix = resourceState.folderId ? `?folderId=${encodeURIComponent(resourceState.folderId)}` : '';
    const response = await fetch(`${RESOURCE_FEED_ENDPOINT}${suffix}`, { cache: 'no-store' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Could not load Drive resources.');
    resourceState.items = Array.isArray(data.items) ? data.items : [];
  } catch (error) {
    console.warn('Live Drive resource sync failed.', error);
    resourceState.items = [];
    resourceState.error = 'resources could not load right now.';
  } finally {
    resourceState.loading = false;
    renderResources();
  }
}

function loadResourceFeed() {
  resourceState.breadcrumbs = [{ id: '', name: 'academic resources' }];
  return loadResourceFolder('');
}

function setSeniorQuickFilter(filter) {
  activeSeniorQuickFilter = filter || '';
  document.querySelectorAll('.senior-quick-btn').forEach(btn => {
    btn.classList.toggle('active', (btn.dataset.filter || '') === activeSeniorQuickFilter);
  });
  updateSeniorFilters();
}

window.setSeniorQuickFilter = setSeniorQuickFilter;

function openSeniorForm() {
  const panel = document.getElementById('senior-submit-panel');
  panel?.classList.add('active');
  window.setTimeout(() => panel?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
}

function toggleSeniorForm() {
  document.getElementById('senior-submit-panel')?.classList.toggle('active');
}

window.openSeniorForm = openSeniorForm;
window.toggleSeniorForm = toggleSeniorForm;

function getSeniorAccessCode() {
  try {
    return sessionStorage.getItem(SENIOR_ACCESS_KEY) || '';
  } catch {
    return '';
  }
}

function saveSeniorAccessCode(code) {
  try {
    sessionStorage.setItem(SENIOR_ACCESS_KEY, code);
  } catch {
    // Ignore private-browsing storage failures.
  }
}

function setSeniorAreaLocked(isLocked, message = '') {
  document.getElementById('senior-private-area')?.classList.toggle('locked', isLocked);
  document.getElementById('senior-access-lock')?.classList.toggle('unlocked', !isLocked);
  const status = document.getElementById('senior-lock-status');
  if (status && message) status.textContent = message;
}

function normalizeInstagram(value) {
  const clean = (value || '').trim();
  if (!clean) return '';
  if (clean.startsWith('http')) return clean;
  return `https://www.instagram.com/${clean.replace(/^@/, '')}/`;
}

function normalizeLinkedIn(value) {
  const clean = (value || '').trim();
  if (!clean) return '';
  if (clean.startsWith('http')) return clean;
  const slug = clean.replace(/^@/, '').replace(/^in\//, '');
  return `https://www.linkedin.com/in/${slug}`;
}

function normalizeWhatsapp(value) {
  const digits = (value || '').replace(/\D/g, '');
  if (!digits) return '';
  return digits.length === 10 ? `91${digits}` : digits;
}

function seniorIdentityKey(profile) {
  const enrollment = normalizeSearchText(profile.enrollment || profile.enrollmentNumber || profile.roll || '');
  const phone = normalizeWhatsapp(profile.whatsapp || profile.mobile || '');
  return enrollment || phone || normalizeSearchText(profile.name || '');
}

function initialsFromName(name) {
  return (name || 'UP')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('') || 'UP';
}

function createSubmittedSeniorCard(profile) {
  const article = document.createElement('article');
  article.className = 'senior-card submitted-card';
  article.dataset.seniorYear = profile.year || profile.board || '2';
  if (profile.source) article.dataset.source = profile.source;
  if (profile.enrollment) article.dataset.enrollment = profile.enrollment;

  const place = (profile.place || 'PENDING').trim().toUpperCase();
  const safeName = escapeHtml(profile.name || 'New Profile');
  const safeTagline = escapeHtml(profile.tagline || 'Pending approval');
  const safeSkills = escapeHtml(profile.skills || 'Profile update submitted');
  const photo = (profile.photo || '').trim();
  const whatsapp = normalizeWhatsapp(profile.whatsapp);
  const instagram = normalizeInstagram(profile.instagram);
  const linkedin = normalizeLinkedIn(profile.linkedin);
  const resume = (profile.resume || '').trim();

  const photoHtml = photo
    ? `<img class="senior-photo" src="${escapeHtml(photo)}" alt="${safeName}">`
    : `<div class="senior-photo" aria-label="${safeName} photo">${initialsFromName(profile.name)}</div>`;

  const actions = [
    whatsapp ? `<a href="https://wa.me/${whatsapp}" target="_blank" rel="noopener noreferrer" class="senior-connect">WHATSAPP ↗</a>` : '',
    instagram ? `<a href="${escapeHtml(instagram)}" target="_blank" rel="noopener noreferrer" class="senior-connect senior-instagram">INSTAGRAM ↗</a>` : '',
    linkedin ? `<a href="${escapeHtml(linkedin)}" target="_blank" rel="noopener noreferrer" class="senior-connect senior-linkedin">LINKEDIN ↗</a>` : '',
    resume ? `<a href="${escapeHtml(resume)}" target="_blank" rel="noopener noreferrer" class="senior-connect">RESUME ↗</a>` : ''
  ].filter(Boolean).join('');

  article.innerHTML = `
    <div class="senior-top">
      <span class="senior-chip">${escapeHtml(place)}</span>
    </div>
    ${photoHtml}
    <div class="senior-info">
      <h2>${safeName}</h2>
      <p>${safeTagline}</p>
      <span>${safeSkills}</span>
    </div>
    <div class="senior-actions">
      ${actions || '<span class="senior-connect senior-disabled">PENDING ↗</span>'}
    </div>
  `;

  return article;
}

function coalesceProfileValue(profile, ...keys) {
  for (const key of keys) {
    const value = profile[key];
    if (value !== undefined && value !== null && String(value).trim()) {
      return String(value).trim();
    }
  }
  return '';
}

function normalizeRemoteSeniorProfile(row) {
  const name = coalesceProfileValue(row, 'displayName', 'name', 'Your Name');
  const course = coalesceProfileValue(row, 'displayBoard', 'board', 'year', 'Your Course And Semester', 'Your Course');
  const forcedLawNames = ['shashwat pande', 'shashwat pandey', 'pranav sagar', 'pranavsagar'];
  const normalizedName = normalizeSearchText(name);
  const board = forcedLawNames.some(forcedName => normalizedName.includes(forcedName))
    ? 'law2'
    : /law|llb/i.test(course) ? 'law2' : /^(3|b\.?tech\s*y?3|year\s*3)$/i.test(course) ? '3' : '2';
  const photo = coalesceProfileValue(row, 'displayPhoto', 'photo', 'Profile Photo', 'Profile Photo (if you want)');

  return {
    source: 'remote',
    name,
    year: board === 'law2' ? 'law2' : board === '3' ? '3' : '2',
    enrollment: coalesceProfileValue(row, 'displayEnrollment', 'enrollment', 'Enrollment Number'),
    place: coalesceProfileValue(row, 'displayPlace', 'place', 'Place (Kha se Hai Aap)'),
    tagline: coalesceProfileValue(row, 'displayTagline', 'tagline', 'TagLine (Experience or Something good about u)', 'TagLine (Experience or Something good about u) like IIC Member/ Interned at etc kuch bhi cool aapne kiya ho'),
    skills: coalesceProfileValue(row, 'displaySkills', 'skills', 'Topics You Can Guide On', 'Your Interest (This will appear on your profile)'),
    photo,
    whatsapp: coalesceProfileValue(row, 'displayWhatsapp', 'whatsapp', 'Your Mobile Number (Whatsapp)'),
    instagram: coalesceProfileValue(row, 'displayInstagram', 'instagram', 'Your Instagram'),
    linkedin: coalesceProfileValue(row, 'displayLinkedin', 'linkedin'),
    resume: coalesceProfileValue(row, 'displayResume', 'resume', 'Resume')
  };
}

function hideStaticSeniorDuplicates(remoteProfiles) {
  const remoteKeys = new Set(remoteProfiles.flatMap(profile => [
    seniorIdentityKey(profile),
    normalizeSearchText(profile.name || '')
  ]).filter(Boolean));
  document.querySelectorAll('.senior-card:not([data-source])').forEach(card => {
    const name = card.querySelector('h2')?.textContent || '';
    card.classList.toggle('hidden-by-remote', remoteKeys.has(normalizeSearchText(name)));
  });
}

function sortSeniorCardsAlphabetically() {
  const grid = document.querySelector('.seniors-grid');
  if (!grid) return;
  [...grid.querySelectorAll('.senior-card')]
    .sort((a, b) => {
      const yearA = a.dataset.seniorYear || '';
      const yearB = b.dataset.seniorYear || '';
      if (yearA !== yearB) return yearA.localeCompare(yearB);
      const nameA = normalizeSearchText(a.querySelector('h2')?.textContent || '');
      const nameB = normalizeSearchText(b.querySelector('h2')?.textContent || '');
      return nameA.localeCompare(nameB);
    })
    .forEach(card => grid.appendChild(card));
}

async function loadApprovedSeniorProfiles() {
  if (!SENIOR_FORM_ENDPOINT) return;
  const code = getSeniorAccessCode();
  if (!code) {
    setSeniorAreaLocked(true);
    return;
  }

  const grid = document.querySelector('.seniors-grid');
  if (!grid) return;

  try {
    const url = new URL(SENIOR_FORM_ENDPOINT);
    url.searchParams.set('code', code);
    const response = await fetch(url.toString(), { method: 'GET' });
    if (!response.ok) throw new Error('Access denied');
    const rows = await response.json();
    if (rows?.error) throw new Error(rows.error);
    if (!Array.isArray(rows)) return;

    const profilesByKey = new Map();
    rows
      .map(normalizeRemoteSeniorProfile)
      .filter(profile => profile.name && seniorIdentityKey(profile))
      .forEach(profile => profilesByKey.set(seniorIdentityKey(profile), profile));

    const profiles = [...profilesByKey.values()];
    document.querySelectorAll('[data-source="remote"]').forEach(card => card.remove());
    hideStaticSeniorDuplicates(profiles);
    setSeniorAreaLocked(false, 'Access granted. Senior board loaded.');

    profiles.forEach(profile => {
      grid.appendChild(createSubmittedSeniorCard(profile));
    });

    sortSeniorCardsAlphabetically();
    updateSeniorFilters();
  } catch (error) {
    saveSeniorAccessCode('');
    setSeniorAreaLocked(true, 'Enrollment number not found or senior board endpoint is not ready.');
    console.warn('Senior sheet sync skipped:', error);
  }
}

async function unlockSeniorBoard(event) {
  event.preventDefault();
  const input = document.getElementById('senior-access-code');
  const code = (input?.value || '').trim();
  if (!code) return;

  saveSeniorAccessCode(code);
  setSeniorAreaLocked(true, 'Checking access...');
  await loadApprovedSeniorProfiles();
  updateSeniorFilters();
}

window.unlockSeniorBoard = unlockSeniorBoard;

async function submitSeniorProfile(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.getElementById('senior-form-status');
  const profile = Object.fromEntries(new FormData(form).entries());
  profile.updatedAt = new Date().toISOString();

  if (SENIOR_FORM_ENDPOINT) {
    try {
      await fetch(SENIOR_FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      if (status) status.textContent = 'Submitted. Your profile update is queued for approval.';
    } catch {
      if (status) status.textContent = 'Network error. Please try again in a moment.';
    }
  } else if (status) {
    status.textContent = 'Profile update endpoint is not configured yet.';
  }

  form.reset();
}

function normalizeSearchText(value) {
  return (value || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function updateSeniorFilters() {
  if (!getSeniorAccessCode()) {
    const count = document.getElementById('senior-count');
    if (count) count.textContent = 'LOCKED';
    return;
  }

  sortSeniorCardsAlphabetically();
  const search = normalizeSearchText(document.getElementById('senior-search')?.value);
  const cards = [...document.querySelectorAll('[data-senior-year]')];
  let visibleCount = 0;

  cards.forEach((card, index) => {
    const yearMatches = card.dataset.seniorYear === activeSeniorYear;
    const cardText = normalizeSearchText(card.textContent);
    const textMatches = !search || cardText.includes(search);
    const quickMatches = !activeSeniorQuickFilter || cardText.includes(activeSeniorQuickFilter);
    const isVisible = yearMatches && textMatches && quickMatches;

    card.classList.toggle('hidden', !yearMatches);
    card.classList.toggle('filtered-out', yearMatches && (!textMatches || !quickMatches));
    card.classList.remove('revealed');

    if (isVisible) {
      visibleCount++;
      window.setTimeout(() => card.classList.add('revealed'), Math.min(index * 24, 180));
    }
  });

  const count = document.getElementById('senior-count');
  if (count) {
    count.textContent = `${visibleCount} ${visibleCount === 1 ? 'SENIOR' : 'SENIORS'}`;
  }
}

window.updateSeniorFilters = updateSeniorFilters;

function closeSidebar() {
  const toggle = document.getElementById('sidebar-toggle');
  if (toggle) toggle.checked = false;
  document.body.classList.remove('sidebar-open');
}
window.closeSidebar = closeSidebar;

function getJuniorFeedbackNotes() {
  try {
    return JSON.parse(localStorage.getItem(JUNIOR_FEEDBACK_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveJuniorFeedbackNotes(notes) {
  try {
    localStorage.setItem(JUNIOR_FEEDBACK_KEY, JSON.stringify(notes.slice(0, 12)));
  } catch {
    // Ignore storage failures.
  }
}

function renderJuniorFeedbackNotes() {
  const wall = document.getElementById('junior-notes-wall');
  if (!wall) return;
  const notes = getJuniorFeedbackNotes();
  if (!notes.length) {
    wall.innerHTML = '<p class="junior-empty-note">first note goes here.</p>';
    return;
  }
  wall.innerHTML = notes.map((note, index) => `
    <article class="junior-note-card" style="--note-tilt:${index % 2 ? '1.2deg' : '-1deg'}">
      <p>${escapeHtml(note.message)}</p>
      <span>~ ${escapeHtml(note.name)}</span>
    </article>
  `).join('');
}

function openJuniorCommunity() {
  const panel = document.getElementById('junior-community-panel');
  panel?.classList.add('active');
  renderJuniorFeedbackNotes();
  window.setTimeout(() => panel?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
}

function closeJuniorCommunity() {
  document.getElementById('junior-community-panel')?.classList.remove('active');
}

function submitJuniorFeedback(event) {
  event.preventDefault();
  const nameInput = document.getElementById('junior-feedback-name');
  const messageInput = document.getElementById('junior-feedback-message');
  const name = (nameInput?.value || '').trim();
  const message = (messageInput?.value || '').trim();
  if (!name || !message) return;
  const notes = [{ name, message, createdAt: new Date().toISOString() }, ...getJuniorFeedbackNotes()];
  saveJuniorFeedbackNotes(notes);
  renderJuniorFeedbackNotes();
  event.currentTarget.reset();
}

window.openJuniorCommunity = openJuniorCommunity;
window.closeJuniorCommunity = closeJuniorCommunity;

function setupSidebarToggle() {
  const toggle = document.getElementById('sidebar-toggle');
  if (!toggle) return;
  document.body.classList.toggle('sidebar-open', toggle.checked);
  toggle.addEventListener('change', () => {
    document.body.classList.toggle('sidebar-open', toggle.checked);
  });
}

function openGalleryTab() {
  switchTab('gallery');
  renderCampusGallery();
}
window.openGalleryTab = openGalleryTab;

// ═══════════════ GALLERY MANAGEMENT (localStorage) ═══════════════
const GALLERY_KEY = 'upsifs_scaled_gallery';

function getGalleryItems() {
  try {
    return JSON.parse(localStorage.getItem(GALLERY_KEY)) || [];
  } catch {
    return [];
  }
}

function saveGalleryItems(items) {
  localStorage.setItem(GALLERY_KEY, JSON.stringify(items));
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showSiteToast(message, type = 'success') {
  const toast = document.getElementById('site-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `site-toast active ${type}`;
  window.clearTimeout(showSiteToast.timer);
  showSiteToast.timer = window.setTimeout(() => {
    toast.classList.remove('active');
  }, 4200);
}

function openResourcePreview(fileId, name, mimeType) {
  const modal = document.getElementById('resource-preview-modal');
  const title = document.getElementById('resource-preview-title');
  const body = document.getElementById('resource-preview-body');
  if (!modal || !title || !body) return;

  title.textContent = name || 'preview';
  const src = `/api/resources/preview/${encodeURIComponent(fileId)}`;
  if (String(mimeType || '').startsWith('image/')) {
    body.innerHTML = `<img src="${src}" alt="${escapeResourceText(name || 'resource preview')}">`;
  } else {
    body.innerHTML = `<iframe src="${src}" title="${escapeResourceText(name || 'resource preview')}"></iframe>`;
  }
  modal.classList.add('active');
}

function closeResourcePreview() {
  const modal = document.getElementById('resource-preview-modal');
  const body = document.getElementById('resource-preview-body');
  modal?.classList.remove('active');
  if (body) body.innerHTML = '';
}

window.closeResourcePreview = closeResourcePreview;

// ═══════════════ CAMPUS GALLERY BOARD ═══════════════
const CAMPUS_GALLERY_ITEMS = [
  { title: 'Library Reading Hall', category: 'library', label: 'LIBRARY', tags: 'library reading hall study tables quiet academic', src: 'assets/gallery/campus/library-reading-hall.jpg' },
  { title: 'Admin To Auditorium Road', category: 'auditorium', label: 'AUDITORIUM', tags: 'auditorium admin road campus pathway', src: 'assets/gallery/campus/admin-auditorium-road.jpg' },
  { title: 'Auditorium Event Wide', category: 'auditorium', label: 'AUDITORIUM', tags: 'auditorium event ceremony stage seats nav tarang', src: 'assets/gallery/campus/auditorium-event-wide.jpg' },
  { title: 'Auditorium Stage', category: 'auditorium', label: 'AUDITORIUM', tags: 'auditorium stage nav tarang performance seating', src: 'assets/gallery/campus/auditorium-stage.jpg' },
  { title: 'Forensic AI Drone Lab', category: 'labs', label: 'LABS', tags: 'lab forensic ai drone robotics classroom workstations', src: 'assets/gallery/campus/forensic-ai-drone-lab-front.jpg' },
  { title: 'Robotics Lab Workstations', category: 'labs', label: 'LABS', tags: 'lab robotics drone workstations forensic ai', src: 'assets/gallery/campus/drone-robotics-lab-workstations.jpg' },
  { title: 'Drone Lab Wall', category: 'labs', label: 'LABS', tags: 'lab drone robotics forensic ai wall', src: 'assets/gallery/campus/forensic-ai-lab-displays.jpg' },
  { title: 'Robotics Lab Wide', category: 'labs', label: 'LABS', tags: 'lab robotics drone workstation wide', src: 'assets/gallery/campus/robotics-lab-wide.jpg' },
  { title: 'Robotics 3D Printer Lab', category: 'labs', label: 'LABS', tags: 'lab robotics 3d printer maker workstation', src: 'assets/gallery/campus/robotics-3d-printer-lab.jpg' },
  { title: 'Arduino Workbench Lab', category: 'labs', label: 'LABS', tags: 'lab arduino electronics coding workstation', src: 'assets/gallery/campus/arduino-workbench-lab.jpg' },
  { title: 'Microscope Lab Closeup', category: 'labs', label: 'LABS', tags: 'lab microscope forensic science equipment', src: 'assets/gallery/campus/microscope-lab-closeup.jpg' },
  { title: 'Drone Display Section', category: 'labs', label: 'LABS', tags: 'lab section drone display robot', src: 'assets/gallery/campus/drone-display-section-six.jpg' },
  { title: 'Lab Section Wall', category: 'labs', label: 'LABS', tags: 'lab section wall future prospects forensic', src: 'assets/gallery/campus/lab-section-wall.jpg' },
  { title: 'Future Prospects Wall', category: 'labs', label: 'LABS', tags: 'lab future prospects cyber ai display wall', src: 'assets/gallery/campus/future-prospects-lab-wall.jpg' },
  { title: 'Medical Drill Campus Road', category: 'campus', label: 'CAMPUS', tags: 'campus medical drill road students activity', src: 'assets/gallery/campus/medical-drill-campus-road.jpg' },
  { title: 'Cyber Security Floor Art', category: 'campus', label: 'CAMPUS', tags: 'campus cyber security ai floor art do not cross', src: 'assets/gallery/campus/campus-gallery-upload-0499.jpg' },
  { title: 'Academic Block Entrance', category: 'campus', label: 'ACADEMIC', tags: 'academic block entrance building campus', src: 'assets/gallery/campus/academic-block-entrance.jpg' },
  { title: 'Cafeteria Cultural Event', category: 'campus', label: 'CAFETERIA', tags: 'cafeteria cultural event stage chairs performance campus', src: 'assets/gallery/campus/auditorium-cultural-event.jpg' },
  { title: 'Hostel Block Day', category: 'hostels', label: 'HOSTELS', tags: 'hostel building residence block day', src: 'assets/gallery/campus/hostel-block-day.jpg' },
  { title: 'Hostel Blocks Blue Sky', category: 'hostels', label: 'HOSTELS', tags: 'hostel buildings blue sky road campus view', src: 'assets/gallery/campus/hostel-blocks-blue-sky.jpg' },
  { title: 'Hostel Tower In Sun', category: 'hostels', label: 'HOSTELS', tags: 'hostel building residence tower sun campus', src: 'assets/gallery/campus/hostel-tower-sun.jpg' },
  { title: 'Campus Road Hostels', category: 'hostels', label: 'HOSTELS', tags: 'hostel road campus residence', src: 'assets/gallery/campus/campus-road-hostels.jpg' },
  { title: 'Hostel Field View', category: 'hostels', label: 'HOSTELS', tags: 'hostel field residence campus', src: 'assets/gallery/campus/hostel-field-view.jpg' },
  { title: 'Hostel Balcony Detail', category: 'hostels', label: 'HOSTELS', tags: 'hostel balcony building detail', src: 'assets/gallery/campus/hostel-balcony-detail.jpg' },
  { title: 'Hostel Birds Day', category: 'hostels', label: 'HOSTELS', tags: 'hostel birds building day', src: 'assets/gallery/campus/hostel-birds-day.jpg' },
  { title: 'Hostel Birds Close', category: 'hostels', label: 'HOSTELS', tags: 'hostel birds building close', src: 'assets/gallery/campus/hostel-birds-close.jpg' },
  { title: 'Moon Between Hostels', category: 'hostels', label: 'HOSTELS', tags: 'hostel moon courtyard sky', src: 'assets/gallery/campus/moon-between-hostels.jpg' },
  { title: 'Window Campus View', category: 'hostels', label: 'HOSTELS', tags: 'window hostel campus view', src: 'assets/gallery/campus/window-campus-view.jpg' },
  { title: 'Rainy Window Hostel', category: 'hostels', label: 'HOSTELS', tags: 'rain window hostel campus', src: 'assets/gallery/campus/rainy-window-hostel.jpg' },
  { title: 'Dusk Hostel Block', category: 'hostels', label: 'HOSTELS', tags: 'dusk hostel block night', src: 'assets/gallery/campus/dusk-hostel-block.jpg' },
  { title: 'Rainy Hostel Courtyard Sunset', category: 'hostels', label: 'HOSTELS', tags: 'rainy hostel courtyard sunset campus evening', src: 'assets/gallery/campus/rainy-hostel-courtyard-sunset.jpg' },
  { title: 'Framed Hostel Sunset', category: 'hostels', label: 'HOSTELS', tags: 'hostel sunset campus evening sky framed', src: 'assets/gallery/campus/framed-hostel-sunset.jpg' },
  { title: 'Night Campus Skyline', category: 'campus', label: 'CAMPUS', tags: 'night campus skyline hostel lights', src: 'assets/gallery/campus/night-campus-skyline.jpg' },
  { title: 'Night Admin Road', category: 'campus', label: 'CAMPUS', tags: 'night admin road campus lights', src: 'assets/gallery/campus/night-admin-road.jpg' },
  { title: 'Moon Campus Night', category: 'campus', label: 'CAMPUS', tags: 'moon night campus sky palm', src: 'assets/gallery/campus/moon-campus-night.jpg' },
  { title: 'Sunset Campus Hostels', category: 'campus', label: 'CAMPUS', tags: 'sunset campus hostels sky', src: 'assets/gallery/campus/sunset-campus-hostels.jpg' },
  { title: 'Hostel Sunset Road', category: 'campus', label: 'CAMPUS', tags: 'sunset hostel road campus sky evening', src: 'assets/gallery/campus/hostel-sunset-road.jpg' },
  { title: 'Golden Sunset Admin', category: 'campus', label: 'CAMPUS', tags: 'sunset admin campus golden', src: 'assets/gallery/campus/golden-sunset-admin.jpg' },
  { title: 'Sunset Courtyard', category: 'campus', label: 'CAMPUS', tags: 'sunset courtyard campus', src: 'assets/gallery/campus/sunset-courtyard.jpg' },
  { title: 'Sunset Hostel Sky', category: 'campus', label: 'CAMPUS', tags: 'sunset hostel sky evening', src: 'assets/gallery/campus/sunset-hostel-sky.jpg' },
  { title: 'Red Evening Sky', category: 'campus', label: 'CAMPUS', tags: 'red evening sky sunset campus', src: 'assets/gallery/campus/red-evening-sky.jpg' },
  { title: 'Solar Rooftop Sky', category: 'campus', label: 'CAMPUS', tags: 'solar rooftop sky panels campus', src: 'assets/gallery/campus/solar-rooftop-sky.jpg' },
  { title: 'Stormy Evening Sky', category: 'campus', label: 'CAMPUS', tags: 'storm evening sky campus', src: 'assets/gallery/campus/stormy-evening-sky.jpg' },
  { title: 'Storm Sky Hostel', category: 'campus', label: 'CAMPUS', tags: 'storm sky hostel monsoon clouds', src: 'assets/gallery/campus/storm-sky-hostel.jpg' },
  { title: 'Monsoon Hostel Clouds', category: 'campus', label: 'CAMPUS', tags: 'monsoon clouds hostel campus', src: 'assets/gallery/campus/monsoon-hostel-clouds.jpg' },
  { title: 'Streetlight Clouds', category: 'campus', label: 'CAMPUS', tags: 'streetlight clouds sky campus', src: 'assets/gallery/campus/streetlight-clouds.jpg' },
  { title: 'Quiet Campus Corner', category: 'campus', label: 'CAMPUS', tags: 'quiet campus corner parking building', src: 'assets/gallery/campus/quiet-campus-corner.jpg' },
  { title: 'Campus Boundary Green View', category: 'campus', label: 'CAMPUS', tags: 'campus boundary green field road blue sky', src: 'assets/gallery/campus/campus-boundary-green-view.jpg' },
  { title: 'Synergy Gym Plaque', category: 'campus', label: 'GYM', tags: 'gym synergy fitness campus plaque', src: 'assets/gallery/campus/synergy-gym-plaque.jpg' },
  { title: 'Campus Red Flowers', category: 'nature', label: 'NATURE', tags: 'flowers campus garden red plants', src: 'assets/gallery/campus/campus-red-flowers.jpg' },
  { title: 'Red Campus Flowers', category: 'nature', label: 'NATURE', tags: 'flowers campus red plant', src: 'assets/gallery/campus/red-campus-flowers.jpg' },
  { title: 'Campus Daisy Curb', category: 'nature', label: 'NATURE', tags: 'flowers daisy curb garden campus', src: 'assets/gallery/campus/campus-daisy-curb.jpg' },
  { title: 'Marigold Sunset Campus', category: 'nature', label: 'NATURE', tags: 'marigold flowers sunset campus', src: 'assets/gallery/campus/marigold-sunset-campus.jpg' },
  { title: 'Campus Grass Building', category: 'nature', label: 'NATURE', tags: 'grass building campus garden', src: 'assets/gallery/campus/campus-grass-building.jpg' }
];

let activeCampusFilter = 'all';

function getCampusGalleryMatches() {
  const search = document.getElementById('campus-gallery-search')?.value.trim().toLowerCase() || '';
  return CAMPUS_GALLERY_ITEMS.filter((item) => {
    const categoryMatch = activeCampusFilter === 'all' || item.category === activeCampusFilter;
    const haystack = `${item.title} ${item.label} ${item.category} ${item.tags}`.toLowerCase();
    return categoryMatch && (!search || haystack.includes(search));
  });
}

function renderCampusGallery() {
  const grid = document.getElementById('campus-gallery-grid');
  if (!grid) return;

  const count = document.getElementById('campus-gallery-count');
  const empty = document.getElementById('campus-gallery-empty');
  const matches = getCampusGalleryMatches();
  grid.innerHTML = '';

  matches.forEach((item) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'campus-gallery-card';
    card.innerHTML = `
      <span class="campus-gallery-image-wrap">
        <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.title)}" loading="lazy" />
      </span>
      <span class="campus-gallery-copy">
        <span class="campus-gallery-chip">${escapeHtml(item.label)}</span>
        <strong>${escapeHtml(item.title)}</strong>
      </span>
    `;
    card.addEventListener('click', () => openLightbox(item.src, `${item.title} · ${item.label}`));
    grid.appendChild(card);
  });

  if (count) count.textContent = `${matches.length} PHOTO${matches.length === 1 ? '' : 'S'}`;
  if (empty) empty.hidden = matches.length > 0;

  document.querySelectorAll('.campus-filter-btn').forEach((btn) => {
    btn.classList.toggle('active', (btn.dataset.campusFilter || 'all') === activeCampusFilter);
  });
}

function setCampusGalleryFilter(filter) {
  activeCampusFilter = filter || 'all';
  renderCampusGallery();
}

function switchGalleryView(view = 'college') {
  if (view === 'students') {
    openHologramFullscreen();
    return;
  }
  renderCampusGallery();
}

window.setCampusGalleryFilter = setCampusGalleryFilter;
window.switchGalleryView = switchGalleryView;
window.renderCampusGallery = renderCampusGallery;

// ═══════════════ THREE.JS SOLID WHITE 3D SPIRAL GALLERY ═══════════════
let holoInitialized = false;
let holoScene, holoCamera, holoRenderer;
let holoGeoGroup; // Group containing the spiral cards
let holoClock;
let holoDragging = false;
let holoDownPos = null;
let holoPrevX = 0, holoPrevY = 0;
let holoAnimId = null;
let holoNodeSprites = []; // clickable photo card meshes

// Navigation interpolation targets
let helixRotationTargetY = 0;
let helixPositionTargetY = 0;
let helixZoomTargetZ = 8.5;

// Hover state
let hoveredCard = null;

// Spiral parameters
const RADIUS = 4.2;
const angularSpacing = 0.35; // ~20 degrees per card
const verticalSpacing = 0.22; // Height change per card
let minYPos = 0;
let maxYPos = 0;

// Canvas-based solid dossier/card generator (White Polaroids)
function createStudentCardTexture(name, branch, imageSrc) {
  const width = 256;
  const height = 384;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);

  function drawCard(imgObj) {
    // 1. Solid white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // 2. Sleek card border
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, width - 4, height - 4);
    
    // Subtle inner coordinate line
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // 3. Text container background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(8, height - 100, width - 16, 92);
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(8, height - 100, width - 16, 92);

    // 4. Text (Student Name & Branch)
    ctx.fillStyle = '#1a1a2e'; // Sleek dark name
    ctx.font = 'bold 12px "Courier New", monospace';
    ctx.textAlign = 'center';
    
    const displayName = name.toUpperCase();
    ctx.fillText(displayName.substring(0, 24), width / 2, height - 70);
    if (displayName.length > 24) {
      ctx.fillText(displayName.substring(24, 48), width / 2, height - 55);
    }

    ctx.fillStyle = '#ff7700'; // Clean orange accent for branch
    ctx.font = '10px "Courier New", monospace';
    ctx.fillText(branch.toUpperCase(), width / 2, height - 20);

    // 5. Image/Placeholder
    if (imgObj) {
      ctx.drawImage(imgObj, 12, 12, width - 24, height - 120);
      ctx.strokeStyle = '#cccccc';
      ctx.lineWidth = 2;
      ctx.strokeRect(12, 12, width - 24, height - 120);
    } else {
      // Draw minimal technical placeholder
      ctx.save();
      ctx.translate(width / 2, (height - 100) / 2);
      
      ctx.strokeStyle = '#cdd6dd';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 48, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-58, 0); ctx.lineTo(58, 0);
      ctx.moveTo(0, -58); ctx.lineTo(0, 58);
      ctx.stroke();

      ctx.strokeStyle = '#f1f5f9';
      ctx.beginPath();
      ctx.arc(0, 0, 28, 0, Math.PI * 2);
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 9px "Courier New", monospace';
      ctx.fillText("NO PHOTO", 0, 4);

      ctx.restore();
    }
    
    texture.needsUpdate = true;
  }

  // Draw initial placeholder
  drawCard(null);

  // Load image asynchronously
  if (imageSrc) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      drawCard(img);
    };
    img.src = imageSrc;
  }

  return texture;
}

function generateDetailPlaceholderImage(name, branch) {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 600, 600);
  
  ctx.strokeStyle = '#1a1a2e';
  ctx.lineWidth = 6;
  ctx.strokeRect(10, 10, 580, 580);
  
  ctx.strokeStyle = '#f1f3f5';
  ctx.lineWidth = 1;
  for (let i = 40; i < 600; i += 40) {
    ctx.beginPath();
    ctx.moveTo(i, 10); ctx.lineTo(i, 590);
    ctx.moveTo(10, i); ctx.lineTo(590, i);
    ctx.stroke();
  }
  
  ctx.save();
  ctx.translate(300, 260);
  ctx.strokeStyle = '#ff7700';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 90, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.strokeStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.arc(0, 0, 70, 0, Math.PI * 2);
  ctx.arc(0, 0, 50, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px monospace';
  ctx.fillText("STUDENT DOSSIER PROFILE RECORD", -90, -110);
  ctx.restore();
  
  ctx.fillStyle = '#1a1a2e';
  ctx.font = 'bold 24px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(name.toUpperCase(), 300, 430);
  
  ctx.fillStyle = '#ff7700';
  ctx.font = '16px "Courier New", monospace';
  ctx.fillText("BRANCH: " + branch.toUpperCase(), 300, 470);
  
  ctx.fillStyle = '#475569';
  ctx.font = '12px "Courier New", monospace';
  ctx.fillText("STATUS: ACTIVE RECORD // CLASS OF 2026", 300, 510);
  
  return canvas.toDataURL();
}

function openHologramFullscreen() {
  const el = document.getElementById('holo-fullscreen');
  if (!el) return;
  el.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (!holoInitialized) {
    initHologramEngine();
  }
}
window.openHologramFullscreen = openHologramFullscreen;

function closeHologramFullscreen() {
  const el = document.getElementById('holo-fullscreen');
  if (el) el.classList.remove('active');
  document.body.style.overflow = '';
}
window.closeHologramFullscreen = closeHologramFullscreen;

function initHologramEngine() {
  const container = document.getElementById('holo-fullscreen');
  if (!container || typeof THREE === 'undefined') return;

  holoInitialized = true;
  holoClock = new THREE.Clock();

  const W = window.innerWidth, H = window.innerHeight;

  // 1. Scene & Camera
  holoScene = new THREE.Scene();
  holoScene.background = new THREE.Color(0xf8f9fa); // Clean off-white background
  
  holoCamera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
  holoCamera.position.set(0, 0, helixZoomTargetZ);

  // Add realistic 3D lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  holoScene.add(ambientLight);

  const cameraLight = new THREE.PointLight(0xffffff, 0.85, 30);
  holoCamera.add(cameraLight);
  holoScene.add(holoCamera);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.45);
  dirLight.position.set(5, 12, 8);
  holoScene.add(dirLight);

  // 2. Renderer
  holoRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  holoRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  holoRenderer.setSize(W, H);
  holoRenderer.setClearColor(0xf8f9fa, 1);
  container.insertBefore(holoRenderer.domElement, container.firstChild);

  // 3. Central helix core group
  holoGeoGroup = new THREE.Group();
  holoScene.add(holoGeoGroup);

  buildSpiralGallery();

  // 4. Interaction Event Handlers
  setupHoloInteraction();

  // 5. Window Resize
  window.addEventListener('resize', () => {
    if (!holoRenderer) return;
    const w = window.innerWidth, h = window.innerHeight;
    holoCamera.aspect = w / h;
    holoCamera.updateProjectionMatrix();
    holoRenderer.setSize(w, h);
  });

  updateHoloHud('UPSIFS ARCHIVES · ONLINE', 'Drag to rotate & scroll · Click a profile to view details');

  // 6. Helix Loop
  function holoLoop() {
    holoAnimId = requestAnimationFrame(holoLoop);
    const t = holoClock.getElapsedTime();

    // Auto-rotate target when not dragging
    if (!holoDragging) {
      helixRotationTargetY += 0.0012;
    }

    // Smoothly interpolate rotation, position, and camera zoom
    holoGeoGroup.rotation.y += (helixRotationTargetY - holoGeoGroup.rotation.y) * 0.1;
    holoGeoGroup.position.y += (helixPositionTargetY - holoGeoGroup.position.y) * 0.1;
    holoCamera.position.z += (helixZoomTargetZ - holoCamera.position.z) * 0.1;

    holoRenderer.render(holoScene, holoCamera);
  }
  holoLoop();
}

function buildSpiralGallery() {
  // Clear old objects
  while (holoGeoGroup.children.length > 0) {
    const child = holoGeoGroup.children[0];
    holoGeoGroup.remove(child);
  }
  holoNodeSprites = [];

  let items = getGalleryItems();
  const N = Math.max(130, items.length);
  
  // Dynamic ranges for scrolling
  maxYPos = (N / 2) * verticalSpacing;
  minYPos = -maxYPos;

  // Prepare items list matching student names
  const branches = [
    'B.SC CYBER SECURITY', 'M.SC FORENSICS', 'DIGITAL EVIDENCE',
    'CYBER CRIME INV', 'DNA FORENSICS', 'FORENSIC TOXICOLOGY'
  ];

  const defaultItems = studentNames.map((nameText, idx) => {
    let name = nameText;
    let branch = branches[idx % branches.length];
    
    if (nameText.startsWith("STUDENT:")) {
      name = nameText.replace("STUDENT:", "").trim();
    } else if (nameText.startsWith("STUDENT ")) {
      const colonIdx = nameText.indexOf(":");
      if (colonIdx !== -1) {
        name = nameText.substring(colonIdx + 1).trim();
      }
    }
    
    const parenStart = name.indexOf("(");
    if (parenStart !== -1) {
      branch = name.substring(parenStart + 1, name.indexOf(")")).trim();
      name = name.substring(0, parenStart).trim();
    }
    
    // Curated standard forensic pictures for the first 24 default cards
    let imageSrc = null;
    let fullUrl = null;
    const unsplashIds = [
      'photo-1526374965328-7f61d4dc18c5', 'photo-1550751827-4bd374c3f58b',
      'photo-1451187580459-43490279c0fa', 'photo-1563986768609-322da13575f3',
      'photo-1601597111158-2fceff270190', 'photo-1510511459019-5dda7724fd87',
      'photo-1504639725590-34d0984388bd', 'photo-1525547719571-a2d4ac8945e2',
      'photo-1515879218367-8466d910aaa4', 'photo-1517694712202-14dd9538aa97',
      'photo-1558494949-ef010cbdcc31', 'photo-1508873535684-277a3cbcc4e8',
      'photo-1618005182384-a83a8bd57fbe', 'photo-1582719508461-905c673771fd',
      'photo-1576086213369-97a306d36557', 'photo-1507668077129-56e32842fceb',
      'photo-1581092921461-eab62e97a780', 'photo-1518770660439-4636190af475',
      'photo-1584036561566-baf241830990', 'photo-1532187863486-abf9d39d66e8',
      'photo-1579546929518-9e396f3cc809', 'photo-1509198397868-475647b2a1e5',
      'photo-1488590528505-98d2b5aba04b', 'photo-1516321318423-f06f85e504b3'
    ];
    
    if (idx < unsplashIds.length) {
      imageSrc = `https://images.unsplash.com/${unsplashIds[idx]}?auto=format&fit=crop&w=400&h=600&q=80`;
      fullUrl = `https://images.unsplash.com/${unsplashIds[idx]}?auto=format&fit=crop&w=800&h=1200&q=80`;
    }
    
    return {
      src: imageSrc,
      fullUrl: fullUrl || imageSrc,
      name: name,
      caption: branch
    };
  });

  const allItems = [...items, ...defaultItems.slice(items.length)];

  // Render cards in helical arrangement
  const cardWidth = 1.0;
  const cardHeight = 1.5;
  const cardGeo = new THREE.PlaneGeometry(cardWidth, cardHeight);
  
  allItems.forEach((item, i) => {
    const angle = i * angularSpacing;
    const x = RADIUS * Math.cos(angle);
    const z = RADIUS * Math.sin(angle);
    const y = (i - N / 2) * verticalSpacing;

    const tex = createStudentCardTexture(item.name, item.caption || '', item.src);
    // Solid opaque material responding to lights
    const mat = new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.35,
      metalness: 0.1,
      side: THREE.FrontSide
    });
    
    const cardMesh = new THREE.Mesh(cardGeo, mat);
    cardMesh.position.set(x, y, z);
    
    // Make cards look radially outward from the core Y axis
    cardMesh.lookAt(0, y, 0);
    cardMesh.rotation.y += Math.PI; // flip to face outwards
    
    // Add border line to card
    const borderGeo = new THREE.EdgesGeometry(cardGeo);
    const borderMat = new THREE.LineBasicMaterial({
      color: 0xcccccc,
      transparent: false,
      opacity: 1.0
    });
    const border = new THREE.LineSegments(borderGeo, borderMat);
    cardMesh.add(border);

    // Save initial coordinates and scale factors
    cardMesh.userData = {
      type: 'photo',
      index: i,
      fullUrl: item.fullUrl,
      name: item.name,
      caption: item.caption || '',
      baseScale: new THREE.Vector3(1, 1, 1),
      borderLine: border
    };
    
    holoGeoGroup.add(cardMesh);
    holoNodeSprites.push(cardMesh);

    // Dynamic fly-in/growth presentation animation
    cardMesh.scale.set(0, 0, 0);
    gsap.to(cardMesh.scale, {
      x: 1, y: 1, z: 1,
      duration: 0.8,
      delay: Math.min(i * 0.015, 2.5),
      ease: "back.out(1.4)"
    });
  });
}

function updateHoloHud(title, sub) {
  const hud = document.getElementById('holo-hud');
  if (hud) {
    hud.innerHTML = `${title}<div class="holo-hud-sub">${sub}</div>`;
  }
}

// ── Drag & Scroll Navigation Setup ──
function setupHoloInteraction() {
  const canvas = holoRenderer.domElement;
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  let isPointerDown = false;
  let pointerStart = { x: 0, y: 0 };
  let startRotationY = 0;
  let startPositionY = 0;

  function setMouse(clientX, clientY) {
    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(clientY / window.innerHeight) * 2 + 1;
  }

  canvas.addEventListener('pointerdown', (e) => {
    isPointerDown = true;
    pointerStart.x = e.clientX;
    pointerStart.y = e.clientY;
    startRotationY = helixRotationTargetY;
    startPositionY = helixPositionTargetY;
    holoDragging = false;
  });

  canvas.addEventListener('pointermove', (e) => {
    setMouse(e.clientX, e.clientY);
    
    if (!isPointerDown) {
      // Raycasting for card hovers
      raycaster.setFromCamera(mouse, holoCamera);
      const hits = raycaster.intersectObjects(holoNodeSprites);
      
      if (hits.length > 0) {
        const hitCard = hits[0].object;
        canvas.style.cursor = 'pointer';
        
        if (hoveredCard !== hitCard) {
          if (hoveredCard) {
            // Restore previously hovered card
            gsap.to(hoveredCard.scale, { x: 1, y: 1, z: 1, duration: 0.2 });
            if (hoveredCard.userData.borderLine) {
              hoveredCard.userData.borderLine.material.color.setHex(0xcccccc);
            }
          }
          hoveredCard = hitCard;
          
          // Animate hovered card scaling up & glowing brighter
          gsap.to(hitCard.scale, { x: 1.12, y: 1.12, z: 1.12, duration: 0.25, ease: "power2.out" });
          if (hitCard.userData.borderLine) {
            hitCard.userData.borderLine.material.color.setHex(0x1a1a2e); // Sleek dark border on hover
          }
        }
      } else {
        canvas.style.cursor = holoDragging ? 'grabbing' : 'grab';
        if (hoveredCard) {
          gsap.to(hoveredCard.scale, { x: 1, y: 1, z: 1, duration: 0.2 });
          if (hoveredCard.userData.borderLine) {
            hoveredCard.userData.borderLine.material.color.setHex(0xcccccc);
          }
          hoveredCard = null;
        }
      }
      return;
    }
    
    const dx = e.clientX - pointerStart.x;
    const dy = e.clientY - pointerStart.y;
    
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      holoDragging = true;
    }
    
    if (holoDragging) {
      canvas.style.cursor = 'grabbing';
      // X drag rotates helix
      helixRotationTargetY = startRotationY + dx * 0.0055;
      // Y drag translates/scrolls spiral vertically
      helixPositionTargetY = startPositionY + dy * 0.015;
      helixPositionTargetY = Math.max(minYPos, Math.min(maxYPos, helixPositionTargetY));
    }
  });

  canvas.addEventListener('pointerup', (e) => {
    if (isPointerDown && !holoDragging) {
      // Direct click select card raycast
      setMouse(e.clientX, e.clientY);
      raycaster.setFromCamera(mouse, holoCamera);
      const hits = raycaster.intersectObjects(holoNodeSprites);
      
      if (hits.length > 0) {
        const hitCard = hits[0].object;
        
        // Auto center the card Y coordinate on the screen
        helixPositionTargetY = -hitCard.position.y;
        
        // Animate clicked card flash / scale pop
        gsap.to(hitCard.scale, {
          x: 1.2, y: 1.2, z: 1.2,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            openHoloPhotoView(hitCard.userData);
          }
        });
      }
    }
    isPointerDown = false;
    holoDragging = false;
  });

  // Track scroll zoom or horizontal navigation
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.ctrlKey) {
      helixZoomTargetZ = THREE.MathUtils.clamp(helixZoomTargetZ + e.deltaY * 0.008, 4.5, 14);
    } else {
      helixPositionTargetY += e.deltaY * 0.006;
      helixPositionTargetY = Math.max(minYPos, Math.min(maxYPos, helixPositionTargetY));
    }
  }, { passive: false });
}

// ── Photo Viewer lightbox overlay ──
function openHoloPhotoView(data) {
  const view = document.getElementById('holo-photo-view');
  const img = document.getElementById('holo-photo-img');
  const cap = document.getElementById('holo-photo-cap');
  if (!view || !img) return;

  if (data.fullUrl) {
    img.src = data.fullUrl;
  } else {
    // Generate detailed file dossier profile image
    img.src = generateDetailPlaceholderImage(data.name, data.caption);
  }
  
  if (cap) {
    cap.textContent = `${data.name.toUpperCase()} — ${data.caption.toUpperCase()}`;
  }
  view.classList.add('show');
}

function closeHoloLightbox() {
  document.getElementById('holo-photo-view')?.classList.remove('show');
}

// ═══════════════ UPLOAD MODAL ═══════════════
let selectedFile = null;

function openUploadModal() {
  document.getElementById('upload-modal').classList.add('active');
  document.getElementById('student-name').value = '';
  document.getElementById('photo-caption').value = '';
  document.getElementById('upload-preview').classList.remove('visible');
  document.getElementById('upload-placeholder').style.display = '';
  selectedFile = null;
  setTimeout(() => {
    document.getElementById('student-name').focus();
  }, 200);
}
window.openUploadModal = openUploadModal;

function closeUploadModal() {
  document.getElementById('upload-modal').classList.remove('active');
  selectedFile = null;
}
window.closeUploadModal = closeUploadModal;

const uploadZone = document.getElementById('upload-zone');
const photoInput = document.getElementById('photo-input');

if (uploadZone && photoInput) {
  uploadZone.addEventListener('click', () => {
    photoInput.click();
  });

  photoInput.addEventListener('change', (e) => {
    handleFile(e.target.files[0]);
  });

  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.target.files[0] || e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  });
}

function handleFile(file) {
  if (!file || !file.type.startsWith('image/')) return;
  if (file.size > 5 * 1024 * 1024) {
    alert('File max 5MB.');
    return;
  }

  selectedFile = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    const preview = document.getElementById('upload-preview');
    preview.src = e.target.result;
    preview.classList.add('visible');
    document.getElementById('upload-placeholder').style.display = 'none';
  };
  reader.readAsDataURL(selectedFile);
}

function submitPhoto() {
  const name = document.getElementById('student-name').value.trim();
  const caption = document.getElementById('photo-caption').value.trim();

  if (!selectedFile) {
    alert('Please select a photo file.');
    return;
  }

  if (!name) {
    alert('Please enter student name.');
    document.getElementById('student-name').focus();
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const items = getGalleryItems();
    items.unshift({
      src: e.target.result,
      name: name,
      caption: caption,
      date: new Date().toISOString()
    });
    saveGalleryItems(items);
    closeUploadModal();
    
    // Rebuild spiral helix with new photo prepended
    if (holoInitialized && holoGeoGroup) {
      buildSpiralGallery();
    }
  };
  reader.readAsDataURL(selectedFile);
}
window.submitPhoto = submitPhoto;

// Close modal on click outside
document.getElementById('upload-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'upload-modal') {
    closeUploadModal();
  }
});

// ═══════════════ LIGHTBOX (ORIGINAL) ═══════════════
function openLightbox(src, caption) {
  const overlay = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-caption').textContent = caption;
  overlay.classList.add('active');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}
window.closeLightbox = closeLightbox;

document.getElementById('lightbox')?.addEventListener('click', (e) => {
  if (e.target.id === 'lightbox' || e.target.classList.contains('lightbox-close')) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeHoloLightbox();
    closeHologramFullscreen();
    closeLightbox();
    closeResourcePreview();
    closeUploadModal();
    closeSidebar();
  }
});

// ═══════════════ INITIALIZATION ═══════════════
window.addEventListener('DOMContentLoaded', () => {
  setupSidebarToggle();
  window.history.replaceState({ tab: 'home' }, '', window.location.pathname);
  applyArcadeTheme(localStorage.getItem(ARCADE_THEME_KEY) || 'app');

  localStorage.removeItem('upsifs_senior_profile_submissions');
  if (getSeniorAccessCode()) {
    loadApprovedSeniorProfiles();
  } else {
    setSeniorAreaLocked(true);
  }
  document.getElementById('senior-profile-form')?.addEventListener('submit', submitSeniorProfile);
  document.getElementById('senior-lock-form')?.addEventListener('submit', unlockSeniorBoard);
  document.getElementById('senior-search')?.addEventListener('input', updateSeniorFilters);
  document.getElementById('junior-feedback-form')?.addEventListener('submit', submitJuniorFeedback);
  document.getElementById('resource-preview-modal')?.addEventListener('click', (event) => {
    if (event.target.id === 'resource-preview-modal') closeResourcePreview();
  });
  renderJuniorFeedbackNotes();
  document.getElementById('resource-search')?.addEventListener('input', (event) => {
    resourceState.query = event.target.value || '';
    renderResources();
  });
  renderCampusGallery();
  document.getElementById('campus-gallery-search')?.addEventListener('input', renderCampusGallery);
  document.querySelectorAll('.campus-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => setCampusGalleryFilter(btn.dataset.campusFilter || 'all'));
  });
  loadResourceFeed();
  updateSeniorFilters();
});

console.log(`
 🍄 FULL-VIEWPORT SCALED 90s NES SUPER MARIO GAME ENGINE WITH DRIFTING CLOUDS ACTIVE!
 🔵 SOLID 3D SPIRAL HELICAL GALLERY ENGINE LOADED!
`);
