import { TMAP_KEY } from '../../../config/index'
import { GetOpenCityList, GetServiceTypeList } from '../../../api/index'
const app = getApp();
let firstLoad = true
Page<any, any>({
  mapCtx: {},
  data: {
    center: {
      longitude: 0,
      latitude: 0,
    },
    startAddress: '正在获取地址信息...',
    serviceType: [{ value: 1, name: '即时' }, { value: 2, name: '预约' }, { value: 3, name: '接机' }, { value: 4, name: '送机' }, { value: 5, name: '接站' }, { value: 6, name: '送站' }],
    // markers: [{
    //     id: 1,
    //     latitude: 23.097994,
    //     longitude: 113.323520,
    //     iconPath: '',
    //     customCallout: {
    //         anchorY: 0,
    //         anchorX: 0,
    //         display: 'ALWAYS'
    //     },
    // }]
  },

  onReady() {
    // 获取已开放城市列表
    GetOpenCityList().then((res: any) => {
      if (res.code === 'sucess') {
        app.globalData.openCityList = res.data
      }
    })

    GetServiceTypeList().then((res: any) => {
      if (res.code === 'sucess') {
        this.setData({
          serviceType: res.data
        })
      }
    })
  },
  onLoad() {

    this.mapCtx = wx.createMapContext('map')
    wx.getLocation({
      type: 'wgs84',
      success: (res: any) => {
        const { latitude, longitude } = res
        this.getLocationInfo(latitude, longitude)
        setTimeout(() => {
          firstLoad = false
        }, 1000);
        this.setData({
          center: {
            longitude,
            latitude
          },
          // markers: [{
          //     id: 1,
          //     latitude,
          //     longitude,
          //     iconPath: '',
          //     customCallout: {
          //         anchorY: 0,
          //         anchorX: 0,
          //         display: 'ALWAYS'
          //     },
          // }]
        })
      }
    })
  },

  getLocationInfo(latitude: number, longitude: number) {
    wx.request({
      url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${TMAP_KEY}&get_poi=1`,
      method: 'GET',
      success: (res: any) => {
        const { formatted_addresses: { recommend, rough }, address, } = res.data.result
        const info = recommend || rough || address
        app.globalData.city = res.data.result.address_component.city
        app.globalData.startAddress = {
          latitude,
          longitude,
          address: info
        }
        this.setData({
          startAddress: info
        })
      }
    })
  },

  hanleNavigate() {
    wx.navigateTo({
      url: '/pages/taxi/address/index'
    })
  },

  bindregionchange(res: any) {
    if (firstLoad) return
    const { type } = res
    if (type === 'end') {
      this.mapCtx.getCenterLocation({
        success: (res: any) => {
          this.getLocationInfo(res.latitude, res.longitude)
        }
      })
    }
  }
})