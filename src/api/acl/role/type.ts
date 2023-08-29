import BasicResponse from '@/api/base_type.ts'

export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}

export type Records = RoleData[]

export interface RoleResponseData extends BasicResponse {
  data: {
    records: Records
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: number
    pages: number
  }
}

export interface MenuData {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children: []
  select: boolean
}

export type MenuList = MenuData[]

export interface MenuResponseData extends BasicResponse {
  data: MenuList
}
