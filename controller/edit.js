'use strict';

const editReg = /^\/edit\/(\d{1,6})$/;
const musicList = require('../server/mockData'); // 模拟首页假数据

// ------------------------ 编辑页对象 ------------------------
var Edit = function() {};
Edit.prototype = {
  edit: edit // 提交功能
};
module.exports = new Edit();

// ------------------------ 工具函数 ------------------------

// 处理post请求
function edit(res, pathname, params) {
  let m_id = pathname.match(editReg)[1];
  let name = params.name;
  let singer = params.singer;
  let isHightRate = params.isHightRate;

  // 根据id查找数组中的索引
  let index = musicList.findIndex(m => m.id === m_id);

  musicList[index].name = name;
  musicList[index].singer = singer;
  musicList[index].isHightRate = isHightRate === '1';

  // 修改完之后，直接跳转到首页
  // 301 重定向   永久重定向
  // 302 重定向   临时重定向
  res.writeHead(302, {
    'Location': '/'
  });

  // 记住，哪怕只写了响应头，也一定要end
  return res.end();
}