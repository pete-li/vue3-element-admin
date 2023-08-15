import basicResponse from '../base_type'

// 登录表单信息
export interface loginInfoForm {
  username: string
  password: string
}

// 登录响应数据格式
export interface loginResData extends basicResponse {
  data: string //这里的data就是token
}

// 用户信息数据格式
interface userInfo {
  userId: number
  avatar: string
  name: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

// 用户响应信息的基础格式
export interface userInfoResData extends basicResponse {
  data: userInfo
}
