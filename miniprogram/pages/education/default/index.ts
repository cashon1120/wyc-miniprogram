// pages/education/default/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [{ name: '继续教育通道1', appId: 'wxedf56f5ac4a0169e', path: 'pages/index' }, { name: '继续教育通道2', appId: 'wxe2af845c134775d9', path: 'pages/index/index' }, { name: '继续教育通道3', appId: 'wx071174be7e8a0961', path: '' },]
  },

  handleOpenApp(e: any) {
    const { appId, path } = e.currentTarget.dataset.value
    wx.navigateToMiniProgram({
      appId,
      path
    })
  }
})