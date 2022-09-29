import { API_URL } from '../../config/index'
const app = getApp()
Component({
  properties: {
    data: Object,
    name: String,
    title: String,
    size: String,
    scale: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    tempUrl: '',
    id: '',
    height: 'auto',
    loading: false,
    progress: '0%',
  },

  lifetimes: {
    ready() {
      this.setData({
        tempUrl: this.data.data.defaultValue,
        id: (Math.random() * 100000).toFixed(0)
      }, () => {
        wx.createSelectorQuery().in(this).select(`#image_${this.data.id}`).boundingClientRect((res) => {
          if(!res) return
          const { width } = res
          this.setData({
            height: (width * (this.data.scale || 1)).toFixed(0) + 'px'
          })
        }).exec();
      })
    }
  },

  methods: {
    handleUpload() {
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        success: (res: any) => {
          const { tempFilePath } = res.tempFiles[0]
          this.setData({
            loading: true,
            tempUrl: tempFilePath
          })
          const uploadTask = wx.uploadFile({
            url: `${API_URL}${app.globalData.uploadUrl}`,
            filePath: tempFilePath,
            name: 'file',
            formData: {
              id: 0
            },
            success: (res: any) => {
              const { code, path } = JSON.parse(res.data).data
              const { name } = this.data
              if (code === 0) {
                this.triggerEvent('upload', { name, value: path })
              }
            },
            fail: () => {
              wx.showToast({
                title: '上传失败,请重新上传'
              })
              this.setData({
                tempUrl: this.data.data.defaultValue,
              })
            },
            complete: () => {
              this.setData({
                loading: false
              })
            }
          })
          uploadTask.onProgressUpdate((res: any) => {
              this.setData({
                progress: res.progress + '%'
              })
          })
        },
      })
    }
  }
})
