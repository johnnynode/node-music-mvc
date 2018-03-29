'use strict';

var homeCtrl = require('../controller/home');

// 定义路由列表
var List = function () {};
List.prototype = {
  // 首页的处理
  '/': (res)=>{
    homeCtrl.render(res);

  },
  // 删除的处理
  '/remove': (res,pathname)=>{
    homeCtrl.remove(res, pathname);
  }
}

// 获取自身全部路由列表
var routerAttrList = Object.getOwnPropertyNames(List.prototype); 

// 对路由的判断
function isRouter(pathname) {
  return routerAttrList.find((item, index)=>{
    // 如果匹配，把当前定义的路由返回
    if(pathname === item || pathname.startsWith(item) && (item !== '/')) {
      return item;
    }
  });
}

module.exports = {
  isRouter,
  routerAttrList,
  list: new List()
};