import { API_URL } from '../../config/index'
import { UpdateUserInfo, GetPhoneNumber } from '../../api/index'

const app = getApp()
Page({
  data: {
    avatarUrl: '/images/avatar.png',
    realAvatarUrl: '',
    progress: 0,
    nickName: '',
    phone: '',
  },

  onLoad() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      const { nickName, avatarUrl, phone } = userInfo
      this.setData({
        avatarUrl,
        nickName,
        phone,
        realAvatarUrl: avatarUrl
      })
    }
  },

  handleChooseAvatar(e: any) {
    const filePath = e.detail.avatarUrl
    this.setData({
      avatarUrl: filePath,
      progress: 0
    })
    const uploadTask = wx.uploadFile({
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
    uploadTask.onProgressUpdate((res: any) => {
      this.setData({
        progress: res.progress
      })
    })
  },
  handleGetPhoneNumber(e: any) {
    // pt: 渠道号, phone: 用户手机号 两个必填
    if (!e || !e.detail.code) {
      wx.showToast({
        title: '您拒绝了授权， 无法进行下一步操作',
        icon: 'none'
      })
      return
    }
    GetPhoneNumber(e.detail.code).then((res: any) => {
      if (res.code === 0) {
        if(res.data){
          wx.setStorageSync('userPhone',  res.data)
          this.setData({
            phone: res.data
          })
        }else{
          wx.showToast({
            title: '手机获取失败',
            icon: 'none'
          })
        }
      }
    })
  },
  handleSubmit(e: any) {
    const { avatarUrl, nickName, phone } = e.detail.value
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
    if (phone === '') {
      wx.showToast({
        title: '请授权获取手机号',
        icon: 'none'
      })
      return
    }
    UpdateUserInfo({ avatarUrl, nickName, phone }).then((res: any) => {
      if (res.code === 0) {
        wx.setStorage({
          key: 'userInfo',
          data: {
            avatarUrl,
            nickName,
            phone
          },
          success: () => {
            const url = app.globalData.tempUrl
            app.globalData.tempUrl = ''
            if (url) {
              wx.redirectTo({
                url: '/' + url
              })
            } else {
              wx.navigateBack()
            }
          }
        })
      }
    })
  }
})
