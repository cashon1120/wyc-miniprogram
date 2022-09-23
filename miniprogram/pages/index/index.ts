import {GetUserInfo} from '../../api/index'
let isSetHeight = false
Page({
  data: {
    background: [
      { url: 1, src: '../../images/banner.png' },
    ],
    indicatorDots: false,
    autoplay: false,
    vertical: false,
    interval: 2000,
    duration: 500,
    height: 0,
    items: [
      { url: 'charge', src: '../../images/icon_5.png', label: '充电' },
      { url: 'taxi/default', type: 2, src: '../../images/icon_7.png', label: '打车' },
      { url: 'regist', src: '../../images/icon_2.png', label: '注册平台' },
      { url: 'rentalCars', src: '../../images/icon_3.png', label: '租车' },
      { url: '', src: '../../images/icon_4.png', label: '租房' },
      { url: 'lawService', src: '../../images/icon_6.png', label: '法律服务' },
      // { url: 'driverAccreditation/default', src: '../../images/icon_3.png', label: '司机办证' },
      { url: '', src: '../../images/icon_8.png', label: '会议会展' },
      { url: '', src: '../../images/icon_9.png', label: '生活服务' },
      // { url: 'education', src: '../../images/icon_1.png', label: '安全教育' },
      // { url: 'taxi/default', type: 1, src: '../../images/icon_7.png', label: '打车(直接跳)' },
    ]
  },

  onLoad(){
    const userID = wx.getStorageSync('userID')
    if(!userID){
      wx.login({
        success: (response: any) => {
          GetUserInfo(response.code).then((res: any) => {
            if(res.code === 0){
              wx.setStorage({
                key: 'userID',
                data: res.data.id
              })
            }
          })
        }
      })
    }
    
  },
  imageLoad: function () { //获取图片真实宽度  
    if(isSetHeight) return
    let query = wx.createSelectorQuery()
    isSetHeight = true
    query.select('.banner-img-0').boundingClientRect(res => {
      this.setData({
        height: res.height
      })
    })
    query.exec()
  },

  handleNavigate(e: any) {
    const { url } = e.currentTarget.dataset
    if(!url) {
      wx.showToast({
        title: '该功能尚未开放',
        icon: 'none'
      })
      return
    }

    wx.navigateTo({
      url: `/pages/${url}/index`,
    })
  }
})

export default {}