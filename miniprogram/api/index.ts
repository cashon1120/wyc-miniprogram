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

export const GetGroupList = () => {
    return request({
        url: 'shouyue/getGroupsList',
        method: 'POST',
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