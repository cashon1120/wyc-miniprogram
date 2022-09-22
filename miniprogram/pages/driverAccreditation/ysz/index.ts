// pages/driverAccreditation/wyc/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formItem: [
      { label: '您的姓名', name: 'userName', value: '', placeholder: '请输入您的姓名', type: 'input', required: { message: '请输入您的姓名' } },
      { label: '您的手机号', name: 'phone', value: '', placeholder: '请输入您的手机号', type: 'input', inputType: 'number', required: { message: '请输入您的手机号' } },
      { label: '身份证', inline: true, name: 'image2', value: '', type: 'upload', uploadText: '上传正页', required: { message: '请上传身份证正页' }, template: 1, des: '请上传身份证正页' },
      { label: '', inline: true, name: 'image3', value: '', type: 'upload', uploadText: '上传副页', required: { message: '请上身份证副页' }, template: 2, des: '请上身份证副页' },
      { label: '驾驶证', inline: true, name: 'image4', value: '', type: 'upload', uploadText: '上传正页', required: { message: '请上传驾驶证正页' }, template: 3, des: '请上传驾驶证正页' },
      { label: '', inline: true, name: 'image4', value: '', type: 'upload', uploadText: '上传副页', required: { message: '请上传驾驶证副页' }, template: 4, des: '请上传驾驶证副页' },
      { label: '登记证书', des: '请将证书左右打开拍照', name: 'image4', value: '', type: 'upload', required: { message: '请选择无犯罪记录证明' }, template: 5, },
      { label: '车辆正面45度角', name: 'image4', value: '', type: 'upload', required: { message: '请上传车辆正面45度角' } },
      { label: '车辆型号及品牌', name: 'brand', value: '', placeholder: '请输入车辆型号及品牌', type: 'input', inputType: 'number', required: { message: '请输入车辆型号及品牌' } },
    ]
  },
  handleFormChange(e: any) {
    this.setData({
      formItem: e.detail
    })
  },
  handleSubmit(e: any) {
    console.log(e.detail)
  }
})