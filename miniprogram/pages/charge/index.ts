import {KD_PT} from '../../config/index'
import {checkUserPhone} from '../../utils/util'
Page({

  onShow() {
    const phone = checkUserPhone()
    if(phone){
      wx.redirectTo({
        url: `plugin://kdPlugin/index?pt=${KD_PT}&phone=${phone}`
      })
    }
  },
 
})