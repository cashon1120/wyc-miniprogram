import { DriverAccreditationTransport } from '../../../api/index'
import { checkFormValue, composeForm } from '../../../utils/util'
import { API_URL } from '../../../config/index'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: ['填身份信息', '上传身份证', '上传行驶证', '提交车辆信息'],
    stepIndex: 3,
    formItem: [
      [{ label: '您的姓名', name: 'driverName', value: '', placeholder: '请输入您的姓名', type: 'input', required: { message: '请输入您的姓名' } },
      { label: '您的手机号', name: 'phone', value: '', placeholder: '请输入您的手机号', type: 'input', inputType: 'number', required: { message: '请输入您的手机号' }, validate: { message: '请输入正确的11位手机号', exec: (phone: string) => /^1\d{10}$/.test(phone) } }],

      [{ label: '身份证', inline: true, name: 'identityCardFont', value: '', defaultValue: '/images/idcard_1.png', type: 'upload', uploadText: '上传人像面', required: { message: '请上传身份证人像面' } },
      { label: '', inline: true, name: 'identityCardBack', value: '', defaultValue: '/images/idcard_2.png', type: 'upload', uploadText: '上传副页', required: { message: '请上身份证国徽面' } }],

      [{ label: '行驶证', inline: true, name: 'drivingLicenceFont', value: '', defaultValue: '/images/drivecard_1.png', type: 'upload', required: { message: '请上传行驶证正页' } },
      { label: '', inline: true, name: 'drivingLicenceBack', value: '', defaultValue: '/images/drivecard_2.png', type: 'upload', required: { message: '请上传行驶证副页' } }],

      [{ label: '登记证书', des: '请将证书左右打开拍照', name: 'registrationCertificateUrl', defaultValue: '/images/drivecard_1.png', value: '', type: 'upload', required: { message: '请选择无犯罪记录证明' } },
      { label: '车辆正面45度角', name: 'vehicleUrl', value: '', type: 'upload', required: { message: '请上传车辆正面45度角' }, defaultValue: '/images/car_45.png' },],

      [{ label: '车辆品牌', name: 'brand', value: '', placeholder: '请输入车辆品牌', type: 'input' },
      { label: '车辆型号', name: 'model', value: '', placeholder: '请输入车辆型号', type: 'input' },]

    ],
    loading: false
  },
  onLoad() {
    app.globalData.uploadUrl = 'rentRoadTransportLicenceApplication/upload'
  },
  handleFormChange(e: any) {
    const index = this.data.stepIndex === 3 ? 4 : this.data.stepIndex
    const key = `formItem[${index}]`
    this.setData({
      [key]: e.detail
    })
  },

  handleNext() {
    const { formItem, stepIndex } = this.data
    if (stepIndex >= 3) {
      this.handleSubmit(checkFormValue(composeForm(formItem)))
      return
    }
    if (checkFormValue(formItem[stepIndex])) {
      this.setData({
        stepIndex: stepIndex + 1
      })
    }
  },

  handleUpload(e: any) {
    const { name } = e.currentTarget.dataset
    const { formItem } = this.data
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res: any) => {
        const { tempFilePath } = res.tempFiles[0]
        wx.showLoading({ title: '上传中...' })

        formItem.forEach((item: any) => {
          item.forEach((subItem: any, index: number) => {
            if (subItem.name === name) {
              item[index].defaultValue = tempFilePath
            }
          })
        })
        this.setData({
          formItem: [...formItem]
        })
        wx.uploadFile({
          url: `${API_URL}${app.globalData.uploadUrl}`,
          filePath: tempFilePath,
          name: 'file',
          formData: {
            id: 0
          },
          success: (res: any) => {
            const data = JSON.parse(res.data).data
            const { code, path } = data
            if (code === 0) {
              formItem.forEach((item: any) => {
                item.forEach((subItem: any, index: number) => {
                  if (subItem.name === name) {
                    item[index].value = path
                  }
                })
              })
              this.setData({
                formItem: [...formItem]
              })
            }
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
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
        loading: true
      })
    })
  },
})