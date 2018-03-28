var querystring = require('querystring');
var url = require('url');

var handleMethod = function (req,data,callback) {
  switch(req.method) {
    case "GET":
      var query = url.parse(req.url, true).query; // true json, false string here
      callback(query);
      break;
    case "POST":
      // too much data, close connection
      if(data.length > 1e6) {
        return req.connection.destroy();
      }
      data = Buffer.concat(data).toString();
      var params = querystring.parse(data);
      callback(params);
      break;
      // other method here to be handled
  }
}

var handler = (req,callback)=>{
  var data = [];
  req.on("error", function(err) {
      return console.error(err);
  }).on("data", function(chunk) {
      data.push(chunk);
  }).on('end', function() {
    handleMethod(req,data,callback);
  });
};

module.exports = handler;