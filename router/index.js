var fs = require('fs');
var url = require('url');
var list = require('./list');

var router = function (req, res, params) {
  var pathname = url.parse(req.url).pathname;
  var item = list[pathname];

  if (typeof item === 'function') {
    return item(res, params);
  } 
  
  res.writeHead(404, { 'Content-Type': 'text/html' });
  fs.createReadStream(__dirname + '/../views/404.html', 'utf8').pipe(res);
};

module.exports = router;