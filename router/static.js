// 处理静态文件服务器
'use strict';
var fs = require('fs');

var staticServer = function (res, pathname) {
  fs.readFile(__dirname + '/..' + pathname, 'utf8', function (err, data) {
    if (err) {
      return res.end(err.message);
    }
    // 将完整的html字符串响应给客户端
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    // 返回给前台
    res.end(data);
  });
}

module.exports = staticServer;