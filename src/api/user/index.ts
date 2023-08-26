import request from '@/utils/request'
import { loginInfoForm, loginResData, userInfoResData } from './type'
import BasicResponse from '@/api/base_type.ts'

enum API {
  LOGIN_USER = '/admin/acl/index/login',
  LOGOUT_USER = '/admin/acl/index/logout',
  USER_INFO = '/admin/acl/index/info',
}

// 登录
export const login = (data: loginInfoForm) =>
  request.post<any, loginResData>(API.LOGIN_USER, data)

// 登出
export const logout = () => request.post<any, BasicResponse>(API.LOGOUT_USER)

// 用户信息
export const userInfo = () => request.get<any, userInfoResData>(API.USER_INFO)
