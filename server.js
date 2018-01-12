var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/timestamp/:date_string?", (req, res, next) => {
  var timeStamp ={
    "unix": Number,
    "utc": String
  };
  var date_string = req.params.date_string;
  var result = {};

  if (date_string == undefined) {
    var date = new Date();
    timeStamp["unix"] = date.getTime();
    timeStamp["utc"] = date.toUTCString();
    result = timeStamp;
  } else if (new Date(date_string) != "Invalid Date") {
      timeStamp["unix"] = new Date(date_string).getTime();
      timeStamp["utc"] = new Date(date_string).toUTCString();
      result = timeStamp;    
  } else if (new Date(parseInt(date_string)) != "Invalid Date") {
      timeStamp["unix"] = parseInt(date_string);
      timeStamp["utc"] = new Date(parseInt(date_string)).toUTCString();
      result = timeStamp;  
  } else {
      result = {"error" : "Invalid Date" };
  }
  res.json(result);
  next();
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
