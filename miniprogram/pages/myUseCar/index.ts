import {GetMeetingUseCar} from '../../api/index'
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
    GetMeetingUseCar({page: this.data.page, pageSize: 10, rentUserId: wx.getStorageSync('userID')}).then((res: any) => {
      if(res.code !== 0) return
      const {dataList} = res.data
      const {page} = this.data
      for(let i = 0; i < dataList.length; i++){
        dataList[i].beginTime = formatTime(new Date(dataList[i].beginTime * 1000), 'YYYY-MM-DD hh:mm')
        dataList[i].endTime = formatTime(new Date(dataList[i].endTime * 1000), 'YYYY-MM-DD hh:mm')
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