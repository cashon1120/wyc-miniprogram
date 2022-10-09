// pages/sucess/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: ''
  },
  onLoad(options: any){
    this.setData({
      page: options.page
    })
  },

  handleClick(){
    wx.navigateBack()
  }
})