'use strict';

const music = require('../model/music');

// ------------------------ 添加页对象 ------------------------

class Add {
  add(res, pathname, params) {
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
}

module.exports = new Add();
