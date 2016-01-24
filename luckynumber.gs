//Google forms can't be protected, so we decided to add additional password field
var password = "";
var sheet = SpreadsheetApp.openById("10RW_TNyLvqrueEiBxcmob4SbJEsJU9S5UWpG6Tj6a1I").getSheets()[0];

//timestamp,number,password
function getLuckyNumber() {
  for (var i = sheet.getLastRow(); i > 0; i--) {
    var range = sheet.getRange(i, 1, 1, 3).getValues();
    if (range[0][2] != password) {
      continue;
    }
    return JSON.stringify({
      date: new Date(range[0][0]).getTime(),
      number: parseInt(range[0][1])
    });
  }
}
