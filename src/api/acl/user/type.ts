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

export interface UserResponseData extends BasicResponse {
  data: {
    records: User[]
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

export interface AllRoleResponseData extends BasicResponse {
  data: {
    assignRoles: RoleData[]
    allRolesList: RoleData[]
  }
}

export interface SetRoleData {
  userId: number
  roleIdList: number[]
}
