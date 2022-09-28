Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [{ name: '首汽约车', src: '/images/code_shouqi.png' },{ name: '环旅出行', src: '/images/code_hlcx.jpg' }, { name: '365约车', src: '/images/code_365.jpg' }, { name: '阳光出行', src: '/images/code_yangguang.jpg' }, { name: 'T3出行', src: '/images/code_t3.png' }]
  },
  handleShowImg(e: any){
    const url = e.currentTarget.dataset.url
    wx.previewImage({
      urls: [url]
    })
  }
})