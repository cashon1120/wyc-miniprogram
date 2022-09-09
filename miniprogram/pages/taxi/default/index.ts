import { TMAP_KEY } from '../../../config/index'
import { GetOpenCityList, GetServiceTypeList, GetGroupList } from '../../../api/index'
const app = getApp();
let firstLoad = true

let canUse = true

Page<any, any>({
  mapCtx: {},
  data: {
    center: {
      longitude: 0,
      latitude: 0,
    },
    startAddress: '正在获取地址信息...',
    serviceType: [],
  },

  onReady() {
    // 获取已开放城市列表
    GetOpenCityList().then((res: any) => {
      if (res.code === 0) {
        if(res.data.length === 0){
          wx.showToast({
            title:'获取开放城市失败',
            icon: 'none'
          })
          canUse = false
          return
        }
        app.globalData.openCityList = res.data
        this.checkIsOpenCity()
      }
    })
    // 获取打车类型
    GetServiceTypeList().then((res: any) => {
      if (res.code === 0) {
        this.setData({
          serviceType: res.data
        })
      }
    })
  },

  // 判断当前城市是否已经开通服务
  checkIsOpenCity(){
    const {openCityList, currentCity} = app.globalData

    if(openCityList.length > 0 && currentCity.cityName){
      const result = openCityList.filter((item: any) => item.cityName === currentCity.cityName)
      if(result.length === 0){
        wx.showToast({
          title:'当前城市还未开通功能',
          icon: 'none'
        })
        canUse = false
        return
      }
      app.globalData.currentCity.cityId = result[0].cityId
      // if(!firstLoad) return
      GetGroupList({cityId: result[0].cityId}).then((res: any) => {
        if(res.code === 0){
          app.globalData.groupList = res.data
        }
      })
    }
  },

  onShow(){
    if(app.globalData.selectedAddress){
      const {latitude, longitude} = app.globalData.selectedAddress
      this.setData({
        center: {
          longitude,
          latitude,
        }
      })
      app.globalData.selectedAddress = null
    }
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
        })
      }
    })
  },

  // 根据经纬度获取位置信息
  getLocationInfo(latitude: number, longitude: number) {
    wx.request({
      url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${TMAP_KEY}&get_poi=1`,
      method: 'GET',
      success: (res: any) => {
        const { formatted_addresses: { recommend, rough }, address, } = res.data.result
        const info = recommend || rough || address
        app.globalData.currentCity.cityName = res.data.result.address_component.city.replace('市', '')
        this.checkIsOpenCity()
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

  // 跳转选择位置页
  hanleNavigate(e: any) {
    if(!canUse){
      return
    }
    const {type} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/taxi/address/index?type=${type}`
    })
  },

  // 拖动地图事件，这里是获取地图中心点位置信息
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