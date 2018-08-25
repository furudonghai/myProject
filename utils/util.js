const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1]? n: '0' + n
};

const starsArray = (stars) => {
  var num = stars.toString().substring(0, 1);
  var arr = [];
  for (var i = 1; i <= 5; i++) {
    i <= num? arr.push(1): arr.push(0);
  }
  return arr;
};
const getAjax = (url, callback) => {
  wx.request({
    url: url,
    data: {},
    method: 'GET',
    header: {
      "Content-type": "application/json"
    },
    success: function(res) {
      callback(res);
    }
  });
};

const castString = (casts) => {
  let castsjoin = '';
  casts.forEach((item) => {
    castsjoin = castsjoin + item.name + "/";
  });
  return castsjoin.substring(0, castsjoin.length - 1);
};

const castInfo = (casts) => {
  let castsArr = [];
  casts.forEach((item) => {
    let cast = {
      img: item.avatars? item.avatars.large: "",
      name: item.name
    }
    castsArr.push(cast)
  })
  return castsArr;
};
module.exports = {
  formatTime,
  starsArray,
  getAjax,
  castInfo,
  castString
};
