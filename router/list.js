'use strict';

var handler = require('./handler');

var List = function () {};
var ltp = List.prototype = {};


// 以assets开头的
ltp["/"] = handler.home; // 首页的路由
ltp["/list"] = handler.list;
ltp["/detail"] = handler.detail;

module.exports = new List();