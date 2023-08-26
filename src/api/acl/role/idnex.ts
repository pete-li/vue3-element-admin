import request from '@/utils/request.ts'
import {
  MenuResponseData,
  RoleData,
  RoleResponseData,
} from '@/api/acl/role/type.ts'

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
    return request.put<any, any>(API.UPDATE_ROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADD_ROLE_URL, data)
  }
}

export const reqAllMenuList = (roleId: number) =>
  request.get<any, MenuResponseData>(API.ALL_PERMISSION_URL + roleId)

export const reqSetPermission = (roleId: number, permissionId: number[]) =>
  request.post(
    API.SET_PERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`,
  )

export const reqRemoveRole = (roleId: number) =>
  request.delete<any, any>(API.REMOVE_ROLE_URL + roleId)
