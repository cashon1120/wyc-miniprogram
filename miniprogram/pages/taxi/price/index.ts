import { GetFarePredictionV2, GetFixedPrice } from '../../../api/index'
import { TMAP_KEY } from '../../../config/index'

const app = getApp();

interface IData {}

interface IPage {
  mapCtx: any
  handleSubmit: Function
}


Page<IData, IPage>({
  mapCtx: null,
  data: {
    markers: [],
    points: [],
    polyline: []
  },

  onLoad() {
    const { startAddress, endAddress } = app.globalData
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
      }]
    })
    this.mapCtx.includePoints({
      padding: [100],
      points: [{
        latitude: startAddress.latitude,
        longitude: startAddress.longitude
      }, {
        latitude: endAddress.latitude,
        longitude: endAddress.longitude
      }]
    })

    const params = {
      "serviceType": "即时用车",
      "bookingDate": "",
      "cityId": 778,
      "bookingStartPointLo": startAddress.latitude,
      "bookingStartPointLa": startAddress.longitude,
      "bookingEndPointLo": endAddress.latitude,
      "bookingEndPointLa": endAddress.longitude,
      "groupId": 1,
      "personNum": 1
    }
    GetFarePredictionV2(params).then((res: any) => {
      if (res.code === 'success') {
        console.log(res)
      }
    })
    GetFixedPrice(params).then((res: any) => {
      if (res.code === 'success') {
        console.log(res)
      }
    })
    wx.request({
      url: `https://apis.map.qq.com/ws/direction/v1/driving/?from=${startAddress.latitude},${startAddress.longitude}&to=${endAddress.latitude},${endAddress.longitude}&output=json&key=${TMAP_KEY}`,
      method: 'GET',
      success: (res: any) => {
        console.log('获取地址', res)
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

  handleSubmit() {
    console.log('submit')
  },
})

export default {}