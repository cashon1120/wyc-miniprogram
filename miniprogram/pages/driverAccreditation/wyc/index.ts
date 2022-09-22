// pages/driverAccreditation/wyc/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formItem: [
      { label: '您的姓名', name: 'userName', value: '', placeholder: '请输入您的姓名', type: 'input', required: { message: '请输入您的姓名' } },
      { label: '您的手机号', name: 'phone', value: '', placeholder: '请输入您的手机号', type: 'input', inputType: 'number', required: { message: '请输入您的手机号' } },
      { label: '白色背景半身照', name: 'image1', value: '', type: 'upload', required: { message: '请上传白色背景半身照' } },
      { label: '身份证', inline: true, name: 'image2', value: '', type: 'upload', uploadText: '上传正页', required: { message: '请上传身份证正页' }, template: 1, des: '请上传身份证正页' },
      { label: '', inline: true, name: 'image3', value: '', type: 'upload', uploadText: '上传副页',  required: { message: '请上身份证副页' }, template: 2 , des: '请上身份证副页'},
      { label: '驾驶证', inline: true, name: 'image4', value: '', type: 'upload', uploadText: '上传正页', required: { message: '请上传驾驶证正页' }, template: 3, des: '请上传驾驶证正页' },
      { label: '', inline: true, name: 'image4', value: '', type: 'upload',  uploadText: '上传副页',  required: { message: '请上传驾驶证副页' }, template: 4, des: '请上传驾驶证副页' },
      { label: '居住证', name: 'image4', value: '', type: 'upload', required: { message: '请上传居住证' } },
      { label: '无犯罪记录证明', name: 'image4', value: '', type: 'upload', required: { message: '请选择无犯罪记录证明' } },
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