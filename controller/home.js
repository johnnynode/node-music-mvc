'use strict';

const fs = require('fs');
const qstring = require('querystring');
const _ = require('underscore');
const removeReg = /^\/remove\/(\d{1,6})$/;
const editReg = /^\/edit\/(\d{1,6})$/;
const musicList = require('../server/mockData'); // 模拟首页假数据

// ------------------------ 首页对象 ------------------------
const Home = function() {};
Home.prototype = {
  render: render, // 渲染页面
  remove: remove, // 删除
  edit: edit, // 编辑功能,
  add: add, // 添加
  search: search // 搜索
};
module.exports = new Home();

// ------------------------ 工具函数 ------------------------
// 渲染主页
function render(res) {
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
}

// 删除功能
function remove(res, pathname) {
  let id = pathname.match(removeReg)[1] - 0;
  let index = musicList.findIndex(m => m.id === id);
  try {
    musicList.splice(index, 1);
    res.end(JSON.stringify({
      code: '1',
      msg: 'ok'
    }));
  } catch (e) {
    res.end(JSON.stringify({
      code: '0',
      msg: e.message
    }));
  }
}

// 编辑页面渲染
function edit(res, pathname, params) {
  let id = pathname.match(editReg)[1] - 0;
  let musicInfo = musicList.find(m => m.id === id);
  if (!musicInfo) {
    return res.end('music is not exists');
  }
  fs.readFile(__dirname + '/../views/edit.html', 'utf8', function (err, data) {
    if (err) {
      return res.end(err.message);
    }
    // 拿到数据之后，模板编译
    let compiled = _.template(data);
    let htmlStr = compiled({
      musicInfo
    });
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    res.end(htmlStr);
  });
}

// 添加页面渲染
function add(res, pathname, params) {
  res.writeHead(200,{
    'Content-Type':'text/html'
  });
  fs.createReadStream(__dirname + '/../views/add.html', 'utf8').pipe(res);
}

// 搜索功能的处理
function search(res, pathname, params) {
  let id = params.id - 0;

  // 查找
  let musicItem = null;
  let hasMusic = musicList.find((item, index)=>{
    if(item.id === id) {
      musicItem = item;
      return true;
    }
  });

  // 不存在音乐 返回 不存在
  if (!hasMusic) {
    return res.end('music is not exists');
  }

  // 存在音乐 返回 存在
  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.end(JSON.stringify(musicItem));
}