import { GetLoginUrl } from '../../../api/index'
import { checkUserPhone } from '../../../utils/util'

const app = getApp();

Page<any, any>({
  mapCtx: {},
  data: {
    center: {
      longitude: 0,
      latitude: 0,
    },
    startAddress: '正在获取地址信息...',
    serviceType: [],
    showModal: false,
    showPhone: false
  },

  onLoad() {
    const phone = checkUserPhone()
    if (phone) {
      this.handleGetPhoneCallback()
    }else{
      this.setData({
        showPhone: true
      })
    }
  },

  handleGetPhoneCallback(){
    wx.getLocation({
      type: 'gcj02',
      success: (res: any) => {
        const { latitude, longitude } = res
        const params = {
          userPhone: checkUserPhone(),
          startLat: latitude,
          startLng: longitude,
        }
        GetLoginUrl(params).then((res: any) => {
          if (res.code === 0) {
            app.globalData.toUrl = res.data
            wx.redirectTo({
              url: '/pages/webView/index'
            })
          }
        })
      }
    })
  }
})