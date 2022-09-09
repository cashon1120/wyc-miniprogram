import { GetPhoneNumber } from '../../api/index'
import {KD_PT} from '../../config/index'

Page({

  onLoad() {
    try{
      var value = wx.getStorageSync('userPhone')
      if (value) {
        wx.redirectTo({
          url: `plugin://kdPlugin/index?pt=${KD_PT}&phone=${value}`
        })
      }
    }catch(e: any){
      console.log('获取失败')
    }
  },

  handleGetPhoneNumber(e: any) {
    // pt: 渠道号, phone: 用户手机号 两个必填
    if (!e) return
    GetPhoneNumber(e.detail.code).then((res: any) => {
      if (res.code === 0 && res.data) {
        wx.setStorage({
          key: 'userPhone',
          data: res.data
        })
        wx.redirectTo({
          url: `plugin://kdPlugin/index?pt=${KD_PT}&phone=${res.data}`
        })
      }
    })
  }

})