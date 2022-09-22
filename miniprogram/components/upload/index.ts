// components/upload/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: String,
    value: String,
    uploadText: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    progress: '0%',
    loading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clearimage(){
      if(this.data.loading) return
      this.triggerEvent('change', {name: this.data.name, filePath: ''})
    },
    chooseimage(){
      if(this.data.loading) return
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        success: (res: any) => {
          this.setData({
            loading: true,
            progress: '20%'
          })
          setTimeout(() => {
            this.setData({
              progress: '50%'
            })
          }, 1000);
          setTimeout(() => {
            this.setData({
              progress: '100%'
            })
          }, 2000);
          setTimeout(() => {
            this.setData({
              loading: false
            })
          }, 3000);
          this.triggerEvent('change', {name: this.data.name, value: res.tempFiles[0].tempFilePath})
          // const uploadTask = wx.uploadFile({
          //   url: '',
          //   filePath: res.tempFiles[0].tempFilePath,
          //   name: 'file',
          //   success: (res: any) => {
          //     console.log(res)
          //   }
          // })
          // uploadTask.onProgressUpdate((res: any) => {
              // this.setData({
              //   progress: res.progress
              // })
          // })
        },
      })
    }
  }
})
