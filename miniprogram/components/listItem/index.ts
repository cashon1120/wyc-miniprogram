// components/listItem/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label: String,
    url: String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleOpenPage(){
      wx.navigateTo({
        url: this.data.url
      })
    }
  }
})
