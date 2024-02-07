const { google } = require('googleapis');
const keys = require('/Users/carterjackson/Documents/Media Collection Project/media-collection-413218-394182a92376.json');

// Create a new JWT client using the keys file
const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

// Authorize the client
client.authorize(function(err, tokens) {
  if (err) {
    console.log('Error authorizing client:', err);
    return;
  }
  console.log('Client authorized');

  const sheets = google.sheets({ version: 'v4', auth: client });

  let sheetData = [];
  
  sheets.spreadsheets.values.get({
    spreadsheetId: '1IGWqLsuUsk8TCD_Jf2O6K6xGhgRJlmBplg8dx3WVbT4',
    range: 'Sheet1!A:G',
  }, (err, res) => {
    if (err) return console.log('The API returned an error:', err);
    const rows = res.data.values;
    if (rows.length) {
      const headers = rows[0].map(header => header.trim());
      sheetData = rows.slice(1).map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          const key = header;
          obj[key] = row[index];
        });
        return obj;
      });
      // console.log('Data retrieved:', sheetData);

      // Export the sheetData after it's populated
      module.exports = sheetData;
    } else {
      console.log('No data found.');
    }
  });
});
