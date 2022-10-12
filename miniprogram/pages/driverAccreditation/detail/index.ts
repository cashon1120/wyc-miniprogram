import { CancelDriverAccreditation, CancelDriverAccreditationTransport } from '../../../api/index'

const app = getApp()
const statusEnum: any = {
  1: '审核中',
  2: '已通过',
  3: '已撤销',
  4: '未通过',
}
let type = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {}
  },
  onLoad(options: any) {
    const data = app.globalData.detailData
    this.setData({
      data
    })
    type = options.type
    console.log(type)
    const title = type === 'chezheng' ? '我的车证' : '我的人证'
    const status = statusEnum[data.status]
    wx.setNavigationBarTitle({
      title: `${title}(${status})`,
    })
  },

  handleCancel() {
    wx.showModal({
      title: '系统提示',
      content: '确定要撤销当前申请吗？',
      success: (res: any) => {
        if (res.confirm) {
          const API = type === 'chezheng' ? CancelDriverAccreditationTransport : CancelDriverAccreditation
          API({ rentUserId: wx.getStorageSync('userID') }).then((res: any) => {
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

export default {}