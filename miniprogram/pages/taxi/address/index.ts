import QQMapWX from '../../../utils/qqmap-wx-jssdk'
import { TMAP_KEY } from '../../../config/index'
const app = getApp();
Page<any, any>({
  data: {
    addressList: []
  },
  onLoad() {
    this.QQMapWX = new QQMapWX({ key: TMAP_KEY })
  },
  getSuggest(e: any) {
    const { value } = e.detail
    this.QQMapWX.getSuggestion(({
      keyword: value,
      region: app.globalData.city || '成都',
      success: (res: any) => {
        this.setData({
          addressList: res.data
        })
      }
    }))
  },
  handleSetEndAddress(e: any) {
    app.globalData.endAddress = {
      latitude: e.currentTarget.dataset.value.location.lat,
      longitude: e.currentTarget.dataset.value.location.lng,
      address: e.currentTarget.dataset.value.title
    }
    wx.navigateTo({
      url: '../price/index'
    })
  }
})

