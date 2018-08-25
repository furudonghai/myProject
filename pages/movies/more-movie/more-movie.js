const app = getApp();
const util = require('../../../utils/util.js');
Page({
  data: {
    movies:{},
    requestUrl:"",
    totalCount:0,
    isEmpty:true
  },
  onLoad: function (options) {
     let category = options.category;
     let URL = app.globalData.url;
     let dataUrl = '';
     // console.log(options,category);
     switch(category){
         case "正在热映":
         dataUrl = URL+"/v2/movie/in_theaters";
         break;
         case "即将上映":
         dataUrl = URL+"/v2/movie/coming_soon";
         break;
         case "top250":
         dataUrl = URL+"/v2/movie/top250";
         break;
     }
     this.setData({requestUrl:dataUrl});
     this.getMovieData(dataUrl);
  },
  getMovieData:function(param){
    //获取电影列表
    let self = this;
    util.getAjax(param,function(res){
             console.log(res)
             self.processData(res.data);
    });
  },
  processData:function(moviesData){
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
        movies.push(temp);
    }
    let totalMovies = {};

    if( !this.data.isEmpty ){
       totalMovies = [...this.data.movies,...movies];
    }else{
       totalMovies = movies;
       self.setData({isEmpty:false})
    }

    self.setData({totalCount:self.data.totalCount})
    self.setData({movies:totalMovies});
    self.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  onReady: function (event) {
    // console.log(this);
    let category = this.options.category;
    wx.setNavigationBarTitle({
           title:category,
           success:function(res){
                  // console.log(res);
           }
    });
  },
  onPullDownRefresh:function(event){
     let refreshUrl = this.data.requestUrl + "?start=0&count=20";
     this.setData({totalCount:0});
     this.setData({movies:{}});
     this.setData({isEmpty:true});
     this.getMovieData(refreshUrl);
     wx.showNavigationBarLoading();
  },
  onScrollLower:function(event){
      // console.log(event);
      let nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
      this.getMovieData(nextUrl);
      wx.showNavigationBarLoading();
  },
  onMovieDetail:function(event){
    // console.log(event)
    let movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
       url:'../movie-detail/movie-detail?id=' + movieId
    })
  }
});
