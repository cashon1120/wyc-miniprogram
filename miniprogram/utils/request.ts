/* 
  封装 wx.request 
  url: 请求地址
  method: 请求方法
  data: 请求参数
  title: 加载文字信息
*/
import {
    API_URL,
} from '../config/index'
import encryption from './encryption'

const request = function (params: any) {
    const token = wx.getStorageSync('token') || ''
    wx.hideLoading()
    let {
        url,
        method,
        data,
        title,
        disableLoading
    } = params
    title ? null : title = '加载中...'
    if (!disableLoading) {
        wx.showLoading({
            title,
        })
    }
    return new Promise((resolve) => {
        let api = API_URL
        // 加密
        const encryptionObj = encryption(method, url, token)
        let header = {
            ...encryptionObj
        }
        wx.request({
            url: `${api}${url}`,
            method,
            header: {
                rentUserToken: token,
                "authorization": token,
                ...header
            },
            data: {
                ...data,
            },
            success: function (res) {
                wx.hideLoading()
                if (res.statusCode === 401) {
                    wx.removeStorage({
                        key: 'userInfo'
                    })
                    const pages = getCurrentPages()
                    if (pages[pages.length - 1].route !== 'pages/login/login') {
                        wx.redirectTo({
                            url: '/pages/login/login',
                        })
                    }
                    return
                }
                resolve(res.data)
            },
            fail: function () {
                resolve({
                    errorCode: -9999
                })
                wx.hideLoading()
                wx.showToast({
                    title: '请求失败啦!',
                    icon: 'none'
                })
            },
            complete: function () {
                wx.hideLoading()
            }
        })
    })
}

export default request
