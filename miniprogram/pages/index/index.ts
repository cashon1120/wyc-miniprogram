// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
let isSetHeight = false
Page({
  data: {
    background: [
      { url: 1, src: '../../images/banner.png' },
      { url: 2, src: '../../images/banner.png' },
      { url: 3, src: '../../images/banner.png' },
    ],
    indicatorDots: true,
    autoplay: false,
    vertical: false,
    interval: 2000,
    duration: 500,
    height: 0,
    items: [
      { url: 1, src: '../../images/temp.png' },
      { url: 2, src: '../../images/temp.png' },
      { url: 3, src: '../../images/temp.png' },
      { url: 4, src: '../../images/temp.png' },
      { url: 5, src: '../../images/temp.png' },
      { url: 6, src: '../../images/temp.png' },
      { url: 7, src: '../../images/temp.png' },
      { url: 8, src: '../../images/temp.png' },
    ]
  },
  imageLoad: function () { //获取图片真实宽度  
    if(isSetHeight) return
    let query = wx.createSelectorQuery()
    isSetHeight = true
    query.select('.banner-img-0').boundingClientRect(res => {
      this.setData({
        height: res.height
      })
    })
    query.exec()
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {

  },

  handleNavigate(e: any) {
    const { url } = e.currentTarget.dataset
    console.log(url)
  }
})
