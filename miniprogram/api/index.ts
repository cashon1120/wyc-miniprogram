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
    url: `shouQi/getLoginUrl`,
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

export const DriverAccreditation = (data: any) => {
  return request({
    url: 'rentOnlineDriverLicenceApplication/add',
    method: 'POST',
    data
  })
}

export const GetDriverAccreditation = (data: any) => {
  return request({
    url: 'rentOnlineDriverLicenceApplication/get',
    method: 'POST',
    data
  })
}

export const CancelDriverAccreditation = (data: any) => {
  return request({
    url: 'rentOnlineDriverLicenceApplication/cancel',
    method: 'POST',
    data
  })
}

export const DriverAccreditationTransport = (data: any) => {
  return request({
    url: 'rentRoadTransportLicenceApplication/add',
    method: 'POST',
    data
  })
}

export const GetDriverAccreditationTransport = (data: any) => {
  return request({
    url: 'rentRoadTransportLicenceApplication/get',
    method: 'POST',
    data
  })
}

export const CancelDriverAccreditationTransport = (data: any) => {
  return request({
    url: 'rentRoadTransportLicenceApplication/cancel',
    method: 'POST',
    data
  })
}

export const GetUserInfo = (code: string) => {
  return request({
    url: 'wechat/min/rentUser/add?code=' + code,
    method: 'GET',
  })
}

export const MeetingUserAdd = (data: any) => {
  return request({
    url: 'meetingUseCar/add',
    method: 'POST',
    data
  })
}

export const MeetingDriverAdd = (data: any) => {
  return request({
    url: 'meetingDriver/add',
    method: 'POST',
    data
  })
}

export const AddSqOrder = (data: any) => {
  return request({
    url: 'onlineCarOrder/add',
    method: 'POST',
    data
  })
}

export const AddRentalCarOrder = (data: any) => {
  return request({
    url: 'rentRentalCar/add',
    method: 'POST',
    data
  })
}

export const GetRentalCarList = (data: any) => {
  return request({
    url: 'rentRentalCar/byUser/page/list',
    method: 'POST',
    data
  })
}

