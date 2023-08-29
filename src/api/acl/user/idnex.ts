import request from '@/utils/request.ts'
import type {
  UserResponseData,
  User,
  AllRoleResponseData,
  SetRoleData,
} from './type'
import BasicResponse from '@/api/base_type.ts'

enum API {
  ALL_USER_URL = '/admin/acl/user/',
  ADD_USER_URL = '/admin/acl/user/save',
  UPDATE_USER_URL = '/admin/acl/user/update',
  ALL_ROLE_URL = '/admin/acl/user/toAssign/',
  SET_ROLE_URL = '/admin/acl/user/doAssignRole',
  DELETE_USER_URL = '/admin/acl/user/remove/',
  DELETE_ALL_USER_URL = '/admin/acl/user/batchRemove',
}

export const reqUserInfo = (page: number, limit: number, username = '') =>
  request.get<any, UserResponseData>(
    API.ALL_USER_URL + `${page}/${limit}/?username=${username}`,
  )

export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, BasicResponse>(API.UPDATE_USER_URL, data)
  } else {
    return request.post<any, BasicResponse>(API.ADD_USER_URL, data)
  }
}

export const reqAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.ALL_ROLE_URL + userId)

export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, BasicResponse>(API.SET_ROLE_URL, data)

export const reqRemoveUser = (userId: number) =>
  request.delete<any, BasicResponse>(API.DELETE_USER_URL + userId)

export const reqDeleteSelectedUser = (idList: number[]) =>
  request.delete<any, BasicResponse>(API.DELETE_ALL_USER_URL, { data: idList })
