import { MeetingDriverAdd } from '../../../api/index'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formItem: [
      { label: '司机姓名', name: 'driverName', value: '', placeholder: '请输入姓名或公司名称', type: 'input', required: { message: '请输入司机姓名' } },
      { label: '手机号', maxLength: 11, name: 'phone', value: '', placeholder: '请输入手机号', type: 'input', inputType: 'number', required: { message: '请输入手机号' }, validate: { message: '请输入正确的11位手机号', exec: (phone: string) => /^1\d{10}$/.test(phone) } },
      { label: '车型',  name: 'vehicleModel', value: '', type: 'input', required: { message: '请输入车型' }, placeholder: '请输入车型', },
      { label: '车辆颜色',  name: 'vehicleColor', value: '', type: 'input', required: { message: '请输入车辆颜色' } ,placeholder: '请输入车辆颜色',},
      { label: '车牌号',  name: 'plateNumber', value: '', type: 'input', required: { message: '请输入车牌号' }, placeholder: '请输入车牌号', },
      { label: '是否有网约出租车驾驶证',  name: 'isOnlineDrivingLicense', value: '', type: 'radio', data: [{label: '是', value: true}, {label: '否', value: false}], required: { message: '请选择是否有网约出租车驾驶证' } },
      { label: '备注',  name: 'remark', value: '', type: 'textarea', placeholder: '备注留言'},
    ],
    loading: false
  },

  onLoad() {
    app.globalData.uploadUrl = 'rentOnlineDriverLicenceApplication/upload'
  },
  handleFormChange(e: any) {
    this.setData({
      formItem: e.detail
    })
  },
  handleSubmit(e: any) {
    this.setData({
      loading: true
    })
    MeetingDriverAdd(e.detail).then((res: any) => {
      if (res.code === 0) {
        switch (res.data.code) {
          case 0:
            wx.redirectTo({
              url: '/pages/success/index'
            })
            break;
          case 1:
            wx.showToast({
              title: '操作失败',
              icon: 'none'
            })
            break;
        }
      }
    }).finally(() => {
      this.setData({
        loading: false
      })
    })
  },
})