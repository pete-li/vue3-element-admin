import BasicResponse from '@/api/base_type.ts'

export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  name?: string
  phone?: null
  roleName?: string
}

export type Records = User[]

export interface UserResponseData extends BasicResponse {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}

export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}

export type AllRole = RoleData[]
export interface AllRoleResponseData extends BasicResponse {
  data: {
    assignRoles: AllRole
    allRolesList: AllRole
  }
}

export interface SetRoleData {
  userId: number
  roleIdList: number[]
}
