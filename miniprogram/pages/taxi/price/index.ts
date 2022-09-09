import { GetFarePredictionV2, GetFixedPrice } from '../../../api/index'
import { formatTime } from '../../../utils/util'
import { TMAP_KEY } from '../../../config/index'
const app = getApp();
interface IData { }
const getGroupListByServiceType = (type: number) => {
  const result = app.globalData.groupList.filter((item: any) => item.serviceType === type)[0].groupList
  return result
}
Page<IData, any>({
  mapCtx: null,
  data: {
    markers: [],
    points: [],
    polyline: [],
    serviceType: 1,
    scale: 16,
    groupList: getGroupListByServiceType(1)
  },

  onLoad() {
    const { startAddress, endAddress, currentCity } = app.globalData
    let groups: string[] = []
    this.data.groupList.map((item: any) => {
      groups.push(`${item.id}:1`)
    })
    const params = {
      "serviceType": this.data.serviceType,
      "bookingDate": formatTime(new Date()),
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
    const { groupList } = this.data
    const { id } = e.currentTarget.dataset
    groupList.forEach((item: any) => {
      if (item.id === id) {
        item.selected = item.selected ? false : true
      }
    })
    this.setData({
      groupList
    })
  },

  // 确认叫车， 叫车前要先选择车型
  handleSubmit() {
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
  },
})

export default {}