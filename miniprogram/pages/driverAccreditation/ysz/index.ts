import { DriverAccreditationTransport } from '../../../api/index'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formItem: [
      { label: '您的姓名', name: 'driverName', value: '', placeholder: '请输入您的姓名', type: 'input', required: { message: '请输入您的姓名' } },
      { label: '您的手机号', name: 'phone', value: '', placeholder: '请输入您的手机号', type: 'input', inputType: 'number', required: { message: '请输入您的手机号' }, validate: { message: '请输入正确的11位手机号', exec: (phone: string) => /^1\d{10}$/.test(phone) } },
      { label: '身份证', inline: true, name: 'identityCardFont', value: '', type: 'upload', uploadText: '上传正页', required: { message: '请上传身份证正页' }, template: 1, des: '请上传身份证正页' },
      { label: '', inline: true, name: 'identityCardBack', value: '', type: 'upload', uploadText: '上传副页', required: { message: '请上身份证副页' }, template: 2, des: '请上身份证副页' },
      { label: '驾驶证', inline: true, name: 'drivingLicenceFont', value: '', type: 'upload', uploadText: '上传正页', required: { message: '请上传驾驶证正页' }, template: 3, des: '请上传驾驶证正页' },
      { label: '', inline: true, name: 'drivingLicenceBack', value: '', type: 'upload', uploadText: '上传副页', required: { message: '请上传驾驶证副页' }, template: 4, des: '请上传驾驶证副页' },
      { label: '登记证书', des: '请将证书左右打开拍照', name: 'registrationCertificateUrl', value: '', type: 'upload', required: { message: '请选择无犯罪记录证明' }, template: 5 },
      { label: '车辆正面45度角', name: 'vehicleUrl', value: '', type: 'upload', required: { message: '请上传车辆正面45度角' } },
      { label: '车辆品牌', name: 'brand', value: '', placeholder: '请输入车辆品牌', type: 'input', inputType: 'number' },
      { label: '车辆型号', name: 'model', value: '', placeholder: '请输入车辆型号', type: 'input', inputType: 'number' },
    ],
    loading: false
  },
  onLoad() {
    app.globalData.uploadUrl = 'rentRoadTransportLicenceApplication/upload'
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
    DriverAccreditationTransport({...e.detail, userID: wx.getStorageSync('userID')}).then((res: any) => {
      if (res.code === 0) {
        wx.navigateBack()
      }
    }).finally(() => {
      this.setData({
        loading: true
      })
    })
  }
})