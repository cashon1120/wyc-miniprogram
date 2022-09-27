import { GetPhoneNumber } from '../../api/index'

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleGetPhoneNumber(e: any) {
      // pt: 渠道号, phone: 用户手机号 两个必填
      if (!e || !e.detail.code) {
        wx.showToast({
          title: '您拒绝了授权， 无法进行下一步操作',
          icon: 'none'
        })
        return
      }
      GetPhoneNumber(e.detail.code).then((res: any) => {
        if (res.code === 0) {
          if(res.data){
            wx.setStorageSync('userPhone',  res.data)
            this.triggerEvent('callback')
          }else{
            wx.showToast({
              title: '手机获取失败',
              icon: 'none'
            })
          }
  
        }
      })
    }
  }
})
