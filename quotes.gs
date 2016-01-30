var access_token = "";
var url = "https://graph.facebook.com/v2.5/CytatyNauczycieliZVLoWGdansku/feed?access_token="+access_token+"&limit=100";
var quotesSheet = SpreadsheetApp.openById("12EDue1V28Tr1AUtiJkmpd9WKP7A5cABCWgkil6VZw30").getSheets()[0];

function update() {
  var resp = UrlFetchApp.fetch(encodeURI(url));
  if(resp.getResponseCode()!=200) {
    Logger.log("Couldn't connect to facebook graph api");
    return;
  }
  var quotes = JSON.parse(resp.getContentText());
  for(var quoteIndex in quotes.data) {
    var quote = quotes.data[quoteIndex];
    if(!isQuotePresent(quote.id)) {
      quotesSheet.appendRow([quote.message, quote.created_time, quote.id, false]);
    } else {
      //If quote was found that means it's all up to date.
      return;
    }
  }
}

function isQuotePresent(id) {
  //Yup, slow as ....
  for(var i=quotesSheet.getLastRow();i>1;i--) {
    if(quotesSheet.getRange(i, 3).getValue() == id) {
      return true;
    }
  }
  return false;
}

function getRandomQuote() {
  var row = [null,null,null,true];
  while(row[3]) {
    row = quotesSheet.getRange(Math.floor(Math.random()*(quotesSheet.getLastRow()-2))+2, 1, 1, 4).getValues()[0];
  }
  var response = {update: new Date().getTime(), quote: {
    message: row[0],
    time: row[1],
    id: row[2]
  }};
  return JSON.stringify(response);
}
