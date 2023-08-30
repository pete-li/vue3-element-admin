import request from '@/utils/request.ts'
import { RoleData, RoleResponseData } from '@/api/acl/role/type.ts'
import BasicResponse from '@/api/base_type.ts'
import { PermissionResData } from '@/api/acl/permission/type.ts'

enum API {
  ALL_ROLE_URL = '/admin/acl/role/',
  ADD_ROLE_URL = '/admin/acl/role/save',
  UPDATE_ROLE_URL = '/admin/acl/role/update',
  ALL_PERMISSION_URL = '/admin/acl/permission/toAssign/',
  SET_PERMISSION_URL = '/admin/acl/permission/doAssign/?',
  REMOVE_ROLE_URL = '/admin/acl/role/remove/',
}

export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseData>(
    API.ALL_ROLE_URL + `${page}/${limit}/?roleName=${roleName}`,
  )

export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, BasicResponse>(API.UPDATE_ROLE_URL, data)
  } else {
    return request.post<any, BasicResponse>(API.ADD_ROLE_URL, data)
  }
}

export const reqAllPermissionList = (roleId: number) =>
  request.get<any, PermissionResData>(API.ALL_PERMISSION_URL + roleId)

export const reqSetPermission = (roleId: number, permissionId: number[]) =>
  request.post<any, BasicResponse>(
    API.SET_PERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`,
  )

export const reqRemoveRole = (roleId: number) =>
  request.delete<any, BasicResponse>(API.REMOVE_ROLE_URL + roleId)
