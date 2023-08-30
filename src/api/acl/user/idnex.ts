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

// 获取用户信息
export const reqUserInfo = (page: number, limit: number, username = '') =>
  request.get<any, UserResponseData>(
    API.ALL_USER_URL + `${page}/${limit}/?username=${username}`,
  )

// 添加/修改用户
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, BasicResponse>(API.UPDATE_USER_URL, data)
  } else {
    return request.post<any, BasicResponse>(API.ADD_USER_URL, data)
  }
}

// 根据ID查询所有角色
export const reqAllRoleById = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.ALL_ROLE_URL + userId)

// 设置用户的角色
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, BasicResponse>(API.SET_ROLE_URL, data)

// 删除用户
export const reqRemoveUser = (userId: number) =>
  request.delete<any, BasicResponse>(API.DELETE_USER_URL + userId)

// 批量删除用户
export const reqDeleteSelectedUser = (idList: number[]) =>
  request.delete<any, BasicResponse>(API.DELETE_ALL_USER_URL, { data: idList })
