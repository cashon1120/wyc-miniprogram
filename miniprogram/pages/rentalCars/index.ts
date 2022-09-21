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
      {label: '选择车型', name: 'age', value: '', placeholder: '请选择租车车型', type: 'picker', range: ageArray, required: {message: '请选择租车车型'}},
      {label: '租车开始时间', name: 'beginTime', value: '', placeholder: '请选择租车开始时间', type: 'picker', mode: 'date', required: {message: '请选择租车开始时间'}},
      {label: '租车结束时间', name: 'endTime', value: '', placeholder: '请选择租车结束时间', type: 'picker', mode: 'date', required: {message: '请选择租车结束时间'}},
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