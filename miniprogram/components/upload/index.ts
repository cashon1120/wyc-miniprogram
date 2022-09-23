import {API_URL} from '../../config/index'
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: String,
    value: String,
    uploadText: String,
    count: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageData: [{
      loading: false,
      value: '',
      progress: '0%',
      tem_value: '',
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    formatData(){
      const result: string[] = []
      this.data.imageData.forEach((item: any)  => {
        if(item.value){
          result.push(item.value)
        }
      })
      if(this.data.count > 1){
        return result
      }
      return this.data.imageData[0].value
    },
    clearimage(e: any){
      const {index} = e.currentTarget.dataset
      const {imageData, count} = this.data
      if(this.data.imageData[index].loading) return
      if(count > 1){
        if(imageData.length > 1){
          this.data.imageData.splice(index, 1)
        }else{
          this.data.imageData[0].tem_value = ''
          this.data.imageData[0].value = ''
        }
      }else{
        this.data.imageData[0].tem_value = ''
        this.data.imageData[0].value = ''
      }
      
      this.setData({
        imageData: [...imageData]
      }, () => {
        this.triggerEvent('change', {name: this.data.name, value: this.formatData()})
      })
    },
    chooseimage(e: any){
      const {index, type} = e.currentTarget.dataset
      const {imageData, count} = this.data
      if(imageData[index].loading) return
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        success: (res: any) => {
          if(count > 1 && !type){
            imageData.push({
              value: '',
              tem_value: '',
              loading: false,
              progress: '0%',
            })
          }
          imageData[index].loading = true
          const {tempFilePath} = res.tempFiles[0]
          imageData[index].tem_value = tempFilePath
          this.setData({
            imageData: [...imageData]
          })

          const uploadTask = wx.uploadFile({
            url: `${API_URL}${app.globalData.uploadUrl}`,
            filePath: tempFilePath,
            name: 'file',
            formData: {
              id: 0
            },
            success: (res: any) => {
              const data = JSON.parse(res.data).data
              const {code, path} = data
              if(code === 0){
                imageData[index].value = path
                this.setData({
                  imageData: [...imageData]
                }, () => {
                  this.triggerEvent('change', {name: this.data.name, value: this.formatData()})
                })
              }
            },
            complete: () => {
              imageData[index].loading = false
              this.setData({
                imageData: [...imageData]
              })
            }
          })

          uploadTask.onProgressUpdate((res: any) => {
            console.log('progress', res)
            imageData[index].progress = res.progress + '%'
              this.setData({
                imageData: [...imageData]
              })
          })
        },
      })
    }
  }
})
