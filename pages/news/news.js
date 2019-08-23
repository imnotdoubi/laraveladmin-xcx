// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listwz: [],
    isLoadingMore: false,
    currentPage: 1,
    info: '',
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this//不要漏了这句，很重要

    wx.request({
      url: 'http://www.lar-admin.test/api/indexfl/2',
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

      wx.showLoading({
        title: '文章加载中...'
      })

  },

  //点击跳转到指定栏目
  clickfl: function (e) {

    this.data.index = e.currentTarget.dataset.id
    this.data.currentPage = 1

    this.loadArticles()
    
//  
  },

 
  loadArticles: function () {
    var that = this
   
    wx.request({
      url: 'http://www.lar-admin.test/api/news/' + that.data.index +'?page=' + that.data.currentPage,
      success: (res) => {
        var listwz = []; 
        if (res.data.message === 'success') {
          if (res.data.listwz.length == 0) {
            that.setData({
              isLoadingMore: false,
              info: '没有更多文章'
            });
          }

          // for (var i = 0; i < res.data.listwz.length; i++) {
          //   listwz.push(res.data.listwz[i]);
          // }

          // that.setData({
          //   listwz: listwz
          // });

          if (that.data.currentPage == 1){
            that.setData({
              listwz: res.data.listwz
            })
          }else{
            that.setData({
              listwz: that.data.listwz.concat(res.data.listwz)
            })
          }
          
        } else {
          that.setData({
            info: '加载文章列表失败，请重试'
          })
        }
        wx.hideLoading()
      }
    })
  },

  //点击跳转到文章
  postDetail: function (event) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      this.loadArticles()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  
  onUnload: function () {
    
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
        info: '没有更多文章了'
      })

      return
    }
    that.data.isLoadingMore = true
    that.loadArticles()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})