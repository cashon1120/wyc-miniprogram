import QQMapWX from '../../../utils/qqmap-wx-jssdk'
import { TMAP_KEY } from '../../../config/index'
const app = getApp();

Page<any, any>({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
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

