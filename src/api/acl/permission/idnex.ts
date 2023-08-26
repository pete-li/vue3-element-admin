import request from '@/utils/request'
import type { MenuParams, PermissionResponseData } from './type'

enum API {
  ALL_PERMISSION_URL = '/admin/acl/permission',
  ADD_MENU_URL = '/admin/acl/permission/save',
  UPDATE_URL = '/admin/acl/permission/update',
  DELETE_MENU_URL = '/admin/acl/permission/remove/',
}

export const reqAllPermission = () =>
  request.get<any, PermissionResponseData>(API.ALL_PERMISSION_URL)

export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_URL, data)
  } else {
    return request.post<any, any>(API.ADD_MENU_URL, data)
  }
}

export const reqRemoveMenu = (id: number) =>
  request.delete<any, any>(API.DELETE_MENU_URL + id)
