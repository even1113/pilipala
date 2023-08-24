import { http } from '@/utils/http'

// 登录
export const userLogin = function (params: any) {
  return http.httpRequestPost('/user/login/byPass', params)
}

// 注册
export const userRegister = function (params: any) {
  return http.httpRequestGet('/user/login/byText', params)
}

// 获取验证码
export const getCaptcha = function (params: string) {
  return http.httpRequestGet(`/user/login/getCaptcha?phone=${params}`, {})
}
