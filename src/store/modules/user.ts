import { defineStore } from 'pinia'
import { login } from '@/api/user'
import { loginInfoForm, loginResData } from '@/api/user/type'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: GET_TOKEN(),
    }
  },
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
  getters: {},
})

export default useUserStore
