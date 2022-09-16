import { GetPhoneNumber } from '../../api/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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
      if (res.code === 0 && res.data) {
        wx.setStorageSync('userPhone',  res.data)
        wx.navigateBack()
      }
    })
  }
})