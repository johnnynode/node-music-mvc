// 处理静态文件服务器

const fs = require('fs');
const path = require('path');
const mime = require('mime');

const staticServer = function (res, pathname) {
  fs.readFile(__dirname + '/..' + pathname, 'utf8', function (err, data) {
    if (err) {
      return res.end(err.message);
    }
    // 读取文件，解析json，然后根据对应的扩展名，找到对应的mime Content-Type
    let mimeType = mime.getType(pathname);
    // 处理 text
    if (mimeType.startsWith('text/')) {
        mimeType += '; charset=utf-8';
    }
    res.writeHead(200, {
        'Content-Type': mimeType
    });
    res.end(data);
  });
}

module.exports = staticServer;