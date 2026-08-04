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

function doGet() {
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

For updates, compare enrollment number and WhatsApp before approving. A full identity check needs login or OTP, but this keeps the workflow lightweight and prevents random frontend changes from going live.
