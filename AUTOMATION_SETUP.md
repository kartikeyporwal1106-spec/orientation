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
const ACCESS_CODES_SHEET = 'Access Codes';

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

function ensureAccessCodesSheet() {
  const spreadsheet = SpreadsheetApp.getActive();
  let sheet = spreadsheet.getSheetByName(ACCESS_CODES_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(ACCESS_CODES_SHEET);
    sheet.appendRow(['code', 'expiresAt', 'usedAt']);
  }
  return sheet;
}

function createAccessCode(minutes) {
  const sheet = ensureAccessCodesSheet();
  const code = Utilities.getUuid().slice(0, 8).toUpperCase();
  const expiresAt = new Date(Date.now() + (Number(minutes) || 30) * 60 * 1000);
  sheet.appendRow([code, expiresAt, '']);
  Logger.log('UPSIFS senior access code: ' + code);
  return code;
}

function verifyAccessCode(code) {
  if (!code) return false;
  const sheet = ensureAccessCodesSheet();
  const rows = sheet.getDataRange().getValues();
  const cleanCode = String(code).trim().toUpperCase();
  const now = new Date();

  for (let index = 1; index < rows.length; index += 1) {
    const rowCode = String(rows[index][0] || '').trim().toUpperCase();
    const expiresAt = rows[index][1];
    const usedAt = rows[index][2];
    const isExpired = expiresAt instanceof Date && expiresAt < now;
    if (rowCode === cleanCode && !usedAt && !isExpired) {
      sheet.getRange(index + 1, 3).setValue(now);
      return true;
    }
  }

  return false;
}

function doGet(e) {
  if (!verifyAccessCode(e.parameter.code)) {
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

## Access Codes

Create one-time codes from Apps Script:

1. Select `createAccessCode` from the function dropdown.
2. Click Run.
3. Open View > Logs.
4. Share the logged code with the student/group.

Default expiry is 30 minutes. To create a longer code, run this from Apps Script console:

```js
createAccessCode(120)
```

The code is consumed on first successful unlock. The current browser tab keeps the board loaded, but a refresh needs a new code.

For updates, compare enrollment number and WhatsApp before approving. A full identity check needs official login or OTP, but one-use codes plus manual approval keep the details out of the frontend source and stop random public viewing.

## AI Cleanup

Do not put an AI API key in website JavaScript. If you want AI cleanup, put it inside Apps Script using Script Properties, then write cleaned results into `displayName`, `displayTagline`, `displaySkills`, and `displayPlace`. The website will automatically prefer those cleaned `display...` fields.
