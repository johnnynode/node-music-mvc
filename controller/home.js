'use strict';

var fs = require('fs');
const qstring = require('querystring');
const _ = require('underscore');
const removeReg = /^\/remove\/(\d{1,6})$/;
const musicList = require('../server/mockData'); // 模拟首页假数据

// ------------------------ 构造函数 ------------------------
var Home = function() {};
Home.prototype = {
  render: render, // 渲染页面
  remove: remove // 删除
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
  let m_id = pathname.match(removeReg)[1];
  let index = musicList.findIndex(m => m.id === m_id);
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

