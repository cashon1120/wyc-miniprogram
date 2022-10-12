// pages/sucess/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',

  },
  onLoad(options: any){
    this.setData({
      info: options.info || '信息提交成功，请等待处理'
    })
  },

  handleClick(){
    wx.navigateBack()
  }
})