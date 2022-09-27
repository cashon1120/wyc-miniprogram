import {  GetDriverAccreditation, GetDriverAccreditationTransport} from '../../../api/index'
import {formatTime} from '../../../utils/util'
Page({
  data: {
    showPhone: false,
    data1: null,
    data2: null
  },

  onLoad() {
    this.getData()
  },
  getData(){
    GetDriverAccreditation({ rentUserId: wx.getStorageSync('userID') }).then((res: any) => {
      if (res.code === 0 && res.data) {
        res.data.createTime = formatTime(new Date(res.data.createTime * 1000))
        this.setData({
          data1: res.data
        })
      }
    })

    GetDriverAccreditationTransport({ rentUserId: wx.getStorageSync('userID') }).then((res: any) => {
      if (res.code === 0 && res.data) {
        res.data.createTime = formatTime(new Date(res.data.createTime * 1000))
        this.setData({
          data2: res.data
        })
      }
    })
  }
})