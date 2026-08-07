const SHEET_NAME = 'Freshers Guidance Website (Responses)';
const ENROLLMENT_COLUMN_INDEX = 4; // Column D (1-indexed)

// Helper function to normalize enrollment numbers
function normalizeEnrollment(value) {
  return String(value || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
}

// Handles the GET request when a senior tries to unlock the board
function doGet(e) {
  try {
    const code = e.parameter.code || '';
    if (!code) {
      return ContentService.createTextOutput(JSON.stringify({ error: "No code provided" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const normalizedCode = normalizeEnrollment(code);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({ error: "Sheet not found: " + SHEET_NAME }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getDataRange().getValues();
    if (data.length < 2) {
      return ContentService.createTextOutput(JSON.stringify({ error: "Sheet is empty" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const headers = data[0];
    const rows = data.slice(1);
    
    // Check if the provided code exists in the enrollment column
    let isAuthorized = false;
    for (let i = 0; i < rows.length; i++) {
      const rowEnrollment = normalizeEnrollment(rows[i][ENROLLMENT_COLUMN_INDEX - 1]);
      if (rowEnrollment === normalizedCode) {
        isAuthorized = true;
        break;
      }
    }
    
    if (!isAuthorized) {
      return ContentService.createTextOutput(JSON.stringify({ error: "Enrollment number not found or senior board endpoint is not ready." }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // If authorized, return all profiles as JSON array of objects
    const result = rows.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handles the POST request when a senior submits an updated profile
function doPost(e) {
  try {
    let payload;
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else {
      payload = e.parameter;
    }
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (!sheet) throw new Error("Sheet not found");
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Map the incoming payload to the spreadsheet columns
    const newRow = headers.map(header => {
      return payload[header] !== undefined ? payload[header] : "";
    });
    
    sheet.appendRow(newRow);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Automatically normalizes the enrollment number if you manually edit Column D in the sheet
function onEdit(e) {
  if (!e || !e.range) return;
  const sheet = e.range.getSheet();
  if (sheet.getIndex() !== 1) return; // Only run on the first sheet
  
  if (e.range.getColumn() === ENROLLMENT_COLUMN_INDEX) {
    const value = e.value || '';
    const normalized = normalizeEnrollment(value);
      
    if (value !== normalized) {
      e.range.setValue(normalized);
    }
  }
}

// Run this manually from the Apps Script editor to clean up all old enrollment numbers in one go
function normalizeAllEnrollments() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (!sheet) return;
  
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  
  const range = sheet.getRange(2, ENROLLMENT_COLUMN_INDEX, lastRow - 1, 1);
  const values = range.getValues();
  
  let changed = false;
  const newValues = values.map(row => {
    const val = String(row[0] || '');
    const normalized = normalizeEnrollment(val);
      
    if (val !== normalized) {
      changed = true;
    }
    return [normalized];
  });
  
  if (changed) {
    range.setValues(newValues);
  }
}
