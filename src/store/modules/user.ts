import { defineStore } from 'pinia'
import { login, logout, userInfo } from '@/api/user'
import { loginInfoForm, loginResData, userInfoResData } from '@/api/user/type'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'
import { constantRoutes, asyncRoutes, anyRoute } from '@/router/routes'
import router from '@/router'
import { RouteRecordRaw } from 'vue-router'
import cloneDeep from 'lodash/cloneDeep.js'

interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
  buttons: string[]
}

const useUserStore = defineStore('User', {
  // pinia数据仓库
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoutes, //供递归组件menu使用的路由表 动态生成菜单侧边栏
      username: '',
      avatar: '',
      buttons: [],
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
        this.buttons = res.data.buttons
        // 统一小写处理
        const resRoutes: string[] = res.data.routes.map((name) =>
          name.toLowerCase(),
        )
        // 当用户切换角色账号的时候，由于角色不同，pinia中所拥有的异步路由有可能由多变少。
        // 当使用普通函数引用传递的时候会asyncRoutes中值的改变 需要“深拷贝”asyncRoutes原值不会改变
        // 例如admin账号，登出切其他无高权限的路由，再登录admin账号会发现路由变少
        // 这是由于pinia数据存在内存中，登录其他账号无高权限的路由，那么admin账号再筛选异步路由自然也不会再包含更多路由。
        const userRoutes: RouteRecordRaw[] = filterAsyncRoutes(
          cloneDeep(asyncRoutes),
          resRoutes,
        )
        this.menuRoutes = [...constantRoutes, ...userRoutes, ...anyRoute] //合并路由数组传给递归组件所需数据
        ;[...userRoutes, ...anyRoute].forEach((route: RouteRecordRaw) => {
          // 需注意 必须在异步路由添加后加入anyRoute 这样就不会出现异步路由刷新 出现404问题
          router.addRoute(route) //动态加路由 相当于注册路由
        })
        return Promise.resolve('ok')
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
  // 相同于全局的computed
  getters: {},
})

// 过滤当前用户名下拥有哪些异步路由
function filterAsyncRoutes(
  allAsyncRoutes: RouteRecordRaw[],
  resRoutes: string[],
): RouteRecordRaw[] {
  return allAsyncRoutes.filter((route: RouteRecordRaw) => {
    // 统一转小写 不区分路由名字的大小写
    const routeName = (route.name as string).toLowerCase()
    if (resRoutes.includes(routeName)) {
      if (route.children && route.children.length) {
        // 递归函数返回的值要给子路由children
        route.children = filterAsyncRoutes(route.children, resRoutes)
      }
      return true
    }
    return false
  })
}

export default useUserStore
