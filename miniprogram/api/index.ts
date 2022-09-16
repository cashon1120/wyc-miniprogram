import request from '../utils/request'

export const GetOpenCityList = () => {
  return request({
    url: 'shouyue/getOpenCityList',
    method: 'POST',
  })
}

export const GetServiceTypeList = () => {
  return request({
    url: 'shouyue/getServiceTypeList',
    method: 'POST',
  })
}

export const GetGroupList = (data: any) => {
  return request({
    url: 'shouyue/getGroupsList',
    method: 'POST',
    data
  })
}

export const GetFarePredictionV2 = (data: any) => {
  return request({
    url: 'shouyue/getFarePredictionV2',
    method: 'POST',
    data
  })
}

export const GetFixedPrice = (data: any) => {
  return request({
    url: 'shouyue/negotiateFixedPrice/estimatesPrice',
    method: 'POST',
    data
  })
}

export const GetPhoneNumber = (code: string) => {
  return request({
    url: `wechat/min/getPhone?code=${code}`,
    method: 'GET',
  })
}

export const GetLoginUrl = (data: any) => {
  return request({
    url: `shouyue/getLoginUrl`,
    method: 'POST',
    data
  })
}

export const CreateOrder1 = (data: any) => {
  return request({
    url: `shouyue/postInstantOrder`,
    method: 'POST',
    data
  })
}

export const CreateOrder2 = (data: any) => {
  return request({
    url: `shouyue/negotiateFixedPrice/createOrder`,
    method: 'POST',
    data
  })
}

export const GetPartnerOrderNo = (data: any) => {
  return request({
    url: `shouyue/pollingOrderStatus`,
    method: 'POST',
    data
  })
}

export const CancelOrder = (data: any) => {
  return request({
    url: `shouyue/cancelOrder`,
    method: 'POST',
    data
  })
}

