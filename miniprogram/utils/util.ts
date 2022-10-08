export const formatTime = (date: Date, format?: String) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const YMD = [year, month, day].map(formatNumber).join('-')
  const HMS = [hour, minute, second].map(formatNumber).join(':')
  const HM = [hour, minute].map(formatNumber).join(':')
  if(!format){
    return ( YMD + ' ' + HMS)
  }
  if(format === 'YYYY-MM-DD hh:mm'){
    return ( YMD + ' ' + HM)
  }
  if(format === 'YYYY-MM-DD'){
    return YMD
  }
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export const checkUserPhone = () => {
  try {
    return wx.getStorageSync('userPhone')
  } catch (e: any) {
    console.log('获取失败')
  }
}

export const checkFormValue = (form: any, index: number) => {
  let error = false
  let value: any = {}
  const items: any = []
  Object.keys(form).forEach((key: any) => {
    if(form[key].step === index){
      items.push(form[key])
    }
  })
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.required && (item.value === '' || item.value.length === 0)) {
      wx.showToast({
        title: item.required.message,
        icon: 'none'
      })
      error = true
      break
    }
    if (item.validate) {
      if (typeof item.validate.exec === 'function') {
        if (!item.validate.exec(item.value)) {
          wx.showToast({
            title: item.validate.message,
            icon: 'none'
          })
          error = true
          break
        }
      }
    }
    if (item.value) {
      value[item.name] = item.value
    }
  }
  if (error) return 
  return value
}

export const composeForm = (formData: any) => {
  let result: any = {}
  Object.keys(formData).forEach((key: string) => {
    result[key] = formData[key].value
  })
  return result
}
