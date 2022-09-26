// components/formLabel/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
    disableShowRequire: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
    created(){
      console.log(this.data.disableShowRequire)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
