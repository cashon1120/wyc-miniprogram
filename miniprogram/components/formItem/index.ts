// components/formItem/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    formItem: Array
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
    submit() {
      const {formItem} = this.data
      let error = false
      let value: any = {}
      for(let i = 0; i < formItem.length; i++){
        const item = formItem[i]
        value[item.name] = item.value
        if(item.required && (item.value === '' || item.value.length === 0)){
          wx.showToast({
            title: item.required.message,
            icon: 'none'
          })
          error = true
          break
        }
      }
      if(error) return
      this.triggerEvent('submit', value)
    },
    
    bindFormChange(e: any){
      const formItem = this.data.formItem
      formItem.forEach((item: any) => {
        if(item.name === e.currentTarget.dataset.name){
          item.value = e.detail.value
        }
      })
      this.triggerEvent('change', this.data.formItem)
    },

    bindUploadChange(e: any){
      this.data.formItem.forEach((item: any) => {
        if(item.name === e.detail.name){
          item.value = e.detail.filePath
        }
      })
      this.triggerEvent('change', this.data.formItem)
    }
  }
})
