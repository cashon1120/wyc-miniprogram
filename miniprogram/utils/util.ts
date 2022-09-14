export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('-') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}


export const checkUserPhone = () => {
  try{
    var value = wx.getStorageSync('userPhone')
    if (!value) {
     wx.navigateTo({
       url: '/pages/getPhone/index'
     })
     return
    }
    return value
  }catch(e: any){
    console.log('获取失败')
  }
}