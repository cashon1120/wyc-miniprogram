import { DriverAccreditationTransport } from '../../../api/index'
import { checkFormValue, composeForm } from '../../../utils/util'

const app = getApp()
Page<any, any>({

  /**
   * 页面的初始数据
   */
  data: {
    steps: ['上传身份证', '上传行驶证', '提交车辆信息'],
    stepIndex: 0,
    formItem: {

      identityCardFont: { label: '身份证', inline: true, name: 'identityCardFont', value: '', defaultValue: '/images/idcard_1.png', type: 'upload', uploadText: '上传人像面', required: { message: '请上传身份证人像面' }, step: 0, uploadType: 'idCard' },
      identityCardBack: { label: '', inline: true, name: 'identityCardBack', value: '', defaultValue: '/images/idcard_2.png', type: 'upload', uploadText: '上传副页', required: { message: '请上身份证国徽面' }, step: 0 },
      driverName: { label: '您的姓名', name: 'driverName', value: '', placeholder: '请输入您的姓名', type: 'input', required: { message: '请输入您的姓名' }, step: 0 },
      idCard: { label: '您的身份证号', name: 'idCard', value: '', maxLength: 18, placeholder: '请输入您的身份证号', type: 'input', required: { message: '请输入您的身份证号' }, step: 0 },
      phone: { label: '您的手机号', maxLength: 11, name: 'phone', value: '', placeholder: '请输入您的手机号', type: 'input', inputType: 'number', required: { message: '请输入您的手机号' }, validate: { message: '请输入正确的11位手机号', exec: (phone: string) => /^1\d{10}$/.test(phone) }, step: 0 },

      drivingLicenceFont: { label: '行驶证', inline: true, name: 'drivingLicenceFont', value: '', defaultValue: '/images/drivecard_1.png', type: 'upload', required: { message: '请上传行驶证正页' }, step: 1, uploadType: 'drivingLicence' },
      drivingLicenceBack: {label: '', inline: true, name: 'drivingLicenceBack', value: '', defaultValue: '/images/drivecard_2.png', type: 'upload', required: { message: '请上传行驶证副页' }, step: 1, },
      plateNumber: { label: '车牌号', name: 'plateNumber', value: '', placeholder: '请输入您的车牌号', type: 'input', required: { message: '请输入您的车牌号' }, step: 1 },

      registrationCertificateUrl: { label: '登记证书', des: '请将证书左右打开拍照', name: 'registrationCertificateUrl', defaultValue: '/images/drivecard_1.png', value: '', type: 'upload', required: { message: '请选择无犯罪记录证明' }, step: 2},
      vehicleUrl: { label: '车辆正面45度角', name: 'vehicleUrl', value: '', type: 'upload', required: { message: '请上传车辆正面45度角' }, defaultValue: '/images/car_45.png', step: 2 },
      brand: { label: '车辆品牌', name: 'brand', value: '', placeholder: '请输入车辆品牌', type: 'input', step: 2 },
      model: { label: '车辆型号', name: 'model', value: '', placeholder: '请输入车辆型号', type: 'input', step: 2 },
    },
    loading: false
  },
  onLoad() {
    app.globalData.uploadUrl = 'rentRoadTransportLicenceApplication/upload'
  },

  handleFormChange(e: any) {
    const {name, value} = e.detail
    this.data.formItem[name].value = value
    this.setData({
      formItem: {...this.data.formItem}
    })
  },

  handleNext() {
    const {formItem, stepIndex} = this.data
    if(stepIndex >= 2){
      this.handleSubmit(composeForm(formItem))
      return
    }
    if(checkFormValue(formItem, stepIndex)){
      this.setData({
        stepIndex: stepIndex + 1
      })
    }
  },

  handleUpload(e: any) {
    const {name, value, plateNumber, userName, idCard} = e.detail
    console.log('name', name)
    if(plateNumber){
      this.data.formItem['plateNumber'].value = plateNumber
    }
    if(userName){
      this.data.formItem['driverName'].value = userName
      this.data.formItem['idCard'].value = idCard
    }
    this.data.formItem[name].value = value
    this.setData({
      formItem: {...this.data.formItem}
    })
  },

  handleSubmit(formData: any) {
    this.setData({
      loading: true
    })
    DriverAccreditationTransport({ ...formData, rentUserId: wx.getStorageSync('userID') }).then((res: any) => {
      if (res.code === 0) {
        switch (res.data.code) {
          case 0:
            wx.redirectTo({
              url: '/pages/success/index'
            })
            break;
          case 1:
            wx.showToast({
              title: '申请失败',
              icon: 'none'
            })
            break;
          case 2:
            wx.showToast({
              title: '您已申请',
              icon: 'none'
            })
            break;
        }
      }
    }).finally(() => {
      this.setData({
        loading: true
      })
    })
  },
})