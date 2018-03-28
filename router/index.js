var fs = require('fs');
var url = require('url');
var list = require('./list');
var staticServer = require('./static');

var num = 0;
var router = function (req, res, params) {
  var pathname = url.parse(req.url).pathname;
  console.log('--------pathname--------');
  console.log(++num);
  console.log(pathname);
  console.log('------------------------');

  // 关于静态文件服务器的判断
  if(pathname.startsWith('/assets/')) {
    return staticServer(res, pathname);
  }

  var itemRouter = list[pathname];
  // 如果定义了相应的路由，就执行路由
  if (typeof itemRouter === 'function') {
    return itemRouter(res, params);
  } 
  
  // 没定义路由，那么返回404页面
  res.writeHead(404, { 'Content-Type': 'text/html' });
  fs.createReadStream(__dirname + '/../views/404.html', 'utf8').pipe(res);
};

module.exports = router;