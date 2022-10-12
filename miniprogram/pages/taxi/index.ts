import { GetLoginUrl } from '../../api/index'
import { getUserInfo } from '../../utils/util'

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
  },

  onShow(){
    const userInfo = getUserInfo()
    if(userInfo){
      wx.getLocation({
        type: 'gcj02',
        success: (res: any) => {
          const { latitude, longitude } = res
          const params = {
            userPhone: userInfo.phone,
            startLat: latitude,
            startLng: longitude,
          }
          console.log(params)
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
  },
})