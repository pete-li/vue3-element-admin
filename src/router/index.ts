import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/store/modules/user'
import { ElMessage } from 'element-plus'
nprogress.configure({ showSpinner: false }) //关闭刷新圆圈

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

// 全局路由前置守卫
router.beforeEach(async (to, from, next) => {
  nprogress.start()
  const userStore = useUserStore()
  if (!userStore.token) {
    // 没登录(不能去登录页之外的路径)
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  } else {
    // 已登录(不能再去登录页)
    if (to.path === '/login') {
      next({ path: from.path }) //从哪来回哪去
    } else {
      try {
        await userStore.user_info() //不能在登录按钮获取用户信息 因为用户会关闭浏览器后直接访问主页  此时pinia信息就是null
        next()
      } catch (error) {
        // 用户token过期
        ElMessage({ type: 'warning', message: '用户信息过期，请重新登录！' })
        await userStore.user_logout() //退出登录
        next({ path: '/login', query: { redirect: to.path } })
      }
    }
  }
})

// 全局后置守卫
router.afterEach((from) => {
  document.title = `管理系统 - ${from.meta.title}`
  nprogress.done()
})

router.onError((error) => {
  nprogress.done()
  console.error('路由错误', error.message)
})

export default router
