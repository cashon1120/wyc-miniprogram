// components/formInput/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object
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
    bindFormChange(e: any) {
      this.triggerEvent('change', {name: e.currentTarget.dataset.name, value: e.detail.value})
    },
  }
})
