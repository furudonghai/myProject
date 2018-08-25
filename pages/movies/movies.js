
const app = getApp();
const util = require('../../utils/util.js');
Page({
  data:{
    url:app.globalData.url,
    containerShow:true,
    searchPannelShow:false
  },
  onLoad:function(event){
    let dataUrl = this.data.url;
    let inTheatersUrl = dataUrl + "/v2/movie/in_theaters"+"?start=0&count=3";
    let comingUrl = dataUrl + "/v2/movie/coming_soon"+"?start=0&count=3";
    let top250Url = dataUrl + "/v2/movie/top250"+"?start=0&count=3";
    this.getInTheater(inTheatersUrl,"inTheaters");
    this.getComing(comingUrl,"comingSoon");
    this.getTop250(top250Url,'top250');
    wx.setEnableDebug({
        enableDebug: true
    });
  },
  onMoreTap:function(event){
    let category = event.currentTarget.dataset.category;
    wx.navigateTo({
       url:'more-movie/more-movie?category=' + category
    })
  },
  getInTheater:function(param1,key1){
    //获取电影列表
    let self = this;
    util.getAjax(param1,function(res1){
            // console.log(res1)
            self.processData(res1.data,key1);
    });
  },
  getComing:function(param2,key2){
    //获取电影列表
    let self = this;
    util.getAjax(param2,function(res2){
            // console.log(res2.data);
            self.processData(res2.data,key2);
    });
  },
  getTop250:function(param3,key3){
    //获取电影列表
    let self = this;
    util.getAjax(param3,function(res3){
            // console.log(res3.data);
            self.processData(res3.data,key3);
    });
  },
  processData:function(moviesData,keyName){
    // console.log(moviesData)
    let movies = [];
    let self = this;
    for( let idx in moviesData.subjects ){
        let subject = moviesData.subjects[idx];
        let title = subject.title;
        if( title.length >= 6 ){
           title = title.substring(0,6) + '...';
        }
        let temp = {
           stars:util.starsArray(subject.rating.stars),
           title:title,
           average:subject.rating.average,
           coverageUrl:subject.images.large,
           movieId:subject.id
        };
        // console.log(temp);
        movies.push(temp);
    }
    // console.log(movies);
    let readyData = {};
    readyData[keyName] = {movies:movies};
    self.setData(readyData);
  },
  onCancelImgTap:function(event){
    this.setData({
       containerShow:true,
       searchPannelShow:false
    })
  },
  onBindfocus:function(event){
     this.setData({
        containerShow:false,
        searchPannelShow:true
     })
  },
  onBindchange:function(event){
    let text = event.detail.value;
    let dataUrl = this.data.url;
    let searcUrl = dataUrl + "/v2/movie/search?q="+text;
    let self = this;
    util.getAjax(searcUrl,function(res){
            // console.log(res3.data);
            // let movies = [];
            // console.log(res,res.subjects);
            self.processData(res.data,"searchResult");
            // res.data.subjects.forEach( (item)=>{
            //       // console.log(item)
            //      let  title = item.title;
            //      if( title>=6 ){
            //         title = title.substring(0,6) + '...';
            //      }
            //      let temp = {
            //         stars:util.starsArray(item.rating.stars),
            //         title:title,
            //         average:item.rating.average,
            //         coverageUrl:item.images.large,
            //         movieId:item.id
            //      };
            //      movies.push(temp);
            // });
            // let readyData = {};
            // readyData["searchResult"] = {movies:movies};
            // self.setData(readyData);
    });
  },
  onMovieDetail:function(event){
    // console.log(event)
    let movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
       url:'movie-detail/movie-detail?id=' + movieId
    })
  },
  onReady:function(event){

  }
});
