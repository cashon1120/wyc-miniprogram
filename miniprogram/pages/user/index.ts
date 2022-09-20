// pages/user/index.ts
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: '/images/avatar.png',
      nickName: ''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      this.setData({
        userInfo
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  handleGetUserInfo(){
    wx.getUserProfile({
      desc: '登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: {
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          }
        })
        wx.setStorage({    
          key: 'userInfo',   
          data: {
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          },    
        })
      }
    })
  }
})