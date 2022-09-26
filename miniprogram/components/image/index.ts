// components/image/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleShowImg(){
      this.setData({
        url: this.data.src
      })
    },
    handleHideImg(){
      this.setData({
        url: ''
      })
    }
  }
})
