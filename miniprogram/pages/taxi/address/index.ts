import QQMapWX from '../../../utils/qqmap-wx-jssdk'
import { TMAP_KEY } from '../../../config/index'
const app = getApp();
Page<any, any>({
  data: {
    addressList: [],
    type: 'start'
  },
  onLoad(options: any) {
    this.setData({
      type: options.type
    })
    this.QQMapWX = new QQMapWX({ key: TMAP_KEY })
  },

  // 根据输入内容查询地址
  getSuggest(e: any) {
    const { value } = e.detail
    this.QQMapWX.getSuggestion(({
      keyword: value,
      region: app.globalData.currentCity.cityName || '成都',
      success: (res: any) => {
        this.setData({
          addressList: res.data
        })
      }
    }))
  },

  // 选中地址处理，type不一样，处理方式不一样
  handleSetEndAddress(e: any) {
    const { value } = e.currentTarget.dataset
    const addressInfo = {
      latitude: value.location.lat,
      longitude: value.location.lng,
      address: value.title
    }
    if (this.data.type === 'start') {
      app.globalData.selectedAddress = addressInfo
      wx.navigateBack()
      return
    }
    app.globalData.endAddress = addressInfo
    wx.redirectTo({
      url: '../price/index'
    })
  },

  handleBack() {
    wx.navigateBack()
  }
})

