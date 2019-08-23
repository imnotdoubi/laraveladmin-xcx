const app = getApp()

Page({
  data: {
  },

  onLoad() {
    let that = this;

    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log('成功');
              that.checkToken();
            }
          })
        }
      }
    })

  },

  bindGetUserInfo: function (e) {

    if (!e.detail.userInfo) {
      return;
    }
    wx.setStorageSync('userInfo', e.detail.userInfo)
    this.login();
  },

  login:function() {
    let that = this;
    that.checkToken();
    
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: 'http://www.lar-admin.test/api/user/onLogin',

            data: {
              code: res.code
            },
            success(res) {
              if (res.data.code == 777777) {
                // 去注册
                that.registerUser();
               
                  wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 1000
                  })
               
                return;
              } 
              
              return ;
            }
          });
        }
      }
    });
  },
  checkToken:function () {
  
    let that = this;
    let token = wx.getStorageSync('token');
    let oid = wx.getStorageSync('oid');
    if (token) {

      wx.request({
        url: 'http://www.lar-admin.test/api/user/checktoken',
        data: {
          token: token,
          oid: oid
        },
        success: function (res) {
          if (res.data.code == 777779) {
            // 回到原来的地方放
            //wx.navigateBack();
            return;
            
          }
          else {

            wx.removeStorageSync('token');

            wx.showModal({
              title: '提示',
              content: '登录过期，重新登录',
              success: function (res) {
                if (res.confirm) {
                  console.log('确定');
                  that.login();
                } else {
                  console.log('取消');
                  wx.navigateTo({
                    url: "/pages/ucenter/index/index"
                  })
                }

              }

            })

          return;
            
          }
        }
      })
      return;
    }
  },

  registerUser: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            // 下面开始调用注册接口
            wx.request({
              url: 'http://www.lar-admin.test/api/user/register',
              data: { 
                code: code, 
                encryptedData: encryptedData, 
                iv: iv 
              }, // 设置请求的 参数
              success: (res) => {
                // console.log(res.data.nickname)
                wx.setStorageSync('token', res.data.token);
                wx.setStorageSync('oid', res.data.oid);
                wx.navigateBack();
              }
            })
          }
        })
      }
    })
  },
  onShow: function () {
   
    var that = this;

    var userInfo = wx.getStorageSync('userInfo');
    var token   = wx.getStorageSync('token')
    console.log(userInfo)
    if (userInfo) {
      that.setData({
        userInfo: userInfo,
        token   : token
      })
    }

  },
  navigateBack: function () {
    wx.navigateBack();
  }


  

})