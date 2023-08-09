import { defineStore } from 'pinia'
import { login } from '@/api/user'
import { loginInfoForm, loginResData } from '@/api/user/type'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
import { constantRoutes } from '@/router/routes'
const useUserStore = defineStore('User', {
  // pinia数据仓库
  state: () => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoutes,
    }
  },
  // 异步逻辑代码 pinia移除了原来vuex的mutation 状态转换更简洁
  actions: {
    async user_login(userForm: loginInfoForm) {
      const res: loginResData = await login(userForm)
      if (res.code === 200) {
        this.token = res.data.token as string
        SET_TOKEN(res.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data.message as string))
      }
    },
  },
  // 相同于全局的computed
  getters: {},
})

export default useUserStore
