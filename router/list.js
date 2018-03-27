'use strict';

var handler = require('./handler');

var List = function () {};
var ltp = List.prototype = {};

ltp["/"] = handler.home;
ltp["/list"] = handler.list;
ltp["/detail"] = handler.detail;

module.exports = new List();