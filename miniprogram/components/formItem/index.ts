// components/formItem/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    formItem: Array,
    loading: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    showImg: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    submit() {
      const { formItem } = this.data
      let error = false
      let value: any = {}
      for (let i = 0; i < formItem.length; i++) {
        const item = formItem[i]
        if (item.required && (item.value === '' || item.value.length === 0)) {
          wx.showToast({
            title: item.required.message,
            icon: 'none'
          })
          error = true
          break
        }
        if(item.validate){
          if(typeof item.validate.exec === 'function'){
            if(!item.validate.exec(item.value)){
              wx.showToast({
                title: item.validate.message,
                icon: 'none'
              })
              error = true
              break
            }
          }
        }
        if(item.value){
          value[item.name] = item.value
        }
      }
      if (error) return
      this.triggerEvent('submit', value)
    },

    bindFormChange(e: any) {
      this.updateFormValue(e.currentTarget.dataset.name, e.detail.value)
    },

    updateFormValue(name: string, value: any) {
      this.data.formItem.forEach((item: any) => {
        if (item.name === name) {
          item.value = value
        }
      })
      this.triggerEvent('change', [...this.data.formItem])
    },

    bindUploadChange(e: any) {
      this.updateFormValue(e.detail.name, e.detail.value)
    },

    bindDateChange(e: any) {
      this.updateFormValue(e.currentTarget.dataset.name, e.detail.value)
    },

    handleHideShowTemplate() {
      this.setData({
        showImg: ''
      })
    },

    handleShowTemplate(e: any) {
      const { template } = e.currentTarget.dataset
      let showImg = ''
      switch (template) {
        case 1:
          showImg = '/images/idcard_2.png'
          break;
        case 2:
          showImg = '/images/idcard_1.png'
          break;
        case 3:
          showImg = '/images/drivecard_1.png'
          break;
        case 4:
          showImg = '/images/drivecard_2.png'
          break;
        case 5:
          showImg = '/images/djzs.jpeg'
          break;
      }
      this.setData({
        showImg
      })
    }
  }
})
