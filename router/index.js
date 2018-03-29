const fs = require('fs');
const url = require('url');
const routerList = require('./list');
const staticServer = require('../server/static'); // 静态文件服务器

const router = function (req, res, params) {
  let pathname = url.parse(req.url).pathname;
  // 关于静态文件服务器的判断
  if(pathname.startsWith('/assets/')) {
    return staticServer(res, pathname);
  }
  // 得到是否存在定义的路由
  let routerItem = routerList.isRouter(pathname);
  // 如果定义了该路由，那么执行定义路由的回调函数
  if(routerItem) {
    return routerList.list[routerItem](res, pathname, params, req.method); 
  }
  // 没定义路由，那么返回404页面
  res.writeHead(404, { 'Content-Type': 'text/html' });
  fs.createReadStream(__dirname + '/../views/404.html', 'utf8').pipe(res);
};

module.exports = router;