import request from '@/utils/request'
import type { Permission, PermissionResData } from './type'
import BasicResponse from '@/api/base_type.ts'

enum API {
  ALL_PERMISSION_URL = '/admin/acl/permission',
  ADD_MENU_URL = '/admin/acl/permission/save',
  UPDATE_URL = '/admin/acl/permission/update',
  DELETE_MENU_URL = '/admin/acl/permission/remove/',
}

export const reqAllPermission = () =>
  request.get<any, PermissionResData>(API.ALL_PERMISSION_URL)

export const reqAddOrUpdatePermission = (data: Permission) => {
  if (data.id) {
    return request.put<any, BasicResponse>(API.UPDATE_URL, data)
  } else {
    return request.post<any, BasicResponse>(API.ADD_MENU_URL, data)
  }
}

export const reqRemoveMenu = (id: number) =>
  request.delete<any, BasicResponse>(API.DELETE_MENU_URL + id)
