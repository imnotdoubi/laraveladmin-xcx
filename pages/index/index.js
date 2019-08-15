//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //轮播
    imgUrls: [
      {
        link: '/',
        url: 'http://www.lar-admin.test/web/m/images/flash/3.jpg'
      }, {
        link: '/',
        url: 'http://www.lar-admin.test/web/m/images/flash/2.jpg'
      }
    ],
    indicatorDots: true, //小点
    indicatorColor: "white",//指示点颜色
    activeColor: "coral",//当前选中的指示点颜色
    autoplay: true, //是否自动轮播
    vertical: false,
    interval: 2000, //间隔时间
    duration: 500, //滑动时间
    currentData: 0,

    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this//不要漏了这句，很重要

    wx.request({
      url: 'http://www.lar-admin.test/api/indexfl/1',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {

        //将获取到的json数据，存在名字叫lanmu的这个数组中
        that.setData({
          lanmu: res.data.arcs,
          //res代表success函数的事件对，data是固定的，arcs是是上面json数据中arcs

        })
      }
    }),
      wx.request({
      url: 'http://www.lar-admin.test/api/indexdy/1',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          that.setData({
            hotpp: res.data.hotpp,
          })
        }
      }),
      wx.request({
      url: 'http://www.lar-admin.test/api/indexdy/2',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          that.setData({
            hotjmzn: res.data.hotwz,
          })
        }
      }),
      wx.request({
        url: 'http://www.lar-admin.test/api/indexdy/3',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          that.setData({
            hotcygs: res.data.hotwz,
          })
        }
      })
  },
  //点击跳转到文章
  postDetail: function (event) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id,
    })
  },
  //获取当前滑块的index tag 切换
  indextag: function (e) {
    var that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  indexCheck: function (e) {
    var that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  }

})
