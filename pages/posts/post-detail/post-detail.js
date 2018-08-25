var postsData = require("../../../data/posts-data.js");
var app = getApp();
Page({
  data:{
     isPlay:false
  },
  onLoad:function(option){
     var postId = option.id;
     // var globalData = app.globalData.g_isplay;
     //this.data.currentPostId = postId;
     this.setData({currentPostId:postId});
     var postData = postsData.postList[postId];
     this.setData({postData:postData});

     // wx.setStorageSync('key',"英雄");
     // wx.setStorageSync('key',{
     //    game:'英雄'
     // })
     // var postsCollected = {
     //   1:'true',
     //   2:'false',
     //   3:'true'
     // }
     // wx.clearStorageSync('key')
     if(!wx.getStorageSync('posts_collected')){
       wx.setStorageSync('posts_collected',{
           0:"true",
           1:"false",
           2:"true",
           3:"false",
           4:"true"
       });
     }
       var postsCollected = wx.getStorageSync('posts_collected');
       var postColected = postsCollected[postId];
       this.setData({
         collected:postColected
       });
       console.log(app);
       if( app.globalData.g_isplay && app.globalData.g_curr === postId ){
          this.setData({isPlay:true});
       }else{
          this.setData({isPlay:false});
       }
       var self = this;
       wx.onBackgroundAudioPlay(function(){
           self.setData({isPlay:true});
           app.globalData.g_isplay = true;
           app.globalData.g_curr = self.data.currentPostId;
       });
       wx.onBackgroundAudioPause(function(){
           self.setData({isPlay:false});
           app.globalData.g_isplay = false;
           app.globalData.g_curr = null;
       });
       wx.onBackgroundAudioStop(function(){
           self.setData({isPlay:false});
           app.globalData.g_isplay = false;
           app.globalData.g_curr = null;
       });
  },
  onCollectionTap:function(event){
     // var key = wx.getStorageSync('key');
     // console.log(key)
     // console.log(event);
     var self = this;
     wx.showModal({
          title: '收藏',
          content: '确定收藏吗?',
          success: function(res) {
            if (res.confirm) {
              self.update(null,"收藏成功");
            } else if (res.cancel) {
              console.log('取消收藏');
            }
          }
        });
  },
  update:function(event,message){
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    //更新图片的缓存值
    wx.setStorageSync('posts_collected',postsCollected);
    //更新数据绑定，切换图片
    this.setData({
      collected:postCollected
    });
    //console.log(message,typeof message);
    wx.showToast({
      title: message,
      icon: 'success',
      duration: 1000
    });
  },
  onCancelCollectionTap:function(event){
    var self = this;
    wx.showModal({
          title: '取消收藏',
          content: '确定取消收藏吗?',
          success: function(res) {
            if (res.confirm) {
              self.update(null,"取消收藏成功");
            } else if (res.cancel) {
              console.log('取消收藏');
            }
          }
        });
  },
  onShareTap:function(event){
    // wx.removeStorageSync("key");
    // wx.clearStorageSync();
    var itemList = [
      "分享给微信1",
      "分享到微信2",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
         itemList:itemList,
         itemColor:"#ed5210",
         success:function(res){
            //res.onCancel用户是不是点击了取消
            //res.tapIndex数组元素
            wx.showModal({
                title:"用户"+itemList[res.tapIndex],
                content:"现在还不能分享功能"
            });
         }
    });
  },
  onShareAppMessage:function(){
     console.log(this);
      return{
         title:this.data.postData.title,
         desc:this.data.postData.detail.substr(0,30),
         path:'/pages/posts/post-detail/post-detail'
      };
  },
  onMusicTap:function(event){
      var isPlay = this.data.isPlay;
      var curr = postsData.postList[this.data.currentPostId];
      if(isPlay){
          wx.pauseBackgroundAudio();
          this.setData({
             isPlay:false
          })
      }else{
        wx.playBackgroundAudio({
            dataUrl:curr.music.url,
            title:curr.music.title,
            coverImgUrl:curr.music.coverImg
        });
        this.setData({
            isPlay:true
        });
      }
  }
});
