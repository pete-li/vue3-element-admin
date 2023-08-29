import BasicResponse from '@/api/base_type.ts'

export interface Permission {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: null
  toCode: null
  type: number
  status: null
  level: number
  children?: PermissionList
  select: boolean
}

export type PermissionList = Permission[]

export interface PermissionResponseData extends BasicResponse {
  data: PermissionList
}

export interface MenuParams {
  id?: number
  code: string
  level: number
  name: string
  pid: number
}
