import {GetUserInfo} from './api/index'
import {API_URL} from './config/index'
App<IAppOption>({
  globalData: {
      toUrl: '',
      userInfo: {
        avatarUrl: '',
        nickName: '',
        userName: '',
      }
  },
  onLaunch() {
    wx.login({
      success: (response: any) => {
        GetUserInfo(response.code).then((res: any) => {
          const {nickName, avatarUrl, phone, token} = res.data
          if(res.code === 0){
            if(nickName && phone){
              wx.setStorage({
                key: 'userInfo',
                data: {
                  nickName,
                  phone,
                  avatarUrl: `${API_URL}rentUser/down?path=/${avatarUrl}`
                }
              })
            }
            wx.setStorage({
              key: 'token',
              data: token
            })
          }
        })
      }
    })
  },
})