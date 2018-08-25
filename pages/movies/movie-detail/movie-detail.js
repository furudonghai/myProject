const app = getApp();
const util = require('../../../utils/util.js');
Page({
  data: {
    url: app.globalData.url,
    movie: {}
  },
  onLoad: function(options) {
    let movieId = options.id;
    let dataUrl = this.data.url;
    let detailUrl = dataUrl + "/v2/movie/subject/" + movieId;
    util.getAjax(detailUrl, this.processData);
  },
  processData: function(data) {
    // console.log(data);
    let detailData = data.data;
    let director = {
      avatar: "",
      name: "",
      id: ""
    };
    if (detailData.directors[0] !== null) {
      if (detailData.directors[0].avatars !== null) {
        director.avatar = detailData.directors[0].avatars.large
      }
      director.name = detailData.directors[0].name;
      director.id = detailData.directors[0].id;
    };
    let movie = {
      movieImg : detailData.images? detailData.images.large: "",
      country: detailData.countries[0],
      title: detailData.title,
      originalTitle: detailData.original_title,
      wishCount: detailData.wish_count,
      commentCount: detailData.comments_count,
      year: detailData.year,
      genres: detailData.genres.join("、"),
      stars: util.starsArray(detailData.rating.stars),
      score: detailData.rating.average,
      director: director,
      casts: util.castString(detailData.casts),
      castsInfo: util.castInfo(detailData.casts),
      summary: detailData.summary
    };
    this.setData({movie:movie});
  },
  viewMoviePostImg:function(event){
     let src = event.currentTarget.dataset.src;
     wx.previewImage({
        current:src,//当前显示图片的http连接
        urls:[src] //需要显示的图片http链接列表
     })
  }
});
