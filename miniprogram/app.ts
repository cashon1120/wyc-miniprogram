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
    const token = wx.getStorageSync('token')
    if(!token){
      wx.login({
        success: (response: any) => {
          GetUserInfo(response.code).then((res: any) => {
            const {nickName, avatarUrl, token} = res.data
            if(res.code === 0){
              if(nickName){
                wx.setStorage({
                  key: 'userInfo',
                  data: {
                    nickName,
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
    }
  },
})