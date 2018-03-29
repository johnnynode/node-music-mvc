const http = require('http');
const url = require('url');
const querystring = require('querystring');
const router = require('../router');

// switch method
function handleMethod (req, data, callback) {
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
    case "DELETE":
      var query = url.parse(req.url, true).query; // true json, false string here
      callback(query);
      break;
    // other method here to be handled // todo
    
  }
}

// 处理http请求流
function handler(req,callback) {
  var data = [];
  req.on("error", function(err) {
      return console.error(err);
  }).on("data", function(chunk) {
      data.push(chunk);
  }).on('end', function() {
    handleMethod(req,data,callback);
  });
}

// 服务器开始
const start = function () {
  var server = http.createServer((req, res)=>{
    handler(req, (params)=>{
      router(req, res, params);
    });
  });
  server.listen('3000','127.0.0.1', ()=>{
    console.log('server is running on port 3000');
  });
}

module.exports.start = start;