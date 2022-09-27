Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [{ name: '环旅出行', src: '/images/code_1.jpg' }, { name: '365约车', src: '/images/code_2.jpg' }]
  },
  handleShowImg(e: any){
    const url = e.currentTarget.dataset.url
    wx.previewImage({
      urls: [url]
    })
  }
})