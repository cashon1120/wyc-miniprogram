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
      phoneNumber: e.currentTarget.dataset.value
    })
  }
})