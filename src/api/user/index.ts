import request from '@/utils/request'
import { loginInfoForm, loginResData, userInfoResData } from './type'

enum API {
  LOGIN_USER = '/user/login',
  USER_INFO = 'user/info',
}

export const login = (data: loginInfoForm) =>
  request.post<any, loginResData>(API.LOGIN_USER, data)

export const userInfo = () => request.get<any, userInfoResData>(API.USER_INFO)
