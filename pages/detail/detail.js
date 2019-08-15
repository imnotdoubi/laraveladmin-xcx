//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
      article: {},
      info: ''
    },

  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://www.lar-admin.test/api/article/' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          article: res.data.article
        })
        var wxParse = require('../components/wxParse/wxParse.js')
        wxParse.wxParse('article_content', 'html', that.data.article.content, that, 1)
      },
      fail: function () {
        that.data.info = '获取文章详情数据失败'
      },
      complete: function () {
        wx.hideLoading()
      }
      
    })

  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    let id = this.data.article.id
    let title = this.data.article.title
    return {
      title: "我不是逗逼-"+title,
      path: '/pages/detail/detail?id='+id
    }
  },


  formSubmit: function (e) {
    //console.log(e.detail.value);
    if (e.detail.value.xingming.length == 0 || e.detail.value.xingming.length >= 8) {
      wx.showToast({
        title: '姓名不能为空或过长!',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 1000)
    } else if (e.detail.value.dianhua.length == 0 || e.detail.value.dianhua.length >= 12) {
      wx.showToast({
        title: '电话不能为空或过长!',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 1000)
    } else {
      wx.request({
        url: 'http://www.lar-admin.test/api/iphonexx',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "get",
        data: { 
          xingming: e.detail.value.xingming, 
          dianhua: e.detail.value.dianhua, 
          neirong: e.detail.value.neirong, 
          wangzhi: e.detail.value.wangzhi 
          },
        success: function (res) {
          
          var tishi = res.data.msg;
          if (res.data.status == 0) {
            wx.showToast({
              title: '提交失败！！！',
              icon: 'loading',
              duration: 1500
            })
          } else {

            wx.showToast ({
              
              title: tishi,
              icon: 'success',
              duration: 1000
            })
          }
        }
      })
    }
  }
  
  

})
