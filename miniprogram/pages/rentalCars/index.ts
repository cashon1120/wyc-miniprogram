import { AddRentalCarOrder } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    formItem: [
      // {label: '租车平台', name: 'platform', value: '', placeholder: '请选择租车平台', type: 'picker', range: [{ id: 1, name: '曹操' }, { id: 2, name: '滴滴' }], required: {message: '请选择租车平台'}},
      { label: '姓名', name: 'userName', value: '', placeholder: '请输入您的姓名', type: 'input', required: { message: '请输入您的姓名' } },
      { label: '联系方式', name: 'phone', value: '', placeholder: '请输入您的手机号', type: 'input', inputType: 'number', required: { message: '请输入您的手机号' }, validate: { message: '请输入正确的11位手机号', exec: (phone: string) => /^1\d{10}$/.test(phone) } },
      { label: '住址', name: 'addr', value: '', placeholder: '请输入您的住址', type: 'input', required: { message: '请输入您的住址' } },
      // {label: '所在城市', name: 'region', value: '', placeholder: '请选择省份城市与地区', type: 'picker', mode: 'region', required: {message: '请选择省份城市与地区'}},
      // {label: '选择车型', name: 'age', value: '', placeholder: '请选择租车车型', type: 'picker', range: ageArray, required: {message: '请选择租车车型'}},
      // {label: '租车开始时间', name: 'beginTime', start: formatTime(new Date()), value: '', placeholder: '请选择租车开始时间', type: 'picker', mode: 'date', required: {message: '请选择租车开始时间'}},
      // {label: '租车结束时间', name: 'endTime', start: formatTime(new Date()), value: '', placeholder: '请选择租车结束时间', type: 'picker', mode: 'date', required: {message: '请选择租车结束时间'}},
    ]
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
    AddRentalCarOrder({ ...e.detail, rentUserId: wx.getStorageSync('userID') }).then((res: any) => {
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
              title: '申请已存在',
              icon: 'none'
            })
            break;
          case 3:
            wx.showToast({
              title: '姓名不能为空',
              icon: 'none'
            })
            break;
          case 4:
            wx.showToast({
              title: '手机号不能为空',
              icon: 'none'
            })
            break;
          case 6:
            wx.showToast({
              title: '重复申请',
              icon: 'none'
            })
            break;
          case 7:
            wx.showToast({
              title: '登录失效',
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
  }
})