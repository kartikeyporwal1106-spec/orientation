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

let activeSeniorYear = 'btech-mtech-y1';
let activeSeniorDisplayBoard = 'B.Tech-M.Tech Sem I';
let activeSeniorQuickFilter = '';
const SENIOR_ACCESS_KEY = 'upsifs_senior_access_code';
const JUNIOR_ACCESS_KEY = 'upsifs_junior_access_code';
const WIFI_ACCESS_KEY = 'upsifs_wifi_access_granted';
const SENIOR_FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzd55ExHTpaKooyEFivmZEQ38sAMfAahtCviZgUK4HYV-01-Nn8CS08P1omWKx3CdaPoQ/exec';
const RESOURCE_FEED_ENDPOINT = '/api/resources/list';
const ARCADE_THEME_KEY = 'upsifs_arcade_theme';
const JUNIOR_FEEDBACK_KEY = 'upsifs_junior_feedback_notes';
const JUNIOR_PROFILES = [
  {
    name: 'Aryan Tiwari',
    course: 'B.Tech-M.Tech Sem I',
    accessCode: '492008',
    place: 'Kanpur',
    interests: 'Cricket, politics',
    topics: 'Important skills',
    tagline: '.',
    feedback: 'Photos of playground and courts',
    whatsapp: '8869935689',
    instagram: 't.aryan4'
  },
  {
    name: 'Dhruv Saxena',
    course: 'B.Tech-M.Tech Sem I',
    accessCode: 'Dhruv07',
    place: 'Prayagraj',
    interests: 'Quantum computing, research, drone & robotics technology',
    topics: 'How to join the drone and robotics lab',
    tagline: 'Playing football and coder',
    feedback: 'Everything is best',
    whatsapp: '6386246598',
    instagram: 'No',
    photo: 'assets/juniors/dhruv-saxena.png'
  },
  {
    name: 'Sanskar Yadav',
    course: 'B.Tech-M.Tech Sem I',
    accessCode: '241280',
    place: 'Lalitpur, UP',
    interests: 'Video editing, graphic designing, robotics, travelling, badminton',
    topics: 'Startup, innovation, creativity',
    tagline: 'I think I’m quite stubborn with problems',
    feedback: 'Just Include my profile. Website is damn good btw...',
    whatsapp: '9935675543',
    instagram: "I don't use Currently.",
    photo: 'assets/juniors/sanskar-yadav.png'
  }
].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

const DEFAULT_JUNIOR_FEEDBACK_NOTES = JUNIOR_PROFILES
  .filter(profile => profile.feedback)
  .map(profile => ({
    name: profile.name,
    message: profile.feedback,
    createdAt: '2026-08-05T00:00:00.000Z'
  }));

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
const validTabNames = new Set(['home', 'about', 'hostel', 'resources', 'seniors', 'gallery', 'devs']);
const SITE_FONT_KEY = 'upsifs_site_font';
const siteFontOptions = new Set(['default', 'outfit', 'inter', 'kalam', 'caveat', 'pixel']);

// ═══════════════ EVENTS WIDGET ═══════════════
// ─── MANUAL EVENTS (add yours here) ────────────────────────────────────────
// Format: { date: 'DD MMM YYYY', dateEnd?: 'DD MMM YYYY', name: '…', tag: '…', hot?: true, soon?: true }
// Use soon: true (no date needed) for events with no confirmed date yet.
const manualEvents = [
  { date: '14 Aug 2026', name: '🔭 Capture The Flag', tag: 'CTF', hot: true },
  { date: '18 Aug 2026', dateEnd: '19 Aug 2026', name: '🎓 National Conference', tag: 'CONF' },
  { date: '19 Aug 2026', name: '🎉 Foundation Day', tag: 'SPECIAL' },
  { soon: true, name: '⚡ SIH 2026 Forms', tag: 'SOON' }
];

// ─── CALENDAR AUTO-EVENTS: only fixed/end-sem events derive from academicCalendarData ──
// Each entry: { dateStr: '06.08.2026', dateEndStr?: '08.08.2026', name: '…', tag: '…' }
// Patterns we pull automatically (no internal exam dates like TA, MSE, Block Exam, Attendance Review)
const CALENDAR_AUTO_EVENT_PATTERNS = [
  { match: /orientation/i,               emoji: '🏫', tag: 'ORIENTATION' },
  { match: /semester commencement/i,     emoji: '🎒', tag: 'SEMESTER'    },
  { match: /diwali/i,                    emoji: '🪔', tag: 'BREAK'       },
  { match: /semester end theory/i,       emoji: '📝', tag: 'THEORY EXAM' },
  { match: /semester end practical/i,    emoji: '🔬', tag: 'PRAC EXAM'   },
  { match: /semester end examination/i,  emoji: '📝', tag: 'END SEM'     },
  { match: /semester break/i,            emoji: '😴', tag: 'BREAK'       },
  { match: /summer.?internship break/i,  emoji: '☀️', tag: 'BREAK'       },
  { match: /commencement of next/i,      emoji: '🎒', tag: 'NEXT SEM'    },
  { match: /sports week/i,               emoji: '🏅', tag: 'SPORTS'      },
  { match: /annual day/i,               emoji: '🎉', tag: 'ANNUAL DAY'   }
];

function parseDDMMYYYY(str) {
  // '06.08.2026' → Date object (midnight IST treated as local)
  if (!str || typeof str !== 'string') return null;
  const parts = str.trim().match(/^(\d{1,2})\.(\d{2})\.(\d{4})$/);
  if (!parts) return null;
  return new Date(Number(parts[3]), Number(parts[2]) - 1, Number(parts[1]));
}

function formatEventDate(d, dEnd) {
  if (!d) return '';
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const day = d.getDate();
  const mon = months[d.getMonth()];
  const yr  = d.getFullYear();
  if (dEnd && (dEnd.getTime() !== d.getTime())) {
    const day2 = dEnd.getDate();
    const mon2 = months[dEnd.getMonth()];
    const yr2  = dEnd.getFullYear();
    if (mon === mon2 && yr === yr2) return `${day}–${day2} ${mon} ${yr}`;
    if (yr === yr2) return `${day} ${mon} – ${day2} ${mon2} ${yr}`;
    return `${day} ${mon} ${yr} – ${day2} ${mon2} ${yr2}`;
  }
  return `${day} ${mon} ${yr}`;
}

function parseManualEventDate(str) {
  // '14 Aug 2026' → Date (same as new Date('14 Aug 2026'))
  if (!str) return null;
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

function eventFallsInMonth(event, monthAnchor) {
  if (!event?._date) return false;
  const monthStart = new Date(monthAnchor.getFullYear(), monthAnchor.getMonth(), 1);
  const monthEnd = new Date(monthAnchor.getFullYear(), monthAnchor.getMonth() + 1, 0);
  monthStart.setHours(0, 0, 0, 0);
  monthEnd.setHours(23, 59, 59, 999);

  const eventStart = new Date(event._date);
  const eventEnd = event._dateEnd ? new Date(event._dateEnd) : eventStart;
  eventStart.setHours(0, 0, 0, 0);
  eventEnd.setHours(23, 59, 59, 999);

  return eventStart <= monthEnd && eventEnd >= monthStart;
}

function buildCalendarAutoEvents() {
  const events = [];
  // Pull from all 3 semesters
  ['odd-1', 'odd-multi', 'even'].forEach(semKey => {
    const cal = academicCalendarData[semKey];
    if (!cal) return;
    cal.rows.forEach(row => {
      const matched = CALENDAR_AUTO_EVENT_PATTERNS.find(p => p.match.test(row.particulars));
      if (!matched) return;

      // Parse the timeline — look for DD.MM.YYYY patterns
      const timeline = row.timeline || '';
      const dateMatches = [...timeline.matchAll(/(\d{1,2}\.\d{2}\.\d{4})/g)];
      if (dateMatches.length === 0) return; // skip 'Coming soon', '30 days after…'

      const startDate = parseDDMMYYYY(dateMatches[0][1]);
      const endDate   = dateMatches.length > 1 ? parseDDMMYYYY(dateMatches[dateMatches.length - 1][1]) : null;
      if (!startDate) return;

      // Deduplicate: skip if same name+date combo already added (e.g. duplicate commencement date)
      const key = `${matched.tag}-${startDate.getTime()}`;
      if (events.find(e => e._key === key)) return;

      events.push({
        _key:   key,
        _date:  startDate,
        _dateEnd: endDate,
        dateLabel: formatEventDate(startDate, endDate),
        name: `${matched.emoji} ${row.particulars.replace(/\*/g, '').trim()}`,
        tag:  matched.tag,
        fromCalendar: true
      });
    });
  });
  return events;
}

function buildAllEvents() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  // Process manual events
  const manual = manualEvents.map(ev => {
    if (ev.soon) {
      return { _date: null, dateLabel: 'Coming Soon', name: ev.name, tag: ev.tag, hot: false, soon: true };
    }
    const d    = parseManualEventDate(ev.date);
    const dEnd = ev.dateEnd ? parseManualEventDate(ev.dateEnd) : null;
    return {
      _date:     d,
      _dateEnd:  dEnd,
      dateLabel: ev.dateLabel || formatEventDate(d, dEnd),
      name:      ev.name,
      tag:       ev.tag,
      hot:       !!ev.hot,
      soon:      false,
      manual:    true
    };
  });

  const currentMonthManual = manual.filter(e => !e.soon && e._date && e._date >= now && eventFallsInMonth(e, now));
  const calendarEvents = buildCalendarAutoEvents()
    .filter(e => e._date && e._date >= now && eventFallsInMonth(e, now));

  // Remove calendar events that clash with a manual event on the same date
  const manualDates = new Set(currentMonthManual.map(e => e._date.getTime()));
  const calendarFiltered = calendarEvents.filter(e => !manualDates.has(e._date.getTime()));

  // Merge manual + calendar events for the current month only.
  const datedManual = currentMonthManual.sort((a, b) => a._date - b._date);
  const datedCal    = calendarFiltered.sort((a, b) => a._date - b._date);

  // Interleave: merge manual + calendar by date
  const merged = [];
  let mi = 0, ci = 0;
  while (mi < datedManual.length || ci < datedCal.length) {
    const m = datedManual[mi];
    const c = datedCal[ci];
    if (!c || (m && m._date <= c._date)) { merged.push(m); mi++; }
    else                                  { merged.push(c); ci++; }
  }

  return merged.slice(0, 10); // cap at 10
}

function renderEventsWidget() {
  const list = document.getElementById('events-list-dynamic');
  if (!list) return;

  const events = buildAllEvents();
  if (!events.length) {
    list.innerHTML = `<li class="events-item events-coming-soon"><span class="event-name" style="grid-column:1/-1">No events this month.</span></li>`;
    return;
  }

  list.innerHTML = events.map(ev => {
    const hotClass  = ev.hot  ? ' event-hot'          : '';
    const soonClass = ev.soon ? ' events-coming-soon'  : '';
    const tagClass  = ev.soon ? ' tag-soon'            : '';
    const calTag    = ev.fromCalendar ? ' tag-cal'     : '';
    return `<li class="events-item${hotClass}${soonClass}">
      <span class="event-date">${escapeHtml(ev.dateLabel)}</span>
      <span class="event-name">${escapeHtml(ev.name)}</span>
      <span class="event-tag${tagClass}${calTag}">${escapeHtml(ev.tag)}</span>
    </li>`;
  }).join('');
}

function toggleEventsWidget() {
  const panel = document.getElementById('events-widget-panel');
  const btn   = document.getElementById('events-widget-toggle');
  const isHidden = panel.hidden;
  panel.hidden = !isHidden;
  btn.setAttribute('aria-expanded', String(isHidden));
}

function setSiteFont(fontName) {
  const nextFont = siteFontOptions.has(fontName) ? fontName : 'default';
  const select = document.getElementById('site-font-select');

  document.body.dataset.siteFont = nextFont;
  if (select) select.value = nextFont;
  localStorage.setItem(SITE_FONT_KEY, nextFont);
}

window.setSiteFont = setSiteFont;

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
    profile: 'connect with batchmates',
    feedback: 'FEEDBACK ↗'
  },
  app: {
    title: 'Welcome Freshers 2026',
    subtitle: 'Resources, gallery, seniors, and community in one student-built hub',
    resources: 'academic resources →',
    gallery: 'college gallery →',
    community: 'Junior Detail Submission',
    seniors: 'connect with seniors →',
    profile: 'connect with batchmates →',
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

// ═══════════════ MASTER SITE SEARCH ═══════════════
function normalizeMasterSearchText(value) {
  return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function textSnippet(text, query) {
  const cleanText = String(text || '').replace(/\s+/g, ' ').trim();
  const cleanQuery = normalizeMasterSearchText(query);
  const index = cleanText.toLowerCase().indexOf(cleanQuery);
  if (index === -1) return cleanText.slice(0, 110);
  return cleanText.slice(Math.max(0, index - 42), index + cleanQuery.length + 72);
}

function getStaticSearchEntries() {
  const tabLabels = {
    about: 'Guide',
    hostel: 'Hostel Life',
    resources: 'Academic Resources',
    seniors: 'Connect Seniors',
    devs: 'Developers'
  };

  return Object.entries(tabLabels).map(([tab, title]) => {
    const section = document.getElementById(`tab-${tab}`);
    return {
      title,
      type: 'Page',
      tab,
      text: `${title} ${section?.textContent || ''}`,
      action: () => switchTab(tab)
    };
  });
}

function getMasterSearchEntries() {
  const resourceEntries = resourceState.items.map(item => ({
    title: item.name || 'Resource',
    type: item.type === 'folder' ? 'Resource Folder' : 'Resource File',
    tab: 'resources',
    text: `${item.name} ${item.type} ${item.mimeType} ${item.extension}`,
    action: () => {
      switchTab('resources');
      const input = document.getElementById('resource-search');
      if (input) {
        input.value = item.name || '';
        resourceState.query = input.value;
      }
      renderResources();
      document.getElementById('resource-groups')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }));

  const seniorEntries = [...document.querySelectorAll('[data-senior-year]')].map(card => ({
    title: card.querySelector('.senior-info h2')?.textContent?.trim() || 'Senior Profile',
    type: 'Senior',
    tab: 'seniors',
    text: card.innerText || '',
    action: () => {
      switchTab('seniors');
      const input = document.getElementById('senior-search');
      const name = card.querySelector('.senior-info h2')?.textContent?.trim() || '';
      if (input) input.value = name;
      updateSeniorFilters();
      document.getElementById('senior-private-area')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }));

  const calendarEntries = [
    {
      title: 'Academic Calendar 2026–2027 (Odd Sem I)',
      type: 'Calendar',
      tab: 'resources',
      text: 'academic calendar odd semester 1 sem 1 orientation teaching phase mid semester end theory exam datesheet schedule 2026 2027',
      action: () => {
        switchTab('resources');
        openAcademicCalendarModal('odd-1');
      }
    },
    {
      title: 'Academic Calendar 2026–2027 (Odd Sem III/V/VII/IX)',
      type: 'Calendar',
      tab: 'resources',
      text: 'academic calendar odd semester 3 5 7 9 remedial examination mid semester end theory practical exam 2026 2027',
      action: () => {
        switchTab('resources');
        openAcademicCalendarModal('odd-multi');
      }
    },
    {
      title: 'Academic Calendar 2026–2027 (Even Semesters)',
      type: 'Calendar',
      tab: 'resources',
      text: 'academic calendar even semester 2 4 6 8 10 summer break internship break dissertation registration datesheet 2026 2027',
      action: () => {
        switchTab('resources');
        openAcademicCalendarModal('even');
      }
    }
  ];

  return [...getStaticSearchEntries(), ...calendarEntries, ...resourceEntries, ...seniorEntries];
}

function scoreMasterSearchEntry(entry, query) {
  const q = normalizeMasterSearchText(query);
  const title = normalizeMasterSearchText(entry.title);
  const type = normalizeMasterSearchText(entry.type);
  const text = normalizeMasterSearchText(entry.text);
  if (!q || !text.includes(q)) return 0;
  let score = 1;
  if (title === q) score += 12;
  if (title.includes(q)) score += 7;
  if (type.includes(q)) score += 3;
  if (entry.tab === q) score += 4;
  return score;
}

function renderMasterSearchResults() {
  const input = document.getElementById('master-search-input');
  const box = document.getElementById('master-search-results');
  if (!input || !box) return;

  const query = input.value.trim();
  if (query.length < 2) {
    box.hidden = true;
    box.innerHTML = '';
    return;
  }

  const results = getMasterSearchEntries()
    .map(entry => ({ entry, score: scoreMasterSearchEntry(entry, query) }))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  if (!results.length) {
    box.hidden = false;
    box.innerHTML = '<p class="master-search-empty">No match found.</p>';
    return;
  }

  box.hidden = false;
  box.innerHTML = '';
  results.forEach(({ entry }) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'master-search-result';
    button.innerHTML = `
      <span class="master-result-type">${escapeHtml(entry.type)}</span>
      <strong>${escapeHtml(entry.title)}</strong>
      <small>${escapeHtml(textSnippet(entry.text, query))}</small>
    `;
    button.addEventListener('click', () => {
      input.value = '';
      box.hidden = true;
      entry.action();
    });
    box.appendChild(button);
  });
}

function setupMasterSearch() {
  const input = document.getElementById('master-search-input');
  const box = document.getElementById('master-search-results');
  if (!input || !box) return;
  input.addEventListener('input', renderMasterSearchResults);
  input.addEventListener('focus', renderMasterSearchResults);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      input.value = '';
      box.hidden = true;
    }
    if (event.key === 'Enter') {
      const first = box.querySelector('.master-search-result');
      first?.click();
    }
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.master-search')) box.hidden = true;
  });
}

function switchSeniorYear(year) {
  activeSeniorYear = year;
  document.querySelectorAll('.senior-year-btn').forEach(btn => {
    const isActive = btn.dataset.year === year;
    btn.classList.toggle('active', isActive);
    if (isActive) activeSeniorDisplayBoard = seniorButtonDisplayBoards(btn).join('|');
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
  const typeLabel = resourceIcon(item);

  card.innerHTML = `
    <div class="resource-file-main">
      <h4>${escapeResourceText(item.name)}</h4>
      <p><span class="resource-type-chip">${escapeResourceText(typeLabel)}</span>${formatBytes(item.size)} · ${formatResourceDate(item.modifiedTime)}</p>
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
  if (/^(no|none|na|n\/a|i don'?t use currently\.?|i don't use)$/i.test(clean)) return '';
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

function normalizeDisplayBoard(value) {
  return normalizeSearchText(value || '')
    .replace(/&/g, 'and')
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function seniorButtonDisplayBoards(button) {
  return (button?.dataset.displayBoards || button?.dataset.displayBoard || '')
    .split('|')
    .map(normalizeDisplayBoard)
    .filter(Boolean);
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
  const displayBoard = profile.displayBoard || profile.boardLabel || profile.course || profile.rawBoard || '';
  article.dataset.seniorYear = getSeniorBoardCode(displayBoard || profile.year || profile.board || '', profile.name);
  if (displayBoard) article.dataset.displayBoard = normalizeDisplayBoard(displayBoard);
  if (profile.source) article.dataset.source = profile.source;
  if (profile.enrollment) article.dataset.enrollment = profile.enrollment;

  const place = (profile.place || 'PENDING').trim().toUpperCase();
  const safeName = escapeHtml(profile.name || 'New Profile');
  const safeTagline = escapeHtml(profile.tagline || 'student profile');
  const safeSkills = escapeHtml(profile.skills || 'Profile update submitted');
  const safeBoard = escapeHtml(profile.displayBoard || profile.boardLabel || profile.course || '');
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
      ${safeBoard ? `<small class="senior-board-line">${safeBoard}</small>` : ''}
    </div>
    <div class="senior-actions">
      ${actions || '<span class="senior-connect senior-disabled">PENDING ↗</span>'}
    </div>
  `;

  return article;
}

function createJuniorProfileCard(profile) {
  const article = document.createElement('article');
  article.className = 'junior-profile-card';

  const safeName = escapeHtml(profile.name);
  const tagline = (profile.tagline || '').trim();
  const displayTagline = tagline && tagline !== '.' ? tagline : 'student profile';
  const photo = (profile.photo || '').trim();
  const instagram = normalizeInstagram(profile.instagram);
  const whatsapp = normalizeWhatsapp(profile.whatsapp);
  const photoHtml = photo
    ? `<img class="junior-profile-photo" src="${escapeHtml(photo)}" alt="${safeName}">`
    : `<div class="junior-profile-photo junior-profile-initials" aria-label="${safeName} photo">${initialsFromName(profile.name)}</div>`;

  const actions = [
    whatsapp ? `<a href="https://wa.me/${whatsapp}" target="_blank" rel="noopener noreferrer" class="senior-connect">whatsapp ↗</a>` : '',
    instagram ? `<a href="${escapeHtml(instagram)}" target="_blank" rel="noopener noreferrer" class="senior-connect senior-instagram">instagram ↗</a>` : ''
  ].filter(Boolean).join('');

  article.innerHTML = `
    ${photoHtml}
    <div class="junior-profile-copy">
      <h3>${safeName}</h3>
      <p class="junior-course">${escapeHtml(profile.course)}</p>
      <p class="junior-tagline">${escapeHtml(displayTagline)}</p>
      <dl>
        <div><dt>place</dt><dd>${escapeHtml(profile.place)}</dd></div>
        <div><dt>interests</dt><dd>${escapeHtml(profile.interests)}</dd></div>
        <div><dt>wants guidance on</dt><dd>${escapeHtml(profile.topics)}</dd></div>
      </dl>
    </div>
    <div class="senior-actions junior-profile-actions">
      ${actions || '<span class="senior-connect senior-disabled">no socials</span>'}
    </div>
  `;

  return article;
}

function renderJuniorProfiles() {
  const grid = document.getElementById('junior-profile-grid');
  if (!grid) return;
  grid.replaceChildren(...JUNIOR_PROFILES.map(createJuniorProfileCard));
}

function normalizeAccessCode(code) {
  return (code || '').trim().toLowerCase();
}

function getJuniorAccessCode() {
  try {
    return sessionStorage.getItem(JUNIOR_ACCESS_KEY) || '';
  } catch {
    return '';
  }
}

function saveJuniorAccessCode(code) {
  try {
    if (code) {
      sessionStorage.setItem(JUNIOR_ACCESS_KEY, code);
    } else {
      sessionStorage.removeItem(JUNIOR_ACCESS_KEY);
    }
  } catch {
    // Ignore private-browsing storage failures.
  }
}

function isValidJuniorAccessCode(code) {
  const normalizedCode = normalizeAccessCode(code);
  if (!normalizedCode) return false;
  return JUNIOR_PROFILES.some(profile => normalizeAccessCode(profile.accessCode) === normalizedCode);
}

function isValidWifiAccessCode(code) {
  const normalizedCode = normalizeAccessCode(code);
  if (!normalizedCode) return false;
  const isEnrollmentNumber = /^\d{6,}$/.test(normalizedCode);
  return isEnrollmentNumber || normalizedCode === 'upsifs2026' || isValidJuniorAccessCode(code);
}

function setWifiAccessUnlocked(isUnlocked, message = '') {
  const grid = document.getElementById('wifi-card-grid');
  const status = document.getElementById('wifi-access-status');
  const form = document.getElementById('wifi-access-form');
  grid?.classList.toggle('locked', !isUnlocked);
  form?.classList.toggle('unlocked', isUnlocked);
  document.querySelectorAll('[data-wifi-password]').forEach(item => {
    item.textContent = isUnlocked ? item.dataset.wifiPassword : '••••••••••';
  });
  if (status) status.textContent = message;
}

function getWifiAccessGranted() {
  try {
    return sessionStorage.getItem(WIFI_ACCESS_KEY) === '1';
  } catch {
    return false;
  }
}

function saveWifiAccessGranted(isGranted) {
  try {
    if (isGranted) {
      sessionStorage.setItem(WIFI_ACCESS_KEY, '1');
    } else {
      sessionStorage.removeItem(WIFI_ACCESS_KEY);
    }
  } catch {
    // Ignore private-browsing storage failures.
  }
}

function unlockWifiPasswords(event) {
  event.preventDefault();
  const input = document.getElementById('wifi-access-code');
  const code = (input?.value || '').trim();
  if (!code) return;
  if (isValidWifiAccessCode(code)) {
    saveWifiAccessGranted(true);
    setWifiAccessUnlocked(true, 'Access granted. Wi-Fi details unlocked.');
    input.value = '';
    return;
  }
  saveWifiAccessGranted(false);
  setWifiAccessUnlocked(false, 'Enrollment number or access code not found.');
}

function setJuniorAreaLocked(isLocked, message = '') {
  document.getElementById('junior-private-area')?.classList.toggle('locked', isLocked);
  document.getElementById('junior-access-lock')?.classList.toggle('unlocked', !isLocked);
  const status = document.getElementById('junior-lock-status');
  if (status) status.textContent = message;
}

function unlockJuniorProfiles(message = 'Access granted. Batchmate board loaded.') {
  renderJuniorProfiles();
  setJuniorAreaLocked(false, message);
}

async function unlockJuniorBoard(event) {
  event.preventDefault();
  const input = document.getElementById('junior-access-code');
  const code = (input?.value || '').trim();
  if (!code) return;

  if (isValidJuniorAccessCode(code)) {
    saveJuniorAccessCode(code);
    unlockJuniorProfiles('Access granted. Batchmate board loaded.');
    return;
  }

  saveSeniorAccessCode(code);
  saveJuniorAccessCode('');
  setJuniorAreaLocked(true, 'Checking senior enrollment...');
  const seniorUnlocked = await loadApprovedSeniorProfiles();

  if (seniorUnlocked) {
    unlockJuniorProfiles('Senior enrollment verified. Batchmate board loaded.');
  } else {
    setJuniorAreaLocked(true, 'Access code or senior enrollment not found.');
  }
}

function openJuniorProfiles() {
  switchTab('seniors');
  window.setTimeout(() => {
    const savedCode = getJuniorAccessCode();
    if (isValidJuniorAccessCode(savedCode) || getSeniorAccessCode()) {
      unlockJuniorProfiles('');
    } else {
      setJuniorAreaLocked(true);
    }
    document.getElementById('junior-profile-board')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

window.unlockJuniorBoard = unlockJuniorBoard;
window.openJuniorProfiles = openJuniorProfiles;

function coalesceProfileValue(profile, ...keys) {
  for (const key of keys) {
    const value = profile[key];
    if (value !== undefined && value !== null && String(value).trim()) {
      return String(value).trim();
    }
  }
  return '';
}

function getSeniorBoardCode(courseStr, nameStr) {
  const course = (courseStr || '').trim();
  const normalizedCourse = normalizeSearchText(course)
    .replace(/&/g, ' and ')
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const normalizedName = normalizeSearchText(nameStr || '');
  const forcedLawNames = ['shashwat pande', 'shashwat pandey', 'pranav sagar', 'pranavsagar'];
  const legacyBoardMap = {
    junior: 'btech-mtech-y1',
    '1': 'btech-mtech-y1',
    '2': 'btech-mtech-y2',
    '3': 'btech-mtech-y3',
    y1: 'btech-mtech-y1',
    y2: 'btech-mtech-y2',
    y3: 'btech-mtech-y3',
    law: 'bsc-llb-y1',
    law2: 'bsc-llb-y2',
    msc: 'bsc-msc-forensic-y1',
    msc2: 'bsc-msc-forensic-y2',
    llm: 'llm'
  };

  if (/^(btech-mtech|bsc-msc-forensic|msc-forensic|bsc-llb)-y[1-4]$/.test(normalizedCourse) || normalizedCourse === 'llm') {
    return normalizedCourse;
  }

  if (legacyBoardMap[normalizedCourse]) {
    return legacyBoardMap[normalizedCourse];
  }

  if (forcedLawNames.some(forcedName => normalizedName.includes(forcedName))) {
    return 'bsc-llb-y2';
  }

  if (/\bllm\b/.test(normalizedCourse)) {
    return 'llm';
  }

  const semMatch = normalizedCourse.match(/\bsem(?:ester)?\s*(?:i{1,3}|iv|v|vi{0,3}|ix|x|\d+)\b/);
  const semText = semMatch ? semMatch[0] : normalizedCourse;
  const semRomanMap = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9, x: 10 };
  const semNumberMatch = semText.match(/\b(\d+)\b/);
  const semRomanMatch = semText.match(/\b(i{1,3}|iv|v|vi{0,3}|ix|x)\b/);
  const semester = semNumberMatch
    ? Number(semNumberMatch[1])
    : semRomanMatch ? semRomanMap[semRomanMatch[1]] : null;
  const yearFromSemester = semester ? Math.ceil(semester / 2) : null;
  const explicitYearMatch = normalizedCourse.match(/\by(?:ear)?\s*(\d+)\b/);
  const year = explicitYearMatch ? Number(explicitYearMatch[1]) : yearFromSemester;

  if (/law|llb|ll b/.test(normalizedCourse)) {
    return `bsc-llb-y${Math.min(Math.max(year || 1, 1), 3)}`;
  }

  if (/b\s*sc.*m\s*sc|bsc.*msc|integrated.*forensic|forensic science integrated/.test(normalizedCourse)) {
    return `bsc-msc-forensic-y${Math.min(Math.max(year || 1, 1), 4)}`;
  }

  if (/\bm\s*sc\b|msc|forensic/.test(normalizedCourse)) {
    return `msc-forensic-y${Math.min(Math.max(year || 1, 1), 2)}`;
  }

  if (/b\s*tech|btech|m\s*tech|mtech/.test(normalizedCourse)) {
    return `btech-mtech-y${Math.min(Math.max(year || 1, 1), 3)}`;
  }

  return 'btech-mtech-y1';
}

function normalizeRemoteSeniorProfile(row) {
  const name = coalesceProfileValue(row, 'displayName', 'name', 'Your Name');
  const course = coalesceProfileValue(row, 'displayBoard', 'board', 'year', 'Your Course And Semester', 'Your Course');
  const board = getSeniorBoardCode(course, name);
  const photo = coalesceProfileValue(row, 'displayPhoto', 'photo', 'Profile Photo', 'Profile Photo (if you want)');

  return {
    source: 'remote',
    name,
    year: board,
    board: board,
    displayBoard: course,
    rawBoard: course,
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
  if (!SENIOR_FORM_ENDPOINT) return false;
  const code = getSeniorAccessCode();
  if (!code) {
    setSeniorAreaLocked(true);
    return false;
  }

  const grid = document.querySelector('.seniors-grid');
  if (!grid) return false;

  try {
    const url = new URL(SENIOR_FORM_ENDPOINT);
    url.searchParams.set('code', code);
    const response = await fetch(url.toString(), { method: 'GET' });
    if (!response.ok) throw new Error('Access denied');
    const rows = await response.json();
    if (rows?.error) throw new Error(rows.error);
    if (!Array.isArray(rows)) return false;

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
    unlockJuniorProfiles('');
    return true;
  } catch (error) {
    saveSeniorAccessCode('');
    setSeniorAreaLocked(true, 'Enrollment number not found or senior board endpoint is not ready.');
    console.warn('Senior sheet sync skipped:', error);
    return false;
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
  const selectedBoardOption = form.querySelector('select[name="year"] option:checked');
  if (selectedBoardOption) profile.displayBoard = selectedBoardOption.textContent.trim();
  profile.year = getSeniorBoardCode(profile.year || profile.board || profile.course || '', profile.name);
  profile.board = profile.year;
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
    const activeBoards = activeSeniorDisplayBoard.split('|').filter(Boolean);
    const boardMatches = activeBoards.length
      && card.dataset.displayBoard
      && activeBoards.includes(card.dataset.displayBoard);
    const yearMatches = boardMatches || (!card.dataset.displayBoard && card.dataset.seniorYear === activeSeniorYear);
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
  let saved = [];
  try {
    saved = JSON.parse(localStorage.getItem(JUNIOR_FEEDBACK_KEY) || '[]');
  } catch {
    saved = [];
  }
  const seen = new Set();
  return [...saved, ...DEFAULT_JUNIOR_FEEDBACK_NOTES].filter(note => {
    const key = `${normalizeSearchText(note.name)}::${normalizeSearchText(note.message)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
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
    closeAcademicCalendarModal();
  }
});

const messMenuRows = [
  { day: 'Monday', breakfast: ['Poha with sev', 'Cut onion', 'Mix sprouts', 'Cornflakes', 'Milk (200 ml)'], lunch: ['Arhar dal tadka', 'Aloo matar dry', 'Rice', 'Roti', 'Salad', 'Raita', 'Papad (1 pc)'], snacks: ['Samosa (1 pc)', 'Chutney', 'Tea'], dinner: ['Mix dal', 'Bhindi', 'Rice', 'Roti', 'Salad', 'Rice kheer'] },
  { day: 'Tuesday', breakfast: ['Idli', 'Sambhar', 'Coconut chutney', 'Tea'], lunch: ['Rajma', 'Mix veg', 'Rice', 'Roti', 'Salad'], snacks: ['Noodles', 'Ketchup', 'Tea'], dinner: ['Chana dal tadka', 'Soya keema matar', 'Rice', 'Roti', 'Salad', 'Suji halwa'] },
  { day: 'Wednesday', breakfast: ['Mix veg paratha', 'Curd', 'Achar', 'Tea'], lunch: ['Kadhi', 'Jeera aloo', 'Rice', 'Roti', 'Salad'], snacks: ['Mix sprout chaat / Steamed corn chaat', 'Tea'], dinner: ['Butter chicken / Chicken kadhai OR Paneer butter masala / Kadhai paneer', 'Rice', 'Roti', 'Salad', 'Gulab jamun (1 pc)'] },
  { day: 'Thursday', breakfast: ['Veg sewai', 'Banana (1 pc)', 'Milk (200 ml)', 'Cornflakes'], lunch: ['Black chana', 'Aloo parwal', 'Jeera rice', 'Roti', 'Salad', 'Raita', 'Papad (1 pc)'], snacks: ['Coleslaw / Tawa aloo sandwich', 'Ketchup', 'Tea'], dinner: ['Masoor dal', 'Mix veg kofta', 'Rice', 'Roti', 'Salad'] },
  { day: 'Friday', breakfast: ['Ajwaini paratha', 'Paneer bhurji / Egg bhurji', 'Achar', 'Tea'], lunch: ['Dal tadka', 'White matar gravy', 'Masala rice', 'Roti', 'Salad'], snacks: ['Masala idli', 'Green chutney', 'Tea'], dinner: ['Egg curry / Soya chaap / Paneer tawa masala', 'Rice', 'Roti', 'Salad', 'Fruit custard'] },
  { day: 'Saturday', breakfast: ['Pav bhaji', 'Banana (1 pc)', 'Tea'], lunch: ['Chola bhatura', 'Rice', 'Roti', 'Salad', 'Buttermilk'], snacks: ['Macaroni', 'Tea'], dinner: ['Black masoor', 'Palak corn', 'Rice', 'Roti', 'Salad'] },
  { day: 'Sunday', breakfast: ['Puri', 'Aloo tamatar', 'Tea', 'Achar'], lunch: ['Chicken homestyle / Paneer gravy', 'Rice', 'Roti', 'Salad', 'Papad (1 pc)'], snacks: ['Bhel puri', 'Chutney', 'Tea'], dinner: ['Dal makhani', 'Aloo matar gravy', 'Veg biryani', 'Roti', 'Salad', 'Sweet sewai / Sweet boondi'] }
];

const courseRows = [
  ['Sem-1', 'CTBT-BSC-101', 'Engineering Mathematics - 1', 4], ['Sem-1', 'CTBT-ESC-101', 'Basics of Electrical Engineering', 3], ['Sem-1', 'CTBT-ESC-102', 'Programming for Problem Solving', 3], ['Sem-1', 'CTBT-ESC-103', 'Engineering Graphics', 2], ['Sem-1', 'CTBT-BSC-102', 'Engineering Physics', 3], ['Sem-1', 'CTBT-HSM-101', 'Communication Skills', 3], ['Sem-1', 'CTBT-BSC-102L', 'Engineering Physics Laboratory', 1], ['Sem-1', 'CTBT-ESC-102L', 'Programming for Problem Solving Laboratory', 1], ['Sem-1', 'CTBT-ESC-103L', 'Engineering Graphics Laboratory', 1],
  ['Sem-2', 'CTBT-BSC-201', 'Engineering Mathematics - 2', 4], ['Sem-2', 'CTBT-HSM-201', 'Professional Ethics', 3], ['Sem-2', 'CTBT-PCC-201', 'Object Oriented Programming with C++', 3], ['Sem-2', 'CTBT-ESC-201', 'Digital Logic Design', 3], ['Sem-2', 'CTBT-FMC-201', 'Fundamentals of Forensic Science and Laws', 4], ['Sem-2', 'CTBT-EMC-202', 'Environment Science', 0], ['Sem-2', 'CTBT-PCC-201L', 'Object Oriented Programming with C++ Laboratory', 1], ['Sem-2', 'CTBT-ESC-201L', 'Digital Logic Design Laboratory', 1],
  ['Sem-3', 'CTBT-BSC-301', 'Engineering Mathematics - 3', 4], ['Sem-3', 'CTBT-PCC-301', 'Data Structure & Algorithms', 3], ['Sem-3', 'CTBT-PCC-302', 'Database Management Systems', 3], ['Sem-3', 'CTBT-PCC-303', 'Computer Programming with Python', 2], ['Sem-3', 'CTBT-PCC-304', 'Computer Organization & Microprocessors', 3], ['Sem-3', 'CTBT-ESC-301', 'Essentials of Cyber Security', 3], ['Sem-3', 'CTBT-PCC-301L', 'Data Structure & Algorithms Laboratory', 1], ['Sem-3', 'CTBT-PCC-302L', 'Database Management Systems Laboratory', 1], ['Sem-3', 'CTBT-PCC-303L', 'Computer Programming with Python Laboratory', 2], ['Sem-3', 'CTBT-PCC-304L', 'Computer Organization & Microprocessors Laboratory', 1],
  ['Sem-4', 'CTBT-ESC-401', 'Engineering Mathematics - 4', 4], ['Sem-4', 'CTBT-PCC-401', 'Computer Networks', 3], ['Sem-4', 'CTBT-PCC-402', 'Operating System', 3], ['Sem-4', 'CTBT-PCC-403', 'Cryptography', 3], ['Sem-4', 'CTBT-PCC-404', 'Web Application Development', 3], ['Sem-4', 'CTBT-HSC-401', 'Engineering Economics & Management', 3], ['Sem-4', 'CTBT-PCC-401L', 'Computer Networks Laboratory', 1], ['Sem-4', 'CTBT-PCC-402L', 'Operating System Laboratory', 1], ['Sem-4', 'CTBT-PCC-403L', 'Cryptography Laboratory', 1], ['Sem-4', 'CTBT-PCC-404L', 'Web Application Development Laboratory', 1],
  ['Sem-5', 'CTBT-PCC-501', 'Communication Technology', 3], ['Sem-5', 'CTBT-PCC-502', 'Network Security', 3], ['Sem-5', 'CTBT-PCC-503', 'Java Programming', 2], ['Sem-5', 'CTBT-PCC-504', 'Theory of Computation', 4], ['Sem-5', 'CTBT-PEC-50X', 'Program Elective - I', 3], ['Sem-5', 'CTBT-EMC-505', 'Constitution of India', 0], ['Sem-5', 'CTBT-PCC-501L', 'Communication Technology Laboratory', 1], ['Sem-5', 'CTBT-PCC-502L', 'Network Security Laboratory', 1], ['Sem-5', 'CTBT-PCC-503L', 'Java Programming Laboratory', 2], ['Sem-5', 'CTBT-PEC-50XL', 'Program Elective - I Laboratory', 1],
  ['Sem-6', 'CTBT-PCC-601', 'Design & Analysis of Algorithms', 3], ['Sem-6', 'CTBT-PCC-602', 'Application Security', 3], ['Sem-6', 'CTBT-PCC-603', 'Compiler Design', 3], ['Sem-6', 'CTBT-PCC-604', 'Cloud Computing & Architecture', 3], ['Sem-6', 'CTBT-PEC-60X', 'Program Elective - II', 3], ['Sem-6', 'CTBT-EMC-605', 'Indian Knowledge System', 0], ['Sem-6', 'CTBT-PCC-601L', 'Design & Analysis of Algorithms Laboratory', 1], ['Sem-6', 'CTBT-PCC-602L', 'Application Security Laboratory', 1], ['Sem-6', 'CTBT-PCC-603L', 'Compiler Design Laboratory', 1], ['Sem-6', 'CTBT-PCC-604L', 'Cloud Computing & Architecture Laboratory', 1], ['Sem-6', 'CTBT-PEC-60XL', 'Program Elective - II Laboratory', 1]
];
const COURSE_VOTE_KEY = 'upsifs_course_recommendation_votes';
const COURSE_SUGGEST_FORM_URL = 'https://forms.gle/WurEYQVuinQKqtBP9';

const courseSyllabusByCode = {
  'CTBT-BSC-101': [
    'Unit 1: Differential calculus, limits, continuity, partial derivatives, maxima and minima.',
    'Unit 2: Integral calculus, definite integrals, beta and gamma functions.',
    'Unit 3: Matrices, rank, linear equations, eigenvalues and eigenvectors.',
    'Unit 4: Ordinary differential equations and engineering applications.',
    'Unit 5: Vector calculus basics, gradient, divergence and curl.'
  ],
  'CTBT-BSC-201': [
    'Unit 1: Laplace transforms and inverse Laplace transforms.',
    'Unit 2: Fourier series and harmonic analysis.',
    'Unit 3: Complex variables and analytic functions.',
    'Unit 4: Probability distributions and statistical methods.',
    'Unit 5: Numerical methods for algebraic and differential equations.'
  ],
  'CTBT-ESC-103': [
    'Unit 1: Drawing instruments, lettering, dimensioning and engineering curves.',
    'Unit 2: Orthographic projections of points, lines and planes.',
    'Unit 3: Projection of solids and sectional views.',
    'Unit 4: Isometric projections and development of surfaces.',
    'Unit 5: Basic CAD drafting workflow and drawing sheet practice.'
  ]
};

const courseRecommendations = {
  mathematics: [
    { id: 'gajendra-purohit', name: 'Gajendra Purohit', note: 'Strong for Engineering Mathematics problem practice.', url: 'https://www.youtube.com/@gajendrapurohit' }
  ],
  drawing: [
    { id: 'tikles-academy', name: 'TIKLES ACADEMY', note: 'Useful for Engineering Drawing / Graphics visual explanations.', url: 'https://www.youtube.com/@TIKLESACADEMY' }
  ],
  programming: [
    { id: 'neso-academy-programming', name: 'Neso Academy', note: 'Good structured basics for programming and CS fundamentals.', url: 'https://www.youtube.com/@nesoacademy' }
  ],
  default: [
    { id: 'suggest-needed', name: 'Suggest a channel', note: 'No fixed recommendation yet. Send your best source and seniors can add it.', url: COURSE_SUGGEST_FORM_URL }
  ]
};

function getCourseRecommendationGroup(course) {
  const clean = String(course || '').toLowerCase();
  if (clean.includes('mathematics')) return 'mathematics';
  if (clean.includes('graphics') || clean.includes('drawing')) return 'drawing';
  if (clean.includes('programming') || clean.includes('python') || clean.includes('c++') || clean.includes('java')) return 'programming';
  return 'default';
}

function getCourseVotes() {
  try {
    return JSON.parse(localStorage.getItem(COURSE_VOTE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveCourseVotes(votes) {
  localStorage.setItem(COURSE_VOTE_KEY, JSON.stringify(votes));
}

function getSortedCourseRecommendations(course) {
  const group = getCourseRecommendationGroup(course);
  const votes = getCourseVotes();
  return [...(courseRecommendations[group] || courseRecommendations.default)]
    .map(item => ({ ...item, votes: Number(votes[item.id] || 0) }))
    .sort((a, b) => b.votes - a.votes || a.name.localeCompare(b.name));
}

function voteCourseRecommendation(id) {
  const votes = getCourseVotes();
  votes[id] = Number(votes[id] || 0) + 1;
  saveCourseVotes(votes);
  const modal = document.getElementById('course-detail-modal');
  const code = modal?.dataset.courseCode;
  if (code) {
    const row = courseRows.find(([, rowCode]) => rowCode === code);
    if (row) openCourseDetail(...row);
  }
}

function suggestCourseRecommendation(course, code) {
  const url = new URL(COURSE_SUGGEST_FORM_URL);
  url.searchParams.set('course', course || '');
  url.searchParams.set('code', code || '');
  window.open(url.toString(), '_blank', 'noopener,noreferrer');
}

function openCourseDetail(semester, code, course, credit) {
  const modal = document.getElementById('course-detail-modal');
  const title = document.getElementById('course-detail-title');
  const body = document.getElementById('course-detail-body');
  if (!modal || !title || !body) return;

  modal.dataset.courseCode = code;
  title.textContent = `${course} · ${code}`;
  const syllabus = courseSyllabusByCode[code] || [];
  const recommendations = getSortedCourseRecommendations(course);

  body.innerHTML = `
    <div class="course-detail-meta">
      <span>${escapeHtml(semester)}</span>
      <span>${escapeHtml(code)}</span>
      <span>${escapeHtml(String(credit))} credits</span>
    </div>
    <section class="course-detail-section course-syllabus-section">
      <h3>Syllabus table</h3>
      ${syllabus.length ? `
        <table class="course-syllabus-table">
          <tbody>
            ${syllabus.map((unit, index) => `
              <tr>
                <th>Unit ${index + 1}</th>
                <td>${escapeHtml(unit.replace(/^Unit\s+\d+:\s*/i, ''))}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : '<p class="course-detail-empty">Exact syllabus table will appear here after the official PDF is added/extracted.</p>'}
    </section>
    <section class="course-detail-section course-recommendation-section">
      <h3>YouTubers to follow</h3>
      <div class="course-recommendation-list">
        ${recommendations.map(item => `
          <article class="course-recommendation-card">
            <div>
              <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.name)} ↗</a>
              <p>${escapeHtml(item.note)}</p>
            </div>
            <button type="button" onclick="voteCourseRecommendation('${escapeHtml(item.id)}')">▲ ${item.votes}</button>
          </article>
        `).join('')}
      </div>
      <button class="course-suggest-btn" type="button" onclick="suggestCourseRecommendation('${escapeHtml(course)}', '${escapeHtml(code)}')">suggest more sources</button>
    </section>
  `;
  modal.classList.add('active');
}

function closeCourseDetail() {
  document.getElementById('course-detail-modal')?.classList.remove('active');
}

window.openCourseDetail = openCourseDetail;
window.closeCourseDetail = closeCourseDetail;
window.voteCourseRecommendation = voteCourseRecommendation;
window.suggestCourseRecommendation = suggestCourseRecommendation;

function renderListCell(items) {
  return `<span class="mess-items">${items.map(item => `<span>${escapeHtml(item)}</span>`).join('')}</span>`;
}

function renderMessMenu() {
  const body = document.getElementById('mess-menu-body');
  if (!body) return;
  body.innerHTML = messMenuRows.map(row => `
    <tr>
      <td><strong>${escapeHtml(row.day)}</strong></td>
      <td>${renderListCell(row.breakfast)}</td>
      <td>${renderListCell(row.lunch)}</td>
      <td>${renderListCell(row.snacks)}</td>
      <td>${renderListCell(row.dinner)}</td>
    </tr>
  `).join('');
}

function toggleMessMenu() {
  const wrap = document.getElementById('mess-menu-wrap');
  const toggle = document.getElementById('mess-menu-toggle');
  if (!wrap || !toggle) return;
  const shouldOpen = wrap.hidden;
  wrap.hidden = !shouldOpen;
  toggle.setAttribute('aria-expanded', String(shouldOpen));
  toggle.textContent = shouldOpen ? 'Hide Mess Menu' : 'Show Mess Menu';
}

function renderCourseTable() {
  const body = document.getElementById('course-table-body');
  if (!body) return;
  const selectedSemester = document.getElementById('course-semester-filter')?.value || 'Sem-1';
  const query = (document.getElementById('course-search')?.value || '').trim().toLowerCase();
  const filteredRows = courseRows.filter(([semester, code, course]) => {
    const semesterMatch = selectedSemester === 'all' || semester === selectedSemester;
    const queryMatch = !query || `${semester} ${code} ${course}`.toLowerCase().includes(query);
    return semesterMatch && queryMatch;
  });
  body.innerHTML = filteredRows.map(([semester, code, course, credit]) => `
    <tr>
      <td>${escapeHtml(semester)}</td>
      <td>${escapeHtml(code)}</td>
      <td>${escapeHtml(course)}</td>
      <td>${escapeHtml(String(credit))}</td>
      <td><button class="course-view-btn" type="button" onclick="openCourseDetail('${escapeHtml(semester)}', '${escapeHtml(code)}', '${escapeHtml(course)}', ${Number(credit) || 0})">view</button></td>
    </tr>
  `).join('');
  const empty = document.getElementById('course-empty');
  if (empty) empty.hidden = filteredRows.length > 0;
}

// ═══════════════ INITIALIZATION ═══════════════
window.addEventListener('DOMContentLoaded', () => {
  setupSidebarToggle();
  setupMasterSearch();
  window.history.replaceState({ tab: 'home' }, '', window.location.pathname);
  applyArcadeTheme(localStorage.getItem(ARCADE_THEME_KEY) || 'app');
  setSiteFont(localStorage.getItem(SITE_FONT_KEY) || 'default');
  const activeSeniorButton = document.querySelector('.senior-year-btn.active');
  if (activeSeniorButton) {
    activeSeniorYear = activeSeniorButton.dataset.year || activeSeniorYear;
    activeSeniorDisplayBoard = seniorButtonDisplayBoards(activeSeniorButton).join('|');
  }

  localStorage.removeItem('upsifs_senior_profile_submissions');
  if (getSeniorAccessCode()) {
    loadApprovedSeniorProfiles();
  } else {
    setSeniorAreaLocked(true);
  }
  document.getElementById('senior-profile-form')?.addEventListener('submit', submitSeniorProfile);
  document.getElementById('senior-lock-form')?.addEventListener('submit', unlockSeniorBoard);
  document.getElementById('senior-search')?.addEventListener('input', updateSeniorFilters);
  document.getElementById('wifi-access-form')?.addEventListener('submit', unlockWifiPasswords);
  setWifiAccessUnlocked(getWifiAccessGranted(), getWifiAccessGranted() ? 'Access granted. Wi-Fi details unlocked.' : '');
  document.getElementById('junior-lock-form')?.addEventListener('submit', unlockJuniorBoard);
  document.getElementById('junior-feedback-form')?.addEventListener('submit', submitJuniorFeedback);
  if (isValidJuniorAccessCode(getJuniorAccessCode())) {
    renderJuniorProfiles();
    setJuniorAreaLocked(false);
  } else {
    saveJuniorAccessCode('');
    setJuniorAreaLocked(true);
  }
  document.getElementById('resource-preview-modal')?.addEventListener('click', (event) => {
    if (event.target.id === 'resource-preview-modal') closeResourcePreview();
  });
  document.getElementById('course-detail-modal')?.addEventListener('click', (event) => {
    if (event.target.id === 'course-detail-modal') closeCourseDetail();
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
  renderMessMenu();
  document.getElementById('mess-menu-toggle')?.addEventListener('click', toggleMessMenu);
  document.getElementById('academic-calendar-modal')?.addEventListener('click', (event) => {
    if (event.target.id === 'academic-calendar-modal') closeAcademicCalendarModal();
  });
  document.getElementById('calendar-modal-search')?.addEventListener('input', renderAcademicCalendarModalContent);
  renderCourseTable();
  document.getElementById('course-semester-filter')?.addEventListener('change', renderCourseTable);
  document.getElementById('course-search')?.addEventListener('input', renderCourseTable);
  loadResourceFeed();
  updateSeniorFilters();
});

// ═══════════════ ACADEMIC CALENDAR DATA & LOGIC ═══════════════
const academicCalendarData = {
  'odd-1': {
    title: 'A. Odd Semester – Semester – I (Academic Year 2026 – 2027)',
    subtitle: 'All Courses & All Campuses of NFSU',
    rows: [
      { id: 1, particulars: 'Orientation and Induction Program', timeline: '06.08.2026 to 08.08.2026' },
      { id: 2, particulars: 'Semester Commencement', timeline: '10.08.2026' },
      { id: 3, particulars: 'Teaching Phase – I', timeline: '10.08.2026 to 17.09.2026' },
      { id: 4, particulars: 'Teaching Assessment (TA) – I / Review Report (RR) / Continuous Assessment (CA) – I', timeline: '14.09.2026 to 17.09.2026' },
      { id: 5, particulars: 'Academic & Attendance Review* – I', timeline: '18.09.2026' },
      { id: 6, particulars: 'Teaching Phase – II', timeline: '18.09.2026 to 09.10.2026' },
      { id: 7, particulars: 'Result of Teaching Assessment (TA) – I / Review Report (RR) / Continuous Assessment (CA) – I', timeline: '30.09.2026' },
      { id: 8, particulars: 'Academic & Attendance Review* – II', timeline: '09.10.2026' },
      { id: 9, particulars: 'Mid Semester Exam (MSE) / Laboratory Practice Work (LPW) Exam/Review Report (RR)', timeline: '12.10.2026 to 19.10.2026' },
      { id: 10, particulars: 'Teaching Phase – III', timeline: '21.10.2026 to 18.12.2026' },
      { id: 11, particulars: 'Result of Mid Semester Exam (MSE) / Review Report (RR)', timeline: '02.11.2026' },
      { id: 12, particulars: 'Block Exam for Mid Semester Exam', timeline: '16.11.2026 to 20.11.2026' },
      { id: 13, particulars: 'Result of Block Semester Exam', timeline: '24.11.2026' },
      { id: 14, particulars: 'Teaching Assessment (TA) – II/ Review Report (RR) / Continuous Assessment (CA) – II *', timeline: '19.11.2026 to 25.11.2026' },
      { id: 15, particulars: 'Result of Teaching Assessment (TA) – II/ Review Report (RR) / Continuous Assessment (CA) –II', timeline: '27.11.2026' },
      { id: 16, particulars: 'Final Academic & Attendance Review*', timeline: '17.12.2026' },
      { id: 17, particulars: 'Submission of Final Internal Marks & Attendance', timeline: '17.12.2026 to 21.12.2026' },
      { id: 18, particulars: 'Semester End Examination Form Filling', timeline: '22.12.2026 to 24.12.2026' },
      { id: 19, particulars: 'Semester End Practical Examination', timeline: '23.12.2026 to 30.12.2026' },
      { id: 20, particulars: 'Semester End Theory Examination', timeline: '04.01.2027 to 12.01.2027' },
      { id: 21, particulars: 'Diwali Break', timeline: '09.11.2026 to 13.11.2026' },
      { id: 22, particulars: 'Semester Break', timeline: '13.01.2027 to 17.01.2027' },
      { id: 23, particulars: 'Commencement of Next Semester', timeline: '18.01.2027' }
    ],
    footnote: '*Academic Review shall be inclusive of the syllabus coverage of all subject across the campuses as per the lesson plan; review of performance in Continuous Assessment; overall performance of students; identification of weak students and the areas where students require counselling. Furthermore, it shall also include review of the co-curricular activities and status of the expert talks/ workshops from industry personnel for each course.'
  },
  'odd-multi': {
    title: 'B. Odd Semester – Semester – III/V/VII/IX & Forensic Dentistry Semester – II/IV',
    subtitle: 'All Courses & All Campuses of NFSU',
    rows: [
      { id: 1, particulars: 'Semester Commencement', timeline: '23.07.2026' },
      { id: 2, particulars: 'Teaching Phase – I', timeline: '23.07.2026 to 17.09.2026' },
      { id: 3, particulars: 'Remedial Examination (Form Filling/Examination)', timeline: '30 days after the announcement of the results of SEE for all campuses & affiliated Institutes' },
      { id: 4, particulars: 'Teaching Assessment (TA) – I / Review Report (RR) / Continuous Assessment (CA) – I', timeline: '14.09.2026 to 17.09.2026' },
      { id: 5, particulars: 'Academic & Attendance Review* – I', timeline: '18.09.2026' },
      { id: 6, particulars: 'Teaching Phase – II', timeline: '18.09.2026 to 09.10.2026' },
      { id: 7, particulars: 'Result of Teaching Assessment (TA) – I / Review Report (RR) / Continuous Assessment (CA) – I', timeline: '30.09.2026' },
      { id: 8, particulars: 'Academic & Attendance Review* – II', timeline: '09.10.2026' },
      { id: 9, particulars: 'Mid Semester Exam (MSE) / Laboratory Practice Work (LPW) Exam/Review Report (RR)', timeline: '12.10.2026 to 19.10.2026' },
      { id: 10, particulars: 'Teaching Phase – III', timeline: '21.10.2026 to 18.12.2026' },
      { id: 11, particulars: 'Result of Mid Semester Exam (MSE) / Review Report (RR)', timeline: '02.11.2026' },
      { id: 12, particulars: 'Block Exam for Mid Semester Exam', timeline: '16.11.2026 to 20.11.2026' },
      { id: 13, particulars: 'Result of Block Semester Exam', timeline: '24.11.2026' },
      { id: 14, particulars: 'Teaching Assessment (TA) – II/ Review Report (RR) / Continuous Assessment (CA) – II *', timeline: '19.11.2026 to 25.11.2026' },
      { id: 15, particulars: 'Result of Teaching Assessment (TA) – II/ Review Report (RR) / Continuous Assessment (CA) –II', timeline: '27.11.2026' },
      { id: 16, particulars: 'Final Academic & Attendance Review*', timeline: '08.12.2026' },
      { id: 17, particulars: 'Submission of Final Internal Marks & Attendance', timeline: '08.12.2026 to 10.12.2026' },
      { id: 18, particulars: 'Semester End Examination Form Filling', timeline: '11.12.2026 to 15.12.2026' },
      { id: 19, particulars: 'Semester End Theory Examination', timeline: '23.12.2026 to 01.01.2027' },
      { id: 20, particulars: 'Semester End Practical Examination', timeline: '04.01.2027 to 08.01.2027' },
      { id: 21, particulars: 'Diwali Break', timeline: '09.11.2026 to 13.11.2026' },
      { id: 22, particulars: 'Semester Break', timeline: '11.01.2027 to 17.01.2027' },
      { id: 23, particulars: 'Commencement of Next Semester', timeline: '18.01.2027' }
    ],
    footnote: '*Academic Review shall be inclusive of the syllabus coverage of all subject across the campuses as per the lesson plan; review of performance in Continuous Assessment; overall performance of students; identification of weak students and the areas where students require counselling. Furthermore, it shall also include review of the co-curricular activities and status of the expert talks/ workshops from industry personnel for each course.'
  },
  'even': {
    title: 'C. Even Semester – Semester – II/IV/VI/VIII/X & Forensic Dentistry Semester – I/III',
    subtitle: 'All Courses & All Campuses of NFSU',
    rows: [
      { id: 1, particulars: 'Semester Commencement', timeline: '18.01.2027' },
      { id: 2, particulars: 'Registration of Dissertation/Electives', timeline: '18.01.2027' },
      { id: 3, particulars: 'Teaching Phase – I', timeline: '18.01.2027 to 11.02.2027' },
      { id: 4, particulars: 'Remedial Examination (Form Filling/Examination)', timeline: '30 days after the announcement of the results of SEE for all campuses & affiliated Institutes' },
      { id: 5, particulars: 'Teaching Assessment (TA) – I / Review Report (RR) / Continuous Assessment (CA) – I', timeline: '08.02.2027 to 11.02.2027' },
      { id: 6, particulars: 'Academic & Attendance Review* – I', timeline: '12.02.2027' },
      { id: 7, particulars: 'Teaching Phase – II', timeline: '12.02.2027 to 19.03.2027' },
      { id: 8, particulars: 'Result of Teaching Assessment (TA) – I / Review Report (RR) / Continuous Assessment (CA) – I', timeline: '15.02.2027' },
      { id: 9, particulars: 'Academic & Attendance Review* – II', timeline: '11.03.2027' },
      { id: 10, particulars: 'Mid Semester Exam (MSE) / Laboratory Practice Work (LPW) Exam/Review Report (RR)', timeline: '11.03.2027 to 19.03.2027' },
      { id: 11, particulars: 'Teaching Phase – III', timeline: '23.03.2027 to 28.04.2027' },
      { id: 12, particulars: 'Result of Mid Semester Exam (MSE) / Review Report (RR)', timeline: '30.03.2027' },
      { id: 13, particulars: 'Block Exam for Mid Semester Exam', timeline: '05.04.2027 to 09.04.2027' },
      { id: 14, particulars: 'Result of Block Semester Exam', timeline: '14.04.2027' },
      { id: 15, particulars: 'Teaching Assessment (TA) – II/ Review Report (RR) / Continuous Assessment (CA) – II *', timeline: '20.04.2027 to 23.04.2027' },
      { id: 16, particulars: 'Result of Teaching Assessment (TA) – II/ Review Report (RR) / Continuous Assessment (CA) –II', timeline: '26.04.2027' },
      { id: 17, particulars: 'Final Academic & Attendance Review*', timeline: '03.05.2027' },
      { id: 18, particulars: 'Submission of Final Internal Marks & Attendance', timeline: '03.05.2027 to 05.05.2027' },
      { id: 19, particulars: 'Semester End Examination Form Filling', timeline: '07.05.2027 to 10.05.2027' },
      { id: 20, particulars: 'Semester End Theory Examination', timeline: '18.05.2027 to 28.07.2027' },
      { id: 21, particulars: 'Semester End Practical Examination', timeline: '10.05.2027 to 14.05.2027' },
      { id: 22, particulars: 'Summer/Internship Break', timeline: '31.05.2027 to 31.07.2027' },
      { id: 23, particulars: 'Commencement of Next Semester', timeline: '02.08.2027' }
    ],
    footnote: '*Academic Review shall be inclusive of the syllabus coverage of all subject across the campuses as per the lesson plan; review of performance in Continuous Assessment; overall performance of students; identification of weak students and the areas where students require counselling. Furthermore, it shall also include review of the co-curricular activities and status of the expert talks/ workshops from industry personnel for each course.\n**Sports Week & Annual Day to be observed from 21.01.2027 (Thursday) to 26.01.2027 (Tuesday)'
  }
};

let currentModalCalendarSem = 'odd-1';
let currentInlineCalendarSem = 'odd-1';

function openAcademicCalendarModal(semesterType = 'odd-1') {
  currentModalCalendarSem = semesterType;
  const modal = document.getElementById('academic-calendar-modal');
  if (!modal) return;
  modal.classList.add('active');
  const searchInput = document.getElementById('calendar-modal-search');
  if (searchInput) searchInput.value = '';
  renderAcademicCalendarModalContent();
}

function closeAcademicCalendarModal() {
  const modal = document.getElementById('academic-calendar-modal');
  if (modal) modal.classList.remove('active');
}

function setAcademicCalendarTab(semesterType) {
  currentModalCalendarSem = semesterType;
  renderAcademicCalendarModalContent();
}

function renderAcademicCalendarModalContent() {
  const data = academicCalendarData[currentModalCalendarSem] || academicCalendarData['odd-1'];

  ['odd-1', 'odd-multi', 'even'].forEach(type => {
    const pill = document.getElementById(`cal-pill-${type}`);
    if (pill) pill.classList.toggle('active', type === currentModalCalendarSem);
  });

  const subhead = document.getElementById('calendar-modal-subhead');
  if (subhead) {
    subhead.innerHTML = `<strong>${escapeHtml(data.title)}</strong><br><small>${escapeHtml(data.subtitle)}</small>`;
  }

  const searchVal = (document.getElementById('calendar-modal-search')?.value || '').trim().toLowerCase();
  const tbody = document.getElementById('calendar-modal-tbody');

  if (tbody) {
    const filteredRows = data.rows.filter(row => {
      if (!searchVal) return true;
      return row.particulars.toLowerCase().includes(searchVal) || row.timeline.toLowerCase().includes(searchVal);
    });

    if (filteredRows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; padding:1.5rem; opacity:0.8;">No matching events found.</td></tr>`;
    } else {
      tbody.innerHTML = filteredRows.map(row => `
        <tr>
          <td><strong>${row.id}</strong></td>
          <td>${escapeHtml(row.particulars)}</td>
          <td><span class="calendar-timeline-tag">${escapeHtml(row.timeline)}</span></td>
        </tr>
      `).join('');
    }
  }

  const footnote = document.getElementById('calendar-modal-footnote');
  if (footnote) {
    footnote.innerText = data.footnote;
  }
}

function toggleInlineAcademicCalendar(semesterType = currentInlineCalendarSem) {
  const wrap = document.getElementById('calendar-inline-wrap');
  if (!wrap) return;
  const shouldClose = !wrap.hidden && currentInlineCalendarSem === semesterType;
  currentInlineCalendarSem = semesterType;

  document.querySelectorAll('.cal-sem-btn').forEach(btn => {
    const isActive = btn.id === `cal-btn-${semesterType}`;
    btn.classList.toggle('active', !shouldClose && isActive);
    btn.setAttribute('aria-expanded', String(!shouldClose && isActive));
  });

  wrap.hidden = shouldClose;
  if (!shouldClose) {
    renderInlineAcademicCalendar();
    window.setTimeout(() => wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
  }
}

function switchInlineCalendarTab(semesterType) {
  currentInlineCalendarSem = semesterType;
  document.querySelectorAll('.cal-sem-btn').forEach(btn => {
    btn.classList.toggle('active', btn.id === `cal-btn-${semesterType}`);
  });
  renderInlineAcademicCalendar();
}

function renderInlineAcademicCalendar() {
  const data = academicCalendarData[currentInlineCalendarSem] || academicCalendarData['odd-1'];
  const subhead = document.getElementById('calendar-inline-subhead');
  if (subhead) {
    subhead.innerHTML = `<strong>${escapeHtml(data.title)}</strong><br><small>${escapeHtml(data.subtitle)}</small>`;
  }
  const tbody = document.getElementById('calendar-inline-tbody');
  if (tbody) {
    tbody.innerHTML = data.rows.map(row => `
      <tr>
        <td><strong>${row.id}</strong></td>
        <td>${escapeHtml(row.particulars)}</td>
        <td><span class="calendar-timeline-tag">${escapeHtml(row.timeline)}</span></td>
      </tr>
    `).join('');
  }
  const footnote = document.getElementById('calendar-inline-footnote');
  if (footnote) {
    footnote.innerText = data.footnote;
  }
}

window.openAcademicCalendarModal = openAcademicCalendarModal;
window.closeAcademicCalendarModal = closeAcademicCalendarModal;
window.setAcademicCalendarTab = setAcademicCalendarTab;
window.toggleInlineAcademicCalendar = toggleInlineAcademicCalendar;
window.switchInlineCalendarTab = switchInlineCalendarTab;
window.toggleEventsWidget = toggleEventsWidget;

function toggleCampusHelperGuide() {
  const bubble = document.getElementById('campus-helper-bubble');
  bubble?.classList.toggle('expanded');
}

const siteMusicTracks = {
  lofi: {
    tempo: 820,
    wave: 'sine',
    notes: [261.63, 329.63, 392.0, 493.88, 392.0, 329.63]
  },
  rain: {
    tempo: 1100,
    wave: 'triangle',
    notes: [220.0, 277.18, 329.63, 277.18, 246.94]
  },
  arcade: {
    tempo: 560,
    wave: 'square',
    notes: [329.63, 392.0, 523.25, 659.25, 523.25, 392.0]
  }
};
let siteMusicContext = null;
let siteMusicGain = null;
let siteMusicTimer = null;
let siteMusicStep = 0;
let activeSiteMusicTrack = 'lofi';

function playSiteMusicNote() {
  if (!siteMusicContext || !siteMusicGain) return;
  const track = siteMusicTracks[activeSiteMusicTrack] || siteMusicTracks.lofi;
  const note = track.notes[siteMusicStep % track.notes.length];
  const osc = siteMusicContext.createOscillator();
  const noteGain = siteMusicContext.createGain();
  osc.type = track.wave;
  osc.frequency.value = note;
  noteGain.gain.setValueAtTime(0.0001, siteMusicContext.currentTime);
  noteGain.gain.exponentialRampToValueAtTime(0.08, siteMusicContext.currentTime + 0.02);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, siteMusicContext.currentTime + 0.34);
  osc.connect(noteGain);
  noteGain.connect(siteMusicGain);
  osc.start();
  osc.stop(siteMusicContext.currentTime + 0.36);
  siteMusicStep++;
}

function startSiteMusic() {
  if (!siteMusicContext) {
    siteMusicContext = new (window.AudioContext || window.webkitAudioContext)();
    siteMusicGain = siteMusicContext.createGain();
    siteMusicGain.gain.value = 0.22;
    siteMusicGain.connect(siteMusicContext.destination);
  }
  siteMusicContext.resume?.();
  window.clearInterval(siteMusicTimer);
  playSiteMusicNote();
  const track = siteMusicTracks[activeSiteMusicTrack] || siteMusicTracks.lofi;
  siteMusicTimer = window.setInterval(playSiteMusicNote, track.tempo);
  const btn = document.getElementById('music-toggle');
  if (btn) {
    btn.textContent = '♪ pause';
    btn.setAttribute('aria-pressed', 'true');
  }
}

function stopSiteMusic() {
  window.clearInterval(siteMusicTimer);
  siteMusicTimer = null;
  const btn = document.getElementById('music-toggle');
  if (btn) {
    btn.textContent = '♪ play';
    btn.setAttribute('aria-pressed', 'false');
  }
}

function toggleSiteMusic() {
  if (siteMusicTimer) stopSiteMusic();
  else startSiteMusic();
}

function changeSiteMusicTrack(trackName) {
  activeSiteMusicTrack = siteMusicTracks[trackName] ? trackName : 'lofi';
  siteMusicStep = 0;
  if (siteMusicTimer) startSiteMusic();
}

window.toggleCampusHelperGuide = toggleCampusHelperGuide;
window.toggleSiteMusic = toggleSiteMusic;
window.changeSiteMusicTrack = changeSiteMusicTrack;

// Render events widget after all data (academicCalendarData) is ready
document.addEventListener('DOMContentLoaded', renderEventsWidget);

console.log(`
 🍄 FULL-VIEWPORT SCALED 90s NES SUPER MARIO GAME ENGINE WITH DRIFTING CLOUDS ACTIVE!
 🔵 SOLID 3D SPIRAL HELICAL GALLERY ENGINE LOADED!
`);
