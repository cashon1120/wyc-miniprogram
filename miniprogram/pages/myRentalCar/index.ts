import {GetRentalCarList} from '../../api/index'
import {formatTime} from '../../utils/util'

Page<any, any>({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    data: [[]],
    lastDataCount: 0,
    loading: false
  },
  onLoad() {
    this.getData()
  },

  onReachBottom(){
    const {lastDataCount, loading} = this.data
    if(lastDataCount < 10 || loading) return
    this.setData({
      page: this.data.page + 1
    }, this.getData)
  },

  getData(){
    this.setData({
      loading: true
    })
    GetRentalCarList({page: this.data.page, pageSize: 10, rentUserId: wx.getStorageSync('userID')}).then((res: any) => {
      if(res.code !== 0) return
      const {dataList} = res.data
      const {data, page} = this.data
      for(let i = 0; i < dataList.length; i++){
        dataList[i].createTime = formatTime(new Date(dataList[i].createTime * 1000))
        // dataList[i].status = statusEnum[dataList[i].status]
      }
      const key = `data[${page - 1}]`
      this.setData({
        [key]: dataList,
        lastDataCount: dataList.length
      })
    }).finally(() => {
      this.setData({
        loading: false
      })
    })
  }
})