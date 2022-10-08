// components/listItem/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label: String,
    url: String,
    icon: String,
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
    handleTap(){
      if(this.data.url){
        wx.navigateTo({
          url: this.data.url
        })
        return
      }
      this.triggerEvent('click')
    }
  }
})
