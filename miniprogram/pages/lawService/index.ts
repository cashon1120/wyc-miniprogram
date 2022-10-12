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
    const {value} = e.currentTarget.dataset
    wx.makePhoneCall({
      phoneNumber: value
    })
  }
})