const app = getApp()
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
      // { url: 'education', src: '../../images/icon_1.png', label: '安全教育' },
      { url: '', src: '../../images/icon_2.png', label: '注册平台' },
      { url: '', src: '../../images/icon_3.png', label: '租车买车' },
      { url: '', src: '../../images/icon_4.png', label: '租房' },
      { url: 'charge', src: '../../images/icon_5.png', label: '充电' },
      { url: '', src: '../../images/icon_6.png', label: '法律援助' },
      // { url: 'taxi/default', type: 1, src: '../../images/icon_7.png', label: '打车(直接跳)' },
      { url: 'taxi/default', type: 2, src: '../../images/icon_7.png', label: '打车' },
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

  handleNavigate(e: any) {
    const { url } = e.currentTarget.dataset
    if(!url) {
      wx.showToast({
        title: '该功能尚未开放',
        icon: 'none'
      })
      return
    }

    // 测试
    const {type} = e.currentTarget.dataset
    if(url === 'taxi/default'){
      app.globalData.priceType = type
      wx.navigateTo({
        url: `/pages/${url}/index`,
      })
      return
    }

    wx.navigateTo({
      url: `/pages/${url}/index`,
    })
  }
})
