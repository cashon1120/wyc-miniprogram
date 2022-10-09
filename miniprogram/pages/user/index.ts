import {getUserInfo} from '../../utils/util'
Page({
  data: {
    userInfo: {
      avatarUrl: '/images/avatar.png',
      nickName: ''
    },
  },

  onShow: function () {
    const userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      this.setData({
        userInfo
      })
    }
  },

  handleSetUserInfo(){
    getUserInfo(true)
  },

  handleCall(){
    wx.makePhoneCall({
      phoneNumber: '4008-460-999'
    })
  }
})