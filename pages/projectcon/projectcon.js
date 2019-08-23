// pages/projectcon/projectcon.js
const app = getApp()

Page({
  data: {
    xmcom: {},
    info: ''
  },

  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://www.lar-admin.test/api/xmcon/' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          xmcom: res.data.xmcom
        })
        var wxParse = require('../components/wxParse/wxParse.js')
        wxParse.wxParse('xmcom_content', 'html', that.data.xmcom.content, that, 1)
      },
      fail: function () {
        that.data.info = '获取项目详情数据失败'
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
    let id = this.data.xmcom.id
    let title = this.data.xmcom.combrand
    return {
      title: "我不是逗逼-" + title,
      path: '/pages/projectcon/projectcon?id=' + id
    }
  },
  //取消返回
  bindCancel: function () {
    wx.navigateBack({})
  },

  formSubmit: function (e) {
    //console.log(e.detail.value);
    var xingming  = e.detail.value.xingming;
    var dianhua = e.detail.value.dianhua;
    var neirong = e.detail.value.neirong;

    if (xingming == "" || xingming.length >= 8) {
      wx.showModal({
        title: '提示',
        content: '姓名不能为空或过长',
        showCancel: false
      })
      return
    }else if (dianhua == "" || dianhua.length >= 12) {
      wx.showModal({
        title: '提示',
        content: '姓名不能为空或过长',
        showCancel: false
      })
      return
    }

    // if (dianhua == "" || dianhua >= 12) {
    //   wx.showToast({
    //     title: '电话不能为空或过长!',
    //     icon: 'loading',
    //     duration: 1000
    //   })
    //   setTimeout(function () {
    //     wx.hideToast()
    //   }, 1000)
    // } else if (e.detail.value.dianhua.length == 0 || e.detail.value.dianhua.length >= 12) {
    //   wx.showToast({
    //     title: '电话不能为空或过长!',
    //     icon: 'loading',
    //     duration: 1000
    //   })
    //   setTimeout(function () {
    //     wx.hideToast()
    //   }, 1000)
    // } 
    else {
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

            wx.showToast({

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
