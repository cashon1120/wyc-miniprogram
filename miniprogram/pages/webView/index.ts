// pages/webView/index.ts
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      url: app.globalData.toUrl
    })
  },

})

export default {}