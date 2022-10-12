import { DriverAccreditation } from '../../../api/index'
import { checkFormValue, composeForm } from '../../../utils/util'

const app = getApp()
Page<any, any>({

  /**
   * 页面的初始数据
   */
  data: {
    steps: ['上传身份证', '上传驾驶证', '上传居住证'],
    stepIndex: 0,
    formItem: {
      photo: { label: '白色背景半身照', name: 'photo', value: '', defaultValue: '/images/photo.png', type: 'upload', required: { message: '请上传白色背景半身照' }, step: 0 },

      identityCardFont: { label: '身份证', inline: true, name: 'identityCardFont', value: '', defaultValue: '/images/idcard_1.png', type: 'upload', uploadText: '上传人像面', required: { message: '请上传身份证人像面' }, step: 0, uploadType: 'idCard' },

      identityCardBack: { label: '', inline: true, name: 'identityCardBack', value: '', defaultValue: '/images/idcard_2.png', type: 'upload', uploadText: '上传副页', required: { message: '请上身份证国徽面' }, step: 0 },
      driverName: { label: '您的姓名', name: 'driverName', value: '', placeholder: '请输入您的姓名', type: 'input', required: { message: '请输入您的姓名' }, step: 0 },
      idCard: { label: '您的身份证号', name: 'idCard', value: '', maxLength: 18, placeholder: '请输入您的身份证号', type: 'input', required: { message: '请输入您的身份证号' }, step: 0 },
      phone: { label: '您的手机号', maxLength: 11, name: 'phone', value: '', placeholder: '请输入您的手机号', type: 'input', inputType: 'number', required: { message: '请输入您的手机号' }, validate: { message: '请输入正确的11位手机号', exec: (phone: string) => /^1\d{10}$/.test(phone) }, step: 0 },
      driverLicenceFont: { label: '驾驶证', inline: true, name: 'driverLicenceFont', value: '', defaultValue: '/images/drivecard_1.png', type: 'upload', required: { message: '请上传驾驶证正页' }, step: 1 },
      driverLicenceBack: { label: '', inline: true, name: 'driverLicenceBack', value: '', defaultValue: '/images/drivecard_2.png', type: 'upload', required: { message: '请上传驾驶证副页' }, step: 1 },
      residencePermit: { label: '居住证(成都市外)', name: 'residencePermit', value: '', defaultValue: '/images/residence.png', type: 'upload', step: 2 },
      otherCertificateList: { label: '无犯罪记录证明', name: 'otherCertificateList', value: [], type: 'upload', count: 6 , step: 2},
    },
    loading: false
  },
  onLoad() {
    app.globalData.uploadUrl = 'rentOnlineDriverLicenceApplication/upload'
  },

  handleUploadPhoto() {
    const uploadComponent = this.selectComponent('#uploadPhoto');
    uploadComponent.handleUpload()
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
    const {name, value, userName, idCard} = e.detail
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
    DriverAccreditation({ ...formData, rentUserId: wx.getStorageSync('userID') }).then((res: any) => {
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
        loading: false
      })
    })
  },
})