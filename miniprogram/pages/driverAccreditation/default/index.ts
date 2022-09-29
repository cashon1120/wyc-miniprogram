import { GetDriverAccreditation, GetDriverAccreditationTransport } from '../../../api/index'
import { formatTime } from '../../../utils/util'
const app = getApp()
let getDataCount = 0
Page({
  data: {
    showPhone: false,
    data1: null,
    showData1: false,
    data2: null,
    showData2: false,
    loaded: false
  },

  onShow() {
    this.getData()
  },
  getData() {
    GetDriverAccreditation({ rentUserId: wx.getStorageSync('userID') }).then((res: any) => {
      if (res.code === 0 && res.data) {
        res.data.createTime = formatTime(new Date(res.data.createTime * 1000))
        this.setData({
          data1: res.data,
          showData1: res.data.status !== 3
        })
      }
    }).finally(() => {
      this.checkLoadState()
    })

    GetDriverAccreditationTransport({ rentUserId: wx.getStorageSync('userID') }).then((res: any) => {
      if (res.code === 0 && res.data) {
        res.data.createTime = formatTime(new Date(res.data.createTime * 1000))
        this.setData({
          data2: res.data,
          showData2: res.data.status !== 3
        })
      }
    }).finally(() => {
      this.checkLoadState()
    })
  },

  checkLoadState() {
    getDataCount++
    if (getDataCount >= 2) {
      this.setData({
        loaded: true
      })
    }
  },

  handleNavigateTo(e: any) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url
    })
  },

  handleNavigateToDetail(e: any) {
    app.globalData.detailData = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/driverAccreditation/detail/index'
    })
  }
})