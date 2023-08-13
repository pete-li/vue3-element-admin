import { defineStore } from 'pinia'
import { login, logout, userInfo } from '@/api/user'
import { loginInfoForm, loginResData, userInfoResData } from '@/api/user/type'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'
import { constantRoutes } from '@/router/routes'

const useUserStore = defineStore('User', {
  // pinia数据仓库
  state: () => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoutes,
      username: '',
      avatar: '',
    }
  },
  // 异步逻辑代码 pinia移除了原来vuex的mutation 状态转换更简洁
  actions: {
    // 用户登录
    async user_login(userForm: loginInfoForm) {
      const res: loginResData = await login(userForm)
      if (res.code === 200) {
        this.token = res.data
        SET_TOKEN(res.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // 用户登出
    async user_logout() {
      const res = await logout()
      if (res.code === 200) {
        this.token = ''
        this.avatar = ''
        this.username = ''
        REMOVE_TOKEN()
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // 用户信息
    async user_info() {
      const res: userInfoResData = await userInfo()
      if (res.code === 200) {
        this.avatar = res.data.avatar
        this.username = res.data.name
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
  // 相同于全局的computed
  getters: {},
})

export default useUserStore
