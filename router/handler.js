var fs = require('fs');
const qstring = require('querystring');
const _ = require('underscore');

const musicList = require('../server/mockData');

var Hander = function () {}
var hdp = Hander.prototype = {};

// 首页
hdp.home = (res) => {
  res.writeHead(200,{
    'Content-Type':'text/html'
  });

  // 读取文件
  fs.readFile(__dirname + '/../views/index.html', 'utf8', function (err, data) {
    if (err) {
      return res.end(err.message);
    }
    // 结合模板引擎渲染数据
    let compiled = _.template(data);
    let htmlStr = compiled({
      musicList
    });
    // 将完整的html字符串响应给客户端
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    // 返回给前台
    res.end(htmlStr);
  });

  // fs.createReadStream(__dirname + '/../views/index.html', 'utf8').pipe(res);
}

// 列表页
hdp.list = (res,params) => {
  console.log('params');
  console.log(params);

  res.writeHead(200,{
    'Content-Type':'text/html'
  });

  // fs.createReadStream(__dirname + '/../views/list.html', 'utf8').pipe(res);
}

// 详情页
hdp.detail = (res, params) => {
  console.log('detail params');
  console.log(params);
  res.writeHead(200,{
    'Content-Type':'text/html'
  });
  fs.createReadStream(__dirname + '/../views/detail.html', 'utf8').pipe(res);
}

// post 测试页
hdp.post = (res) => {
  res.writeHead(200,{
    'Content-Type':'text/html'
  });
  fs.createReadStream(__dirname + '/../views/post.html', 'utf8').pipe(res);
}

module.exports = new Hander();