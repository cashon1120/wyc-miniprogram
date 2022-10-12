import {KD_PT} from '../../config/index'
import {getUserInfo} from '../../utils/util'
Page({
  data: {
    showPhone: false
  },

  onShow(){
    const userInfo = getUserInfo()
    if(userInfo){
      wx.redirectTo({
        url: `plugin://kdPlugin/index?pt=${KD_PT}&phone=${userInfo.phone}`
      })
    }
  }
})
