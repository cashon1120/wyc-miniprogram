import {GetRentalCarList} from '../../api/index'
import {formatTime} from '../../utils/util'
const statusEnum: any = {
  1: '审核中',
  2: '已通过',
  3: '已撤销',
  4: '不通过',
}

Page<any, any>({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    data: [],
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
      const {data: {dataList}, dataCount} = res
      for(let i = 0; i < dataList.length; i++){
        dataList[i].createTime = formatTime(new Date(dataList[i].createTime * 1000))
        // dataList[i].status = statusEnum[dataList[i].status]
      }
      this.setData({
        data: [...this.data.data, ...dataList],
        lastDataCount: dataCount
      })
    }).finally(() => {
      this.setData({
        loading: false
      })
    })
  }
})