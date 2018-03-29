const fs = require('fs');
const qstring = require('querystring');
const _ = require('underscore');
const music = require('../model/music');
const removeReg = /^\/remove\/(\d{1,6})$/;
const editReg = /^\/edit\/(\d{1,6})$/;

class Home {
  // 渲染功能
  render(res) {
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
      let musicList = music.getAllMusic(); // 通过model获取所有数据
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
  // 移除功能
  remove(res, pathname) {
    let id = pathname.match(removeReg)[1] - 0;
    let flag = music.removeMusicById(id);
    if(flag) {
      // 删除成功
      res.end(JSON.stringify({
        code: '1',
        msg: 'ok'
      }));
    } else {
      // 删除失败
      res.end(JSON.stringify({
        code: '0',
        msg: 'not found'
      }));
    }
  }
  // 跳转到编辑页功能
  edit(res, pathname, params) {
    let id = pathname.match(editReg)[1] - 0;
    let musicList = music.getAllMusic(); // 通过model获取所有数据
    var musicInfo = music.getMusicById(id);
    if(!musicInfo) {
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
  // 跳转到添加页功能
  add (res, pathname, params) {
    res.writeHead(200,{
      'Content-Type':'text/html'
    });
    fs.createReadStream(__dirname + '/../views/add.html', 'utf8').pipe(res);
  }
  // 搜索功能
  search (res, pathname, params) {
    let id = params.id - 0;
    let musicInfo = music.getMusicById(id);
    // 不存在音乐 返回 不存在
    if (!musicInfo) {
      return res.end('music is not exists');
    }
    // 存在音乐 返回 存在
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(musicInfo));
  }
}

module.exports = new Home();