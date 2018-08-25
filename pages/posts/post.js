var postsData = require("../../data/posts-data.js");
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  onLoad:function(options){
     console.log(options,"onload",this);
     // var post_content = [{
     //      date:'Sep 18 2018',
     //      title:"正是虾肥强壮时候",
     //      authorimage:"/images/avatar/3.png",
     //      image:"/images/post/cat.png",
     //      content:"橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，",
     //      collectNum:'99',
     //      viewNum:'88'
     // },{
     //      date:'Sep 18 2018',
     //      title:"正是虾肥强壮时候",
     //      authorimage:"/images/avatar/1.png",
     //      image:"/images/post/cat.png",
     //      content:"橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，",
     //      collectNum:'99',
     //      viewNum:'88'
     // },{
     //      date:'Sep 18 2018',
     //      title:"正是虾肥强壮时候",
     //      authorimage:"/images/avatar/2.png",
     //      image:"/images/post/cat.png",
     //      content:"橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，",
     //      collectNum:'99',
     //      viewNum:'88'
     // },{
     //      date:'Sep 18 2018',
     //      title:"正是虾肥强壮时候",
     //      authorimage:"/images/avatar/5.png",
     //      image:"/images/post/cat.png",
     //      content:"橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，橘黄蟹正肥，品尝秋之味，",
     //      collectNum:'99',
     //      viewNum:'88'
     // }];
     this.setData( {post_key:postsData.postList} );
  },
  onPostTap:function(event){
    var postid = event.currentTarget.dataset.postid;
    // console.log(postid);
    wx.navigateTo({
      url:"post-detail/post-detail?id="+postid
    })
  },
  onSwiperItemTap:function(event){
    var postid = event.currentTarget.dataset.postid;
    // console.log(postid);
    wx.navigateTo({
      url:"post-detail/post-detail?id="+postid
    })
  },
  onSwiperTap:function(event){
    var postid = event.target.dataset.postid;
    // console.log(postid);
    wx.navigateTo({
      url:"post-detail/post-detail?id="+postid
    })
  },
  onShareAppMessage:function(){
      return{
         title:this.data.post_key.title,
         desc:this.data.post_key.content,
         path:'/pages/posts/post'
      }
  },
  imageError: function(e) {
    console.log(e)
    var _errImg = e.target.dataset.postid;
    var _errObj = {};
    this.data.imgUrls.splice(_errImg,1,"/images/default.jpg");
    // console.log( this.data.imgUrls );
    this.setData( {imgUrls:this.data.imgUrls} );
  }
  // onReady:function(options){
  //    console.log("ononReady");
  // },
  // onShow:function(options){
  //    console.log("onShow");
  // },
  // onHide:function(options){
  //    console.log("onHide");
  // },
  // onUnload:function(options){
  //    console.log("onUnload");
  // }
});
