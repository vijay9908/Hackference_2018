var zac_bot_token = "this key is Private";
var zac_url = "https://api.telegram.org/bot" + zac_bot_token;



var webAppUrl = "https://script.google.com/a/zachariasmanuel.com/macros/d/1Yl2agFLZiGftbmNkqCsCTeTgTBQ3n0dsVZXD30jZ_ms/edit#gid=0";

var ssID = 'AIzaSyA80c7BS0KnnJpaTpZJvY-lHzmDPyjm_Go';

function setWebhook() {
  var response = UrlFetchApp.fetch(zac_url + "/setWebhook?url=" + webAppUrl);
  Logger.log(response.getContentText()); 
}

function doGet (e){
  return HtmlService.createHtmlOutput("Hello " + JSON.stringify(e));
}

function doPost (e){
 
  var contents = JSON.parse(e.postData.contents);
  var text = contents.message.text;
  var id = contents.message.from.id;
  
  
  if(text.split(' ')[0] === 'save'){
    var split = text.split(/ (.+)/)[1];
    addDataToSpreadsheet(split, id);
  }
  else if(text.split(' ')[0] === 'get'){
    getDataFromSpreadsheet(id)
    
  }
}
function getDataFromSpreadsheet(id){
  var sss = SpreadsheetApp.openById(ssID);
  var ss = sss.getSheetByName('TelegramData');
  var range = ss.getDataRange();
  var data = range.getValues();
  finalData = "Data from spreadsheet: %0A";
  for (var i = 0; i< data.length ; i++){
    finalData = finalData+data[i][0]+"%0A";
  }
 
  UrlFetchApp.fetch(zac_url + "/sendMessage?chat_id=" + id + "&text="+finalData);
  
}

function addDataToSpreadsheet(data, id){
  var ss = SpreadsheetApp.openById(ssID);
  ss.getSheetByName('TelegramData').appendRow([data]);
  UrlFetchApp.fetch(zac_url + "/sendMessage?chat_id=" + id + "&text=Data saved");
}
