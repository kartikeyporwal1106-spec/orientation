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

let currentStudentIndex = 0;

// Game HUD Stats — managed by game.js, these are legacy hooks
let score = 0;
let coins = 0;

function revealStudentName(nameText) {
  const bannerText = document.getElementById('revealed-student-text');
  const banner = document.getElementById('student-reveal-banner');
  if (bannerText) {
    bannerText.textContent = nameText;
  }
  if (banner && typeof gsap !== 'undefined') {
    gsap.fromTo(banner, 
      { scale: 0.9, opacity: 0.7, borderColor: "#ffffff" }, 
      { scale: 1.05, opacity: 1, borderColor: "#ffb800", duration: 0.3, yoyo: true, repeat: 1, ease: "back.out(2)" }
    );
  }
}

// ═══════════════ (GAME ENGINE IS IN game.js) ═══════════════

let activeSeniorYear = '2';
let activeSeniorQuickFilter = '';
const SENIOR_SUBMISSIONS_KEY = 'upsifs_senior_profile_submissions';
const SENIOR_ACCESS_KEY = 'upsifs_senior_access_code';
const SENIOR_FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzd55ExHTpaKooyEFivmZEQ38sAMfAahtCviZgUK4HYV-01-Nn8CS08P1omWKx3CdaPoQ/exec';

// ═══════════════ TAB SWITCHING ═══════════════
function switchTab(tabName) {
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
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (tabName === 'seniors') {
      updateSeniorFilters();
    }
  }
}

window.switchTab = switchTab;

function switchSeniorYear(year) {
  activeSeniorYear = year;
  document.querySelectorAll('.senior-year-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.year === year);
  });

  updateSeniorFilters();
}

window.switchSeniorYear = switchSeniorYear;

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

function getLocalSeniorSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(SENIOR_SUBMISSIONS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveLocalSeniorSubmissions(items) {
  localStorage.setItem(SENIOR_SUBMISSIONS_KEY, JSON.stringify(items));
}

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

function renderLocalSeniorSubmissions() {
  if (!getSeniorAccessCode()) return;
  const grid = document.querySelector('.seniors-grid');
  if (!grid) return;

  document.querySelectorAll('[data-source="local"]').forEach(card => card.remove());
  const items = getLocalSeniorSubmissions();
  const firstYearThree = grid.querySelector('[data-senior-year="3"]');
  items.forEach(item => {
    grid.insertBefore(createSubmittedSeniorCard({ ...item, source: 'local' }), firstYearThree);
  });
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
  const board = /law|llb/i.test(course) ? 'law2' : /^(3|b\.?tech\s*y?3|year\s*3)$/i.test(course) ? '3' : '2';
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

    const firstYearThree = grid.querySelector('[data-senior-year="3"]');
    profiles.forEach(profile => {
      grid.insertBefore(createSubmittedSeniorCard(profile), firstYearThree);
    });

    updateSeniorFilters();
  } catch (error) {
    saveSeniorAccessCode('');
    setSeniorAreaLocked(true, 'Wrong code or senior board endpoint is not ready.');
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
  renderLocalSeniorSubmissions();
  updateSeniorFilters();
  if (input) input.value = '';
}

window.unlockSeniorBoard = unlockSeniorBoard;

async function submitSeniorProfile(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.getElementById('senior-form-status');
  const profile = Object.fromEntries(new FormData(form).entries());
  profile.updatedAt = new Date().toISOString();

  const items = getLocalSeniorSubmissions();
  const key = seniorIdentityKey(profile);
  const existingIndex = items.findIndex(item => seniorIdentityKey(item) === key);
  if (existingIndex >= 0) {
    items[existingIndex] = profile;
  } else {
    items.unshift(profile);
  }
  saveLocalSeniorSubmissions(items);
  renderLocalSeniorSubmissions();
  updateSeniorFilters();

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
      if (status) status.textContent = 'Saved locally. Network submission can be retried later.';
    }
  } else if (status) {
    status.textContent = 'Saved as a local draft on this device. To publish for everyone, connect the Google Sheet endpoint.';
  }

  form.reset();
}

function clearLocalSeniorSubmissions() {
  saveLocalSeniorSubmissions([]);
  renderLocalSeniorSubmissions();
  updateSeniorFilters();
  const status = document.getElementById('senior-form-status');
  if (status) status.textContent = 'Local profile previews cleared.';
}

window.clearLocalSeniorSubmissions = clearLocalSeniorSubmissions;

function normalizeSearchText(value) {
  return (value || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function updateSeniorFilters() {
  if (!getSeniorAccessCode()) {
    const count = document.getElementById('senior-count');
    if (count) count.textContent = 'LOCKED';
    return;
  }

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

function toggleGameDock() {
  const collapsed = document.body.classList.toggle('game-collapsed');
  const btn = document.getElementById('game-toggle-btn');
  if (btn) {
    btn.textContent = collapsed ? 'GAME ▲' : 'GAME ▼';
    btn.setAttribute('aria-expanded', String(!collapsed));
  }
}

window.toggleGameDock = toggleGameDock;

function closeSidebar() {
  const toggle = document.getElementById('sidebar-toggle');
  if (toggle) toggle.checked = false;
}
window.closeSidebar = closeSidebar;

function openGalleryTab() {
  switchTab('gallery');
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
    closeUploadModal();
    closeSidebar();
  }
});

// ═══════════════ INITIALIZATION ═══════════════
window.addEventListener('DOMContentLoaded', () => {
  if (typeof window.initMarioGame === 'function') {
    window.initMarioGame();
  }

  renderLocalSeniorSubmissions();
  if (getSeniorAccessCode()) {
    loadApprovedSeniorProfiles();
  } else {
    setSeniorAreaLocked(true);
  }
  document.getElementById('senior-profile-form')?.addEventListener('submit', submitSeniorProfile);
  document.getElementById('senior-lock-form')?.addEventListener('submit', unlockSeniorBoard);
  document.getElementById('senior-search')?.addEventListener('input', updateSeniorFilters);
  updateSeniorFilters();
});

console.log(`
 🍄 FULL-VIEWPORT SCALED 90s NES SUPER MARIO GAME ENGINE WITH DRIFTING CLOUDS ACTIVE!
 🔵 SOLID 3D SPIRAL HELICAL GALLERY ENGINE LOADED!
`);
