Page({
  data: {
    showPhoneCall: false
  },
  toggleShow(){
    this.setData({
      showPhoneCall: !this.data.showPhoneCall
    })
  },

  handleMakePhoneCall(){
    wx.makePhoneCall({
      phoneNumber: '028-61301149'
    })
  }
})