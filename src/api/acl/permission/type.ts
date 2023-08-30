import BasicResponse from '@/api/base_type.ts'

export interface Permission {
  id?: number
  code: string
  level: number
  name: string
  pid: number
  createTime?: string
  updateTime?: string
  type?: number
  toCode?: null
  status?: null
  children?: PermissionList
  select?: boolean
}

export type PermissionList = Permission[]

export interface PermissionResData extends BasicResponse {
  data: PermissionList
}
