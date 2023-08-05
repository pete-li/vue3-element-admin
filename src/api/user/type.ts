export interface loginInfoForm {
  username: string
  password: string
}

interface dataType {
  token?: string
  message?: string
}

export interface loginResData {
  code: number
  data: dataType
}

interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

export interface userInfoResData {
  code: number
  data: userInfo
}
