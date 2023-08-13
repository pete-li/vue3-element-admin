import request from '@/utils/request'
import { loginInfoForm, loginResData, userInfoResData } from './type'

// 由于在拦截器在请求头设置了token，所以此后不需要再传token
enum API {
  LOGIN_USER = '/admin/acl/index/login',
  LOGOUT_USER = '/admin/acl/index/logout',
  USER_INFO = '/admin/acl/index/info',
}

// 登录
export const login = (data: loginInfoForm) =>
  request.post<any, loginResData>(API.LOGIN_USER, data)

// 登出
export const logout = () => request.post<any, any>(API.LOGOUT_USER)

// 用户信息
export const userInfo = () => request.get<any, userInfoResData>(API.USER_INFO)
