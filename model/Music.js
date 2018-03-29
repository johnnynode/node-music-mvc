'use strict';

const musicList = [
  {
    id: 1,
    name: 'music1',
    singer: 'singer1',
    isHightRate: true
  },
  {
    id: 2,
    name: 'music2',
    singer: 'singer2',
    isHightRate: false
  },
  {
    id: 3,
    name: 'music3',
    singer: 'singer3',
    isHightRate: true
  },
  {
    id: 4,
    name: 'music4',
    singer: 'singer4',
    isHightRate: true
  },
  {
    id: 5,
    name: 'music5',
    singer: 'singer5',
    isHightRate: false
  }
];

const Music = function(id, name, singer, isHightRate){
  this.id = id;
  this.name = name;
  this.singer = singer;
  this.isHightRate = isHightRate;
};
Music.prototype = {
  // 获取所有音乐
  getAllMusic:function () {
    return musicList;
  },
  // 添加一首音乐
  addMusic:function(name, singer, isHightRate) {
    let id = musicList[musicList.length - 1].id - 0 + 1;
    let json = {
      id,
      name,
      singer,
      isHightRate
    };
    musicList.push(json);
  },
  // 编辑一首音乐
  editMusicById:function (id, name, singer, isHightRate) {
    // 根据id查找数组中的索引
    let index = musicList.findIndex(m => m.id === id);
    if(index === -1) {
      return false;
    }
    musicList[index].name = name;
    musicList[index].singer = singer;
    musicList[index].isHightRate = isHightRate === '1';
    return true;
  },
  // 通过id删除音乐
  removeMusicById:function (id) {
    let index = musicList.findIndex(m => m.id === id);
    if(index === -1) {
      return false;
    }
    musicList.splice(index, 1);
    return true;
  },
  // 通过id查询音乐
  getMusicById:function (id) {
    return musicList.find(item => {item.id === id});
  }

}