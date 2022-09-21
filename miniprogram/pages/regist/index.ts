import {ageArray} from '../../utils/enum'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formItem: [
      {label: '租车平台', name: 'platform', value: '', placeholder: '请选择租车平台', type: 'picker', range: [{ id: 1, name: '曹操' }, { id: 2, name: '滴滴' }], required: {message: '请选择租车平台'}},
      {label: '您的姓名', name: 'userName', value: '', placeholder: '请输入您的姓名', type: 'input', required: {message: '请输入您的姓名'}},
      {label: '您的手机号',  name: 'phone', value: '', placeholder: '请输入您的手机号', type: 'input', inputType: 'number', required: {message: '请输入您的手机号'}},
      {label: '所在城市', name: 'region', value: '', placeholder: '请选择省份城市与地区', type: 'picker', mode: 'region', required: {message: '请选择省份城市与地区'}},
      {label: '您的实际驾龄', name: 'age', value: '', placeholder: '请选择您的实际驾龄', type: 'picker', range: ageArray, required: {message: '请选择您的实际驾龄'}},
      {label: '您是否有网络预约出租车驾驶证', name: 'driveID', value: '', type: 'radio', data: [{label: '是', value: 1}, {label: '否', value: 0}], required: {message: '请选择是否有网络预约出租车驾驶证'}},
      {label: '上传图片', name: 'image', value: '', type: 'upload', required: {message: '请选择图片'}},
    ]
  },

  handleFormChange(e: any){
    this.setData({
      formItem: e.detail
    })
  },
  handleSubmit(e: any) {
    console.log(e.detail)
  }
})