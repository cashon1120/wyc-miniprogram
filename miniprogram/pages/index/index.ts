// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
let isSetHeight = false
Page({
  data: {
    background: [
      { url: 1, src: '../../images/banner.png' },
    ],
    indicatorDots: false,
    autoplay: false,
    vertical: false,
    interval: 2000,
    duration: 500,
    height: 0,
    items: [
      { url: 1, src: '../../images/icon_1.png', label: '安全教育' },
      { url: 2, src: '../../images/icon_2.png', label: '注册平台' },
      { url: 3, src: '../../images/icon_3.png', label: '租车买车' },
      { url: 4, src: '../../images/icon_4.png', label: '租房' },
      { url: 5, src: '../../images/icon_5.png', label: '充电' },
      { url: 6, src: '../../images/icon_6.png', label: '法律援助' },
      { url: 7, src: '../../images/icon_7.png', label: '打车' },
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
