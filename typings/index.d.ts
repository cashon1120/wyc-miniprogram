/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: any,
    toUrl: string,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}