import { GetFarePredictionV2, GetFixedPrice, GetLoginUrl, CreateOrder1, CreateOrder2 } from '../../../api/index'
import { formatTime, checkUserPhone } from '../../../utils/util'
import { TMAP_KEY } from '../../../config/index'

const app = getApp();
interface IData { }
const getGroupListByServiceType = (type: number, globalGroupList: any[]) => {
  if (!globalGroupList || globalGroupList.length === 0) {
    return []
  }
  const result = globalGroupList.filter((item: any) => item.serviceType === type)[0].groupList
  return result
}

let currentTime = formatTime(new Date());
// 跳转方式开关， 1： 直接跳转，跳过去后还需要用户选择结束地点；2：先下单再跳转
let jumpType = 1

Page<IData, any>({
  mapCtx: null,
  data: {
    markers: [],
    points: [],
    polyline: [],
    serviceType: 1,
    scale: 16,
    groupList: [],
    loading: false,
    priceType: 1,
    selectedGroup: null,
    jumpType
  },

  onLoad() {
    jumpType = app.globalData.priceType
    this.setData({
      jumpType
    })

    const { startAddress, endAddress, currentCity } = app.globalData
    const _groupList = getGroupListByServiceType(1, app.globalData.groupList)
    this.setData({
      groupList: _groupList
    }, () => {
      let groups: string[] = []
      this.data.groupList.map((item: any) => {
        groups.push(`${item.id}:1`)
      })
      const params = {
        "serviceType": this.data.serviceType,
        "bookingDate": currentTime,
        "cityId": currentCity.cityId,
        "bookingStartPointLa": startAddress.latitude,
        "bookingStartPointLo": startAddress.longitude,
        "bookingEndPointLa": endAddress.latitude,
        "bookingEndPointLo": endAddress.longitude,
        "groups": groups.join(','),
      }
      const { groupList } = this.data
      // 获取普通价格
      GetFarePredictionV2(params).then((res: any) => {
        if (res.code === 0) {
          res.data.forEach((item: any, index: number) => {
            groupList.forEach((group: any) => {
              if (parseInt(item.groupId) === parseInt(group.id)) {
                groupList[index].normalPrice = { ...item }
              }
            })
          })
          this.setData({
            groupList: [...groupList],
          })
        }
      })
      // 获取一口价
      GetFixedPrice(params).then((res: any) => {
        if (res.code === 0) {
          res.data.forEach((item: any) => {
            groupList.forEach((group: any, index: number) => {
              if (parseInt(item.groupId) === parseInt(group.id)) {
                groupList[index].estimatesPrice = { ...item }
              }
            })
          })
          this.setData({
            groupList: [...groupList],
          })
        }
      })
    })


    this.mapCtx = wx.createMapContext('map')
    this.setData({
      markers: [{
        id: 1,
        latitude: startAddress.latitude,
        longitude: startAddress.longitude,
        iconPath: '/images/marker_start.png',
        width: 34,
        height: 43,

      }, {
        id: 2,
        latitude: endAddress.latitude,
        longitude: endAddress.longitude,
        iconPath: '/images/marker_end.png',
        width: 34,
        height: 43,
      }],
    }, () => {
      // 地图显示起点和终点两个marker
      setTimeout(() => {
        this.setData({
          points: [{
            latitude: startAddress.latitude,
            longitude: startAddress.longitude
          }, {
            latitude: endAddress.latitude,
            longitude: endAddress.longitude
          }]
        })
      }, 1000);

    })


    // 获取路线
    wx.request({
      url: `https://apis.map.qq.com/ws/direction/v1/driving/?from=${startAddress.latitude},${startAddress.longitude}&to=${endAddress.latitude},${endAddress.longitude}&output=json&key=${TMAP_KEY}`,
      method: 'GET',
      success: (res: any) => {
        const polyline = res.data.result.routes[0].polyline
        for (var i = 2; i < polyline.length; i++) {
          polyline[i] = polyline[i - 2] + polyline[i] / 1000000
        }
        const data = [];
        for (var i = 0; i < polyline.length; i = i + 2) {
          data[i / 2] = { latitude: polyline[i], longitude: polyline[i + 1] };
        }
        this.setData({
          polyline: [{ points: data, color: "#00AD81", width: 5, arrowLine: true, }]
        })
      }
    })
  },

  // 选择车型
  handleSelectGroup(e: any) {
    const { id } = e.currentTarget.dataset
    if (jumpType === 1) {
      const { groupList } = this.data
      groupList.forEach((item: any) => {
        if (item.id === id) {
          item.selected = item.selected ? false : true
        }
      })
      this.setData({
        groupList
      })
      return
    }

    this.setData({
      selectedGroup: id
    })
  },

  // 确认叫车， 叫车前要先选择车型
  handleSubmit() {

    const { priceType, selectedGroup, groupList } = this.data

    if (jumpType === 1) {
      let groupId: number[] = []
      this.data.groupList.map((item: any) => {
        if (item.selected) {
          groupId.push(item.id)
        }
      })
      if (groupId.length === 0) {
        wx.showToast({
          title: '请选择车型',
          icon: 'none'
        })
        return
      }
    } else {
      if (!selectedGroup) {
        wx.showToast({
          title: '请选择车型',
          icon: 'none'
        })
        return
      }
    }


    const userPhone = checkUserPhone()
    if (userPhone) {


      // 不同的跳转方式

      // 1. 直接跳转
      if (jumpType === 1) {
        this.handleGetUrl(userPhone)
        return
      }
      this.setData({
        loading: true
      })
      const { startAddress, endAddress, currentCity } = app.globalData
      let params: any = {
        riderPhone: userPhone,
        "serviceType": this.data.serviceType,
        "bookingDate": currentTime,
        "cityId": currentCity.cityId,
        "bookingStartPointLa": startAddress.latitude,
        "bookingStartPointLo": startAddress.longitude,
        "bookingEndPointLa": endAddress.latitude,
        "bookingEndPointLo": endAddress.longitude,
        bookingStartAddr: startAddress.address,
        bookingEndAddr: endAddress.address,
        groupIds: selectedGroup,

      }

      // 下单普通价
      if (priceType === 1) {
        let estimatedAmount = ''
        let priceToken = ''
        groupList.forEach((item: any) => {
          if (item.id === selectedGroup) {
            estimatedAmount = item.normalPrice.originalAmount
            priceToken = item.normalPrice.priceToken
          }
        })
        params = {
          ...params,
          estimatedAmount,
          priceToken,

        }
        CreateOrder1(params).then((res: any) => {
          if (res.code === 0 && res.data.code === 0) {
            this.handleGetUrl(userPhone, res.data.partnerOrderNo, res.data.orderNo)
          } else {
            wx.showToast({
              title: '数据获取失败',
              icon: 'none'
            })
          }
        }).finally(() => {
          setTimeout(() => {
            this.setData({
              loading: false
            })
          }, 500)
        })
        return
      } else {
        // 下单一口价
        let priceMark = ''
        let estimatedAmount = ''
        groupList.forEach((item: any) => {
          if (item.id === selectedGroup) {
            estimatedAmount = item.estimatesPrice.originalAmount
            priceMark = item.estimatesPrice.priceMark
          } priceMark
        })
        params = {
          ...params,
          estimatedAmount,
          priceMark
        }
        CreateOrder2(params).then((res: any) => {
          if (res.code === 0) {
            this.handleGetUrl(userPhone, res.data.partnerOrderNo, res.data.orderNo)
          } else {
            wx.showToast({
              title: '数据获取失败',
              icon: 'none'
            })
          }
        }).finally(() => {
          setTimeout(() => {
            this.setData({
              loading: false
            })
          }, 500)
        })
      }
    }
  },

  handleGetUrl(userPhone: string, partnerOrderNo?: string, orderNo?: string) {
    this.setData({
      loading: true
    })
    const { startAddress } = app.globalData
    if(partnerOrderNo){
      wx.setStorage({
        key: 'orderInfo',
        data: {
          userPhone,
          startLng: startAddress.longitude,
          startLat: startAddress.latitude, 
          partnerOrderNo,
          orderNo
        }
      })
    }
    GetLoginUrl({ userPhone, startLng: startAddress.longitude, startLat: startAddress.latitude, partnerOrderNo }).then((res: any) => {
      if (res.code === 0) {
        app.globalData.toUrl = res.data
        wx.redirectTo({
          url: '/pages/webView/index'
        })
      }
    }).finally(() => {
      setTimeout(() => {
        this.setData({
          loading: false
        })
      }, 500)
    })
  },

  handleChangePriceType(e: any) {
    const type = e.currentTarget.dataset.type
    this.setData({
      priceType: type
    })
  }
})

export default {}