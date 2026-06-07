const SHEET_NAME = 'Messages';

function doPost(event) {
  const sheet = getMessageSheet_();
  const params = event && event.parameter ? event.parameter : {};

  sheet.appendRow([
    new Date(),
    clean_(params.email),
    clean_(params.company),
    clean_(params.message),
    clean_(params.page),
    clean_(params.submittedAt),
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'portfolio-messages' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getMessageSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Received At', 'Email', 'Company', 'Message', 'Page', 'Submitted At']);
  }

  return sheet;
}

function clean_(value) {
  return String(value || '').trim();
}
