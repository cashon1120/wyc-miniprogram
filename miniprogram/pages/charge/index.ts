import {KD_PT} from '../../config/index'
import {checkUserPhone} from '../../utils/util'
Page({
  data: {
    showPhone: false
  },
  onLoad() {
    const phone = checkUserPhone()
    if(phone){
      this.handleGetPhoneCallback()
    }else{
      this.setData({
        showPhone: true
      })
    }
  },

  handleGetPhoneCallback(){
    const phone = checkUserPhone()
    wx.redirectTo({
      url: `plugin://kdPlugin/index?pt=${KD_PT}&phone=${phone}`
    })
  }

})