'use strict';

const musicList = require('../server/mockData'); // 模拟首页假数据

// ------------------------ 编辑页对象 ------------------------
var Add = function() {};
Add.prototype = {
  add: add // 提交功能
};
module.exports = new Add();

// ------------------------ 工具函数 ------------------------

// add post 提交数据
function add(res, pathname, params) {
  let id = musicList[musicList.length - 1].id - 0 + 1;
  let name = params.name;
  let singer = params.singer;
  let isHightRate = params.isHightRate;
  isHightRate = !!isHightRate;

  musicList.push({
    id,
    name,
    singer,
    isHightRate
  });
  
  res.writeHead(302, {
    'Location': '/'
  });
  res.end();
}