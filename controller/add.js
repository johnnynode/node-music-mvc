'use strict';

const music = require('../model/music');

// ------------------------ 编辑页对象 ------------------------
const Add = function() {};
Add.prototype = {
  add: add // 提交功能
};
module.exports = new Add();

// ------------------------ 工具函数 ------------------------

// add post 提交数据
function add(res, pathname, params) {
  let name = params.name;
  let singer = params.singer;
  let isHightRate = params.isHightRate;
  isHightRate = !!isHightRate;
  var flag = music.addMusic(name, singer, isHightRate);
  res.writeHead(302, {
    'Location': flag ? '/' : '/add'
  });
  res.end();
}