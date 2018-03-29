const music = require('../model/music');
const editReg = /^\/edit\/(\d{1,6})$/;

class Edit {
  edit (res, pathname, params) {
    let id = pathname.match(editReg)[1] - 0;
    let name = params.name;
    let singer = params.singer;
    let isHightRate = params.isHightRate;
    let musicList = music.getAllMusic();
    let flag = music.editMusicById(id,name,singer,isHightRate);

    // 修改完之后，直接跳转到首页
    // 301 重定向   永久重定向
    // 302 重定向   临时重定向
    res.writeHead(302, {
      'Location': flag ? '/' : '/edit' + id
    });
    // 即使只写了响应头，也一定要end
    return res.end();
  }
}

module.exports = new Edit();