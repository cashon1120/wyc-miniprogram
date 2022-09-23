Page({
  data: {
    showPhoneCall: false
  },
  toggleShow(){
    this.setData({
      showPhoneCall: !this.data.showPhoneCall
    })
  },

  handleMakePhoneCall(e: any){
    wx.makePhoneCall({
      phoneNumber: '028-61301149'
    })
  }
})