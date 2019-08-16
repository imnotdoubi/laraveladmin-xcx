// pages/company/company.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listxm: [],
    isLoadingMore: false,
    currentPage: 1,
    info: '',
    tabTxt:[],
    index:0,
    tabtouzi: [],
    index2: 0
  },

  bindChangeLanmu(e) {
    var that = this
    that.setData({
      index: e.detail.value
    })
   
    this.data.index = this.data.tabTxt[e.detail.value].id
    this.data.currentPage = 1
    this.data.info = ''

    this.loadCompanys()

  },



  bindChangeTouzi(e) {
    this.setData({
      index2: e.detail.value
    })

    this.data.index2 = this.data.tabtouzi[e.detail.value].id
    this.data.currentPage = 1
    this.data.info = ''
    this.loadCompanys()
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this//不要漏了这句，很重要

      wx.showLoading({
        title: '项目加载中...'
      })
    that.loadCompanys()

  },

  loadCompanys: function () {
    var that = this
    var cpage = that.data.currentPage
  
    wx.request({
      url: 'http://www.lar-admin.test/api/comm/' + that.data.index +'/' + that.data.index2 + '?page=' + cpage,
      success: (res) => {

        if (res.data.message === 'success') {
     
          if (res.data.listxm.length == 0) {
            that.setData({
              isLoadingMore: false,
              info: '没有更多项目'
            });
          }
          if(cpage == 1){
            that.setData({
              listxm: res.data.listxm,
             
            })
          }else{
            that.setData({
              listxm: that.data.listxm.concat(res.data.listxm),
             
            })
          }
          
        } else {
          that.setData({
            info: '加载项目列表失败，请重试'
          })
        }
        wx.hideLoading()
      }
    })
  },
  //点击跳转到项目内容
  postProject: function (event) {
    wx.navigateTo({
      url: '/pages/projectcon/projectcon?id=' + event.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this//不要漏了这句，很重要
      wx.request({
        url: 'http://www.lar-admin.test/api/indexfl/3',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
  
          that.setData({
            tabTxt: res.data,
          })
        }
      }),
        wx.request({
          url: 'http://www.lar-admin.test/api/indexfl/4',
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            that.setData({
              tabtouzi: res.data,
            })
          }
        })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    that.data.currentPage++
    if (that.data.isLoadingMore && that.data.currentPage > 2) {
      // 最多只能加载3页
      that.setData({
        isLoadingMore: false,
        info: '没有更多项目了'
      })

      return
    }
    that.data.isLoadingMore = true
    that.loadCompanys()
  },

 
})