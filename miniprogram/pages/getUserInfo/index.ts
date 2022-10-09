import { API_URL } from '../../config/index'
import { UpdateUserInfo } from '../../api/index'
const app = getApp()
Page({
  data: {
    avatarUrl: '/images/avatar.png',
    realAvatarUrl: '',
  },

  onLoad(){
    const userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      const {nickName, avatarUrl} = userInfo
      this.setData({
        avatarUrl,
        nickName,
        realAvatarUrl: avatarUrl
      })
    } 
  },

  handleChooseAvatar(e: any) {
    const filePath = e.detail.avatarUrl
    this.setData({
      avatarUrl: filePath
    })
    wx.uploadFile({
      url: `${API_URL}rentUser/upload`,
      filePath,
      name: 'file',
      formData: {
        id: 0
      },
      success: (res: any) => {
        const data = JSON.parse(res.data).data
        const { code, path } = data
        if (code === 0) {
          this.setData({
            realAvatarUrl: path
          })
        }
      },
    })
  },
  handleSubmit(e: any) {
    const { avatarUrl, nickName } = e.detail.value
    if (avatarUrl === '') {
      wx.showToast({
        title: '请上传头像或选择微信头像',
        icon: 'none'
      })
      return
    }
    if (nickName === '') {
      wx.showToast({
        title: '请输入昵称或选择微信昵称',
        icon: 'none'
      })
      return
    }
    UpdateUserInfo({ avatarUrl, nickName }).then((res: any) => {
      if (res.code === 0) {
        wx.setStorage({
          key: 'userInfo',
          data: {
            avatarUrl,
            nickName
          },
          success: () => {
            const url = app.globalData.tempUrl
            app.globalData.tempUrl = ''
            if(url){
              wx.redirectTo({
                url: '/' + url
              })
            }else{
              wx.navigateBack()
            }
          }
        })
      }
    })
  }
})
