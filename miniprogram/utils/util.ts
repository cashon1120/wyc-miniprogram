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
  try {
    var value = wx.getStorageSync('userPhone')
    if (!value) {
      return null
    }
    return value
  } catch (e: any) {
    console.log('获取失败')
  }
}

export const checkFormValue = (form: any) => {
  let error = false
  let value: any = {}
  for (let i = 0; i < form.length; i++) {
    const item = form[i]
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

export const composeForm = (formData: any[]) => {
  let result: any = []
  formData.forEach((item: any) => {
    result = [...result, ...item]
  })
  return result
}