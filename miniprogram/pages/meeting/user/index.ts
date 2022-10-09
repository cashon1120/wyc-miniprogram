import { MeetingUserAdd } from '../../../api/index'
import { formatTime} from '../../../utils/util'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formItem: [
      { label: '姓名或公司名称', name: 'userName', value: '', placeholder: '请输入姓名或公司名称', type: 'input', required: { message: '请输入姓名或公司名称' } },
      { label: '手机号', maxLength: 11, name: 'phone', value: '', placeholder: '请输入手机号', type: 'input', inputType: 'number', required: { message: '请输入手机号' }, validate: { message: '请输入正确的11位手机号', exec: (phone: string) => /^1\d{10}$/.test(phone) } },
      { label: '用车开始时间', name: 'beginTime', value: '',placeholder: '请选择用车开始时间', start: formatTime(new Date()), type: 'picker', mode: 'date', required: { message: '请选择用车开始时间' } },
      { label: '用车结束时间', name: 'endTime', value: '', placeholder: '请选择用车结束时间', start: formatTime(new Date()), type: 'picker', mode: 'date',  required: { message: '请选择用车结束时间' }},
      { label: '用车大概行程',  name: 'travel', value: '', type: 'input', required: { message: '请输入用车大概行程' },placeholder: '请输入行程',  },
      { label: '预约车型',  name: 'vehicleModel', value: '', type: 'input', required: { message: '请输入预约车型' }, placeholder: '请输入车型', },
      { label: '用车数量',  name: 'vehicleCount', inputType: 'number', value: '', type: 'input', required: { message: '请输入用车数量' }, placeholder: '请选择用车数量',  },
      { label: '备注',  name: 'remark', value: '', type: 'textarea', placeholder: '备注留言'},
    ],
    loading: false
  },

  onLoad() {
    app.globalData.uploadUrl = 'rentOnlineDriverLicenceApplication/upload'
  },
  handleFormChange(e: any) {
    this.setData({
      formItem: e.detail
    })
  },
  handleSubmit(e: any) {
    const params = {...e.detail}
    params.beginTime =  params.beginTime + ':00'
    params.endTime =  params.endTime + ':00'
    if(new Date(params.beginTime).getTime() >= new Date(params.endTime).getTime()){
      wx.showToast({
        title: '用车结束时间应大于开始时间',
        icon: 'none'
      })
      return
    }
    this.setData({
      loading: true
    })
    MeetingUserAdd(params).then((res: any) => {
      if (res.code === 0) {
        switch (res.data.code) {
          case 0:
            wx.navigateBack()
            wx.showToast({
              title: '操作成功',
              icon: 'none'
            })
            break;
          case 1:
            wx.showToast({
              title: '操作失败',
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