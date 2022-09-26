import { DriverAccreditation, GetDriverAccreditation, CancelDriverAccreditation } from '../../../api/index'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasData: false,
    formData: {},
    formItem: [
      { label: '您的姓名', name: 'driverName', value: '', placeholder: '请输入您的姓名', type: 'input', required: { message: '请输入您的姓名' } },
      { label: '您的手机号', maxLength: 11, name: 'phone', value: '', placeholder: '请输入您的手机号', type: 'input', inputType: 'number', required: { message: '请输入您的手机号' }, validate: { message: '请输入正确的11位手机号', exec: (phone: string) => /^1\d{10}$/.test(phone) } },
      { label: '白色背景半身照', name: 'photo', value: '', type: 'upload', required: { message: '请上传白色背景半身照' } },
      { label: '身份证', inline: true, name: 'identityCardFont', value: '', type: 'upload', uploadText: '上传正页', required: { message: '请上传身份证正页' }, template: 1, des: '请上传身份证正页' },
      { label: '', inline: true, name: 'identityCardBack', value: '', type: 'upload', uploadText: '上传副页', required: { message: '请上身份证副页' }, template: 2, des: '请上身份证副页' },
      { label: '驾驶证', inline: true, name: 'driverLicenceFont', value: '', type: 'upload', uploadText: '上传正页', required: { message: '请上传驾驶证正页' }, template: 3, des: '请上传驾驶证正页' },
      { label: '', inline: true, name: 'driverLicenceBack', value: '', type: 'upload', uploadText: '上传副页', required: { message: '请上传驾驶证副页' }, template: 4, des: '请上传驾驶证副页' },
      { label: '居住证(成都市外)', name: 'residencePermit', value: '', type: 'upload' },
      { label: '无犯罪记录证明', name: 'otherCertificateList', value: '', type: 'upload', count: 6 },
    ],
    loading: false
  },
  onLoad() {
    app.globalData.uploadUrl = 'rentOnlineDriverLicenceApplication/upload'
  },
  onReady() {
    GetDriverAccreditation({ rentUserId: wx.getStorageSync('userID') }).then((res: any) => {
      if (res.code === 0 && res.data) {
        this.setData({
          hasData: true,
          formData: res.data
        })
      }
    })
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
    DriverAccreditation({ ...e.detail, rentUserId: wx.getStorageSync('userID') }).then((res: any) => {
      if (res.code === 0) {
        switch (res.data.code) {
          case 0:
            wx.navigateBack()
            wx.showToast({
              title: '申请成功',
              icon: 'none'
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
  handleCancel() {
    wx.showModal({
      title: '系统提示',
      content: '确定要撤销当前申请吗？',
      success: (res: any) => {
        if (res.confirm) {
          CancelDriverAccreditation({ rentUserId: wx.getStorageSync('userID') }).then((res: any) => {
            if (res.code === 0) {
              switch (res.data.code) {
                case 0:
                  wx.navigateBack()
                  break;
                case 1:
                  wx.showToast({
                    title: '撤销失败',
                    icon: 'none'
                  })
              }
            }
          })
        }
      }
    })
  }
})