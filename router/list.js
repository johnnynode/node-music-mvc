'use strict';

const homeCtrl = require('../controller/home');
const editCtrl = require('../controller/edit');
const addCtrl = require('../controller/add');

// 定义路由列表
const List = function () {};
List.prototype = {
  // 首页的处理
  '/': (res)=>{
    homeCtrl.render(res);

  },
  // 首页删除功能的处理
  '/remove': (res, pathname)=>{
    homeCtrl.remove(res, pathname);
  },
  // 编辑的处理 如： /edit/1
  '/edit': (res, pathname, params, method) => {
    if(method === 'GET') {
      return homeCtrl.edit(res, pathname, params);
    }
    if(method === 'POST') {
      editCtrl.edit(res, pathname, params);
    }
  },
  // 添加的处理
  '/add' : (res, pathname, params, method) => {
    if(method === 'GET') {
      return homeCtrl.add(res, pathname, params);
    }
    if(method === 'POST') {
      return addCtrl.add(res, pathname, params);
    }
  },
  // 搜索的处理
  '/search' : (res, pathname, params) => {
    homeCtrl.search(res, pathname, params);
  }
}

// 获取自身全部路由列表
const routerAttrList = Object.getOwnPropertyNames(List.prototype); 

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