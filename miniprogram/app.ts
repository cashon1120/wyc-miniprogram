import {GetUserInfo} from './api/index'

App<IAppOption>({
  globalData: {
      currentCity: {
        cityName: '',
        cityId: 0
      },
      startAddress: {},
      endAddress: {},
      openCityList: [],
      groupList: [],
      toUrl: '',
      userInfo: {
        avatarUrl: '',
        nickName: '',
        userName: '',
      }
  },
  onLaunch() {
    const token = wx.getStorageSync('token')
    if(!token){
      wx.login({
        success: (response: any) => {
          GetUserInfo(response.code).then((res: any) => {
            if(res.code === 0){
              wx.setStorage({
                key: 'token',
                data: res.data.token
              })
            }
          })
        }
      })
    }
  },
})