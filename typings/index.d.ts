/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
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
    }
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}