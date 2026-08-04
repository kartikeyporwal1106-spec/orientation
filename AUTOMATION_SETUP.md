# Senior Profile Form Automation

The site can read approved rows from the Google Form response sheet. You only need to clean fields when the original response is messy.

## Sheet Columns

Keep the original form columns and add these admin columns at the end:

`approved, hide, displayName, displayBoard, displayPlace, displayTagline, displaySkills, displayPhoto, displayInstagram, displayWhatsapp, displayLinkedin, displayResume`

Only `approved` is required. Use `yes` to publish a row. Blank `display...` columns fall back to the original form values.

Use `displayBoard` values:

- `2` for B.Tech Year 2
- `3` for B.Tech Year 3
- `law2` for B.Sc. LL.B Year 2

## Apps Script

Open the response Sheet, then Extensions > Apps Script. Paste this:

```js
const SHEET_NAME = 'Form Responses 1';

function rowToObject(headers, row) {
  const item = {};
  headers.forEach((header, index) => item[header] = row[index]);
  return item;
}

function pick(row, ...keys) {
  for (const key of keys) {
    const value = row[key];
    if (value !== undefined && value !== null && String(value).trim()) {
      return String(value).trim();
    }
  }
  return '';
}

function normalizeEnrollment(value) {
  return String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

function verifyEnrollment(enrollment) {
  const cleanEnrollment = normalizeEnrollment(enrollment);
  if (!cleanEnrollment) return false;

  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift().map(header => String(header).trim());

  return rows.some(row => {
    const item = rowToObject(headers, row);
    return normalizeEnrollment(pick(item, 'Enrollment Number')) === cleanEnrollment;
  });
}

function doGet(e) {
  if (!verifyEnrollment(e.parameter.code)) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'ACCESS_DENIED' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift().map(header => String(header).trim());

  const data = rows
    .map(row => rowToObject(headers, row))
    .filter(row =>
      String(row.approved || '').toLowerCase() === 'yes' &&
      String(row.hide || '').toLowerCase() !== 'yes'
    )
    .map(row => ({
      name: pick(row, 'displayName', 'Your Name'),
      board: pick(row, 'displayBoard', 'Your Course And Semester', 'Your Course'),
      enrollment: pick(row, 'Enrollment Number'),
      place: pick(row, 'displayPlace', 'Place (Kha se Hai Aap)'),
      tagline: pick(row, 'displayTagline', 'TagLine (Experience or Something good about u)'),
      skills: pick(row, 'displaySkills', 'Topics You Can Guide On', 'Your Interest (This will appear on your profile)'),
      photo: pick(row, 'displayPhoto', 'Profile Photo', 'Profile Photo (if you want)'),
      whatsapp: pick(row, 'displayWhatsapp', 'Your Mobile Number (Whatsapp)'),
      instagram: pick(row, 'displayInstagram', 'Your Instagram'),
      linkedin: pick(row, 'displayLinkedin'),
      resume: pick(row, 'displayResume', 'Resume')
    }));

  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents || '{}');
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
  const row = headers.map(header => {
    if (header === 'Timestamp') return new Date();
    if (header === 'Your Name') return data.name || '';
    if (header === 'Your Course And Semester' || header === 'Your Course') return data.year || '';
    if (header === 'Enrollment Number') return data.enrollment || '';
    if (header === 'Your Mobile Number (Whatsapp)') return data.whatsapp || '';
    if (header === 'Your Instagram') return data.instagram || '';
    if (header === 'Resume') return data.resume || '';
    if (header === 'Topics You Can Guide On') return data.skills || '';
    if (header === 'TagLine (Experience or Something good about u)') return data.tagline || '';
    if (header === 'Place (Kha se Hai Aap)') return data.place || '';
    if (header === 'Profile Photo' || header === 'Profile Photo (if you want)') return data.photo || '';
    if (header === 'approved') return 'no';
    if (header === 'displayName') return data.name || '';
    if (header === 'displayBoard') return data.year || '';
    if (header === 'displayPlace') return data.place || '';
    if (header === 'displayTagline') return data.tagline || '';
    if (header === 'displaySkills') return data.skills || '';
    if (header === 'displayPhoto') return data.photo || '';
    if (header === 'displayInstagram') return data.instagram || '';
    if (header === 'displayWhatsapp') return data.whatsapp || '';
    if (header === 'displayLinkedin') return data.linkedin || '';
    if (header === 'displayResume') return data.resume || '';
    return '';
  });

  sheet.appendRow(row);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Deploy as Web App:
   - Execute as: Me
   - Who has access: Anyone

4. Copy the Web App URL into `script.js`:

```js
const SENIOR_FORM_ENDPOINT = 'PASTE_WEB_APP_URL_HERE';
```

Rows stay unpublished until `approved` is set to `yes`.

## Senior Access

Each senior uses the enrollment number already present in the response sheet. Matching ignores spaces, punctuation, and letter case. The board still publishes only profiles whose `approved` column is `yes`.

Enrollment numbers are identifiers rather than strong passwords. Use institute login or OTP later if the board contains sensitive information.

## AI Cleanup

Do not put an AI API key in website JavaScript. If you want AI cleanup, put it inside Apps Script using Script Properties, then write cleaned results into `displayName`, `displayTagline`, `displaySkills`, and `displayPlace`. The website will automatically prefer those cleaned `display...` fields.

## Live Drive Resource Feed

Use this when the Resources tab should stay synced with Google Drive. File and folder renames in Drive will appear on the website after refresh because the site reads the Drive tree from this endpoint.

If Telegram should maintain the Drive folder, run the local bot from this repo. The website does not touch Telegram directly; it reads the updated Drive folder through this Apps Script feed.

Create a new Apps Script project, paste this, then deploy it as a Web App:

```js
const RESOURCE_ROOT_FOLDER_ID = '1DTSwGkV4_jniit6tv9svFZba1oa7DuUT';
function doGet() {
  const root = DriveApp.getFolderById(RESOURCE_ROOT_FOLDER_ID);
  const data = walkResourceFolder_(root, []);

  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function walkResourceFolder_(folder, path) {
  const items = [];
  const folders = folder.getFolders();

  while (folders.hasNext()) {
    const child = folders.next();
    items.push(...walkResourceFolder_(child, path.concat(child.getName())));
  }

  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const id = file.getId();
    const title = file.getName();
    const mimeType = file.getMimeType();
    const type = getResourceType_(title, mimeType);
    const program = path[0] || 'General';
    const academicYear = path[1] || 'Unsorted year';
    const semester = path[2] || 'General';
    const subject = path[3] || (semester === 'General' ? 'General' : 'Misc');
    const teacher = path[4] || '';

    items.push({
      program,
      academicYear,
      semester,
      subject,
      teacher,
      title,
      type,
      tags: buildResourceTags_(path, title, type),
      viewUrl: `https://drive.google.com/file/d/${id}/view`,
      downloadUrl: `https://drive.google.com/uc?export=download&id=${id}`
    });
  }

  return items.sort((a, b) =>
    [a.program, a.academicYear, a.semester, a.subject, a.teacher, a.title].join('\u0000')
      .localeCompare([b.program, b.academicYear, b.semester, b.subject, b.teacher, b.title].join('\u0000'))
  );
}

function getResourceType_(title, mimeType) {
  const lower = String(title || '').toLowerCase();
  const ext = lower.includes('.') ? lower.split('.').pop() : '';

  if (ext) return ext.toUpperCase();
  if (mimeType.includes('pdf')) return 'PDF';
  if (mimeType.includes('presentation')) return 'PPTX';
  if (mimeType.includes('document')) return 'DOCX';
  if (mimeType.includes('image')) return 'IMAGE';
  return 'FILE';
}

function buildResourceTags_(path, title, type) {
  const text = path.concat(title, type).join(' ').toLowerCase();
  const tags = new Set([...path, type]);

  if (/pyq|question|paper/.test(text)) tags.add('PYQ');
  if (/practical|lab|assignment/.test(text)) tags.add('Practical');
  if (/note|unit|lecture|book|ebook/.test(text)) tags.add('Notes');
  if (/ppt|slide/.test(text)) tags.add('Slides');
  if (/syllabus/.test(text)) tags.add('Syllabus');
  if (/calendar|schedule|timetable|tt|datesheet/.test(text)) tags.add('Schedule');

  return Array.from(tags).filter(Boolean);
}
```

Deploy settings:

- Execute as: Me
- Who has access: Anyone

Copy the Web App URL into `script.js`:

```js
const RESOURCE_FEED_ENDPOINT = 'PASTE_RESOURCE_WEB_APP_URL_HERE';
```

Make sure the Drive folder/files are shared with the students. The endpoint can list files because it runs as you, but students still need Drive permission to open the View and Download links.

## Telegram To Drive Bot

The bot uploads Telegram files/photos into the Resources Drive folder. After upload, the website picks them up through the Live Drive Resource Feed.

One-time Google setup:

1. Create a Google Cloud service account.
2. Enable the Google Drive API.
3. Create a JSON key for the service account.
4. Share the root `Resources` Drive folder with the service account email as Editor.

Telegram setup:

1. Create a bot with BotFather.
2. Copy the bot token.
3. Optional but recommended: get your Telegram chat/group ID and set it in `TELEGRAM_ALLOWED_CHAT_IDS`.

Run locally:

```sh
export TELEGRAM_BOT_TOKEN='PASTE_TELEGRAM_BOT_TOKEN'
export DRIVE_ROOT_FOLDER_ID='1DTSwGkV4_jniit6tv9svFZba1oa7DuUT'
export GOOGLE_SERVICE_ACCOUNT_FILE='/absolute/path/to/downloaded-service-account.json'
export TELEGRAM_ALLOWED_CHAT_IDS='123456789'
npm run bot
```

Usage in Telegram:

```text
/upload BTech-MTech/2025-26/SEM II/Cyber Law/Pragati Ma'am
```

Attach a PDF/PPT/DOC/image and put that command in the caption. The bot will create missing Drive folders automatically and upload the file there.

Examples:

```text
/upload BTech-MTech/2025-26/SEM I/Engineering Maths-I/Teacher Name
/upload BTech-MTech/2025-26/SEM II/PYQs
/upload BTech-MTech/2025-26/General
/upload BSc/2025-26/SEM II/Forensic/Mansi Ma'am
```

Website flow:

```text
Telegram file -> bot uploads to Drive -> Apps Script lists Drive -> Resources tab shows View/Download
```
