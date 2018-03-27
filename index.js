"use strict";

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const qstring = require('querystring');
const _ = require('underscore');

const musicList = [
  {
    id: '1',
    name: 'music1',
    singer: 'singer1',
    isHightRate: true
  },
  {
    id: '2',
    name: 'music2',
    singer: 'singer2',
    isHightRate: false
  },
  {
    id: '3',
    name: 'music3',
    singer: 'singer3',
    isHightRate: true
  },
  {
    id: '4',
    name: 'music4',
    singer: 'singer4',
    isHightRate: true
  },
  {
    id: '5',
    name: 'music4',
    singer: 'singer4',
    isHightRate: false
  }
];

// 用来匹配删除链接的url
const regex_remove = /^\/remove\/(\d{1,6})$/;
const regex_edit = /^\/edit\/(\d{1,6})$/;

const server = http.createServer((req, res) => {

  let urlObj = url.parse(req.url);

  let pathname = urlObj.pathname;

  let method = req.method;

  if (pathname === '/') {

    fs.readFile('./index.html', 'utf8', function (err, data) {
      if (err) {
        return res.end(err.message);
      }

      let compiled = _.template(data);

      let htmlStr = compiled({
        musicList
      });

      // 将完整的html字符串响应给客户端
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });

      res.end(htmlStr);

    });

  } else if (method === 'GET' && pathname === '/add') {

    fs.readFile('./add.html', 'utf8', function (err, data) {
      if (err) {
        return res.end(err.message);
      }
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });

      res.end(data);
    });

  } else if (method === 'POST' && pathname === '/add') {

    recivePostData(req, function (requestBody) {
      let id = requestBody.id;
      let name = requestBody.name;
      let singer = requestBody.singer;
      let isHightRate = requestBody.isHightRate;

      let musicInfo = musicList.find(m => m.id === id);

      if (musicInfo) {
        return res.end('music is already exists');
      }

      isHightRate = isHightRate === '1' ? true : false;

      musicList.push({
        id,
        name,
        singer,
        isHightRate
      });

      res.writeHead(302, {
        'Location': 'http://127.0.0.1:3000'
      });

      res.end();

    });

  } else if (method === 'GET' && regex_remove.test(pathname)) {

    let m_id = pathname.match(regex_remove)[1];

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


  } else if (method === 'GET' && regex_edit.test(pathname)) {

    let m_id = pathname.match(regex_edit)[1];

    // 根据音乐信息id找到该项
    let musicInfo = musicList.find(m => m.id === m_id);

    // 如果用户要编辑的
    if (!musicInfo) {
      return res.end('music is not exists');
    }

    fs.readFile('./edit.html', 'utf8', function (err, data) {
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

  } else if (method === 'POST' && regex_edit.test(pathname)) {

    recivePostData(req, function (body) {

      let m_id = pathname.match(regex_edit)[1];

      let name = body.name;
      let singer = body.singer;
      let isHightRate = body.isHightRate;

      // 你要编辑谁？
      // 根据id查找数组中的索引
      let index = musicList.findIndex(m => m.id === m_id);

      musicList[index].name = name;
      musicList[index].singer = singer;
      musicList[index].isHightRate = isHightRate === '1' ? true : false;

      // 修改完之后，直接跳转到首页
      // 301 重定向   永久重定向
      // 302 重定向   临时重定向

      res.writeHead(302, {
        'Location': 'http://127.0.0.1:3000'
      });

      // 记住，哪怕只写了响应头，也一定要end
      res.end();

    });

  } else if (pathname === '/www/vender/jquery/dist/jquery.js') {
    fs.readFile('./www/vender/jquery/dist/jquery.js', function (err, data) {
      if (err) {
        return res.end(err.message);
      }
      res.writeHead(200, {
        'Content-Type': 'application/x-javascript; charset=utf8'
      });
      res.end(data);
    });
  }


});

server.listen(3000, '127.0.0.1', function () {
  console.log('server is listening ar port 3000');
});

function recivePostData(request, callback) {
  let data = '';
  request.on('data', function (chunk) {
    data += chunk;
  });

  request.on('end', function () {
    callback(qstring.parse(data));
  });
}
