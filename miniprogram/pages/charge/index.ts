// pages/charge/default/index.ts
Page({

  onLoad(){

  },

  handleGetPhoneNumber(e: any){
    // pt: 渠道号, phone: 用户手机号 两个必填
    console.log(e)
    wx.navigateTo({
      url: `plugin://kdPlugin/index?pt=12345&phone=13982193130`
    })
  }

})