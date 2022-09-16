import { TMAP_KEY } from '../../../config/index'
import { GetOpenCityList, GetServiceTypeList, GetGroupList, GetPartnerOrderNo, GetLoginUrl, CancelOrder } from '../../../api/index'
import { checkUserPhone } from '../../../utils/util'

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
    showModal: false
  },

 

  // 判断当前城市是否已经开通服务
  checkIsOpenCity() {
    const { openCityList, currentCity } = app.globalData

    if (openCityList.length > 0 && currentCity.cityName) {
      const result = openCityList.filter((item: any) => item.cityName === currentCity.cityName)
      if (result.length === 0) {
        wx.showToast({
          title: '当前城市还未开通功能',
          icon: 'none'
        })
        canUse = false
        return
      }
      app.globalData.currentCity.cityId = result[0].cityId
      // if(!firstLoad) return
      GetGroupList({ cityId: result[0].cityId }).then((res: any) => {
        if (res.code === 0) {
          app.globalData.groupList = res.data
        }
      })
    }
  },

  // onShow() {
  //   const orderInfo = wx.getStorageSync('orderInfo')
  //   if (orderInfo) {
  //     GetPartnerOrderNo({ orderNo: orderInfo.orderNo, partnerOrderNo: orderInfo.partnerOrderNo }).then((res: any) => {
  //       if (res.code === 0) {
  //         if (res.data.status <= 30) {
  //           this.setData({
  //             showModal: true
  //           })
  //         } else {
  //           wx.removeStorage({
  //             key: 'orderInfo'
  //           })
  //         }
  //       }
  //     })
  //   }
  //   if (app.globalData.selectedAddress) {
  //     const { latitude, longitude } = app.globalData.selectedAddress
  //     this.setData({
  //       center: {
  //         longitude,
  //         latitude,
  //       }
  //     })
  //     app.globalData.selectedAddress = null
  //   }
  // },

  onShow() {
    const phone = checkUserPhone()
    console.log(phone)
    if (phone) {
      wx.getLocation({
        type: 'gcj02',
        success: (res: any) => {
          const { latitude, longitude } = res
          const params = {
            userPhone: phone,
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


    // this.mapCtx = wx.createMapContext('map')
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: (res: any) => {
    //     const { latitude, longitude } = res
    //     this.getLocationInfo(latitude, longitude)
    //     setTimeout(() => {
    //       firstLoad = false
    //     }, 1000);
    //     this.setData({
    //       center: {
    //         longitude,
    //         latitude
    //       },
    //     })
    //   }
    // })


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
    if (!canUse) {
      return
    }
    const { type } = e.currentTarget.dataset
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
  },

  handleShowOrder() {
    const orderInfo = wx.getStorageSync('orderInfo')
    delete orderInfo.orderNo
    GetLoginUrl(orderInfo).then((res: any) => {
      if (res.code === 0) {
        app.globalData.toUrl = res.data
        wx.navigateTo({
          url: '/pages/webView/index'
        })
      }
    })
  },

  handleHideModal() {
    const orderInfo = wx.getStorageSync('orderInfo')
    if (orderInfo) {
      const params = {
        orderNo: orderInfo.orderNo,
        partnerOrderNo: orderInfo.partnerOrderNo,
      }
      CancelOrder(params)
    }

    this.setData({
      showModal: false
    })
  }
})