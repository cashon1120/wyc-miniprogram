/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: any,
    currentCity: {
      cityName: string,
      cityId: number
    }
    startAddress: any
    endAddress: any
    openCityList: any[]
    groupList: any[]
    selectedAddress?: {
      latitude: number,
      longitude: number,
      address: string
    },
    toUrl: string,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}