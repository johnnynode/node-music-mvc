// 处理静态文件服务器
'use strict';
var fs = require('fs');
var path = require('path');

// 通过请求的后缀名来返回不同的 contentType
function getContentTypeByExtName(extName, callback) {
    fs.readFile((__dirname + '/mime.txt'), 'utf8', (err, data) => {
        if (err) {
            return callback(err, null);
        }
        try {
            let jsonObj = JSON.parse(data); // 解析出txt数据
            callback(null, jsonObj[extName] ? jsonObj[extName] : 'text/plain');
        } catch (e) {
            callback(e, null);
        }
    });
}

var staticServer = function (res, pathname) {
  fs.readFile(__dirname + '/..' + pathname, 'utf8', function (err, data) {
    if (err) {
      return res.end(err.message);
    }

    // 读取文件，解析json，然后根据对应的扩展名，找到对应的mime Content-Type
    getContentTypeByExtName(path.extname(pathname), (err, mime) => {
      if (err) {
          return res.end(err.message);
      }

      // 向客户端发送数据类型的时候，要设置 content-Type
      res.writeHead(200, {
          'Content-Type': mime
      });

      // 返回给前台
      res.end(data); // 发送数据，结束响应
    });
  });
}

module.exports = staticServer;