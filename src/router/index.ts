import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/store/modules/user'
import { ElMessage } from 'element-plus'

nprogress.configure({ showSpinner: false }) //关闭刷新圆圈

const router = createRouter({
  // history: createWebHistory(),
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
      next({ path: from.path }) //登录后再去登录页 从哪来回哪去 不给放行
    } else {
      if (userStore.avatar) {
        // (此处判断主要解决在异步路由页面刷新后，路由导航出现空白页问题)
        // 这是主要由于pinia仓库在刷新后，内存置空 状态也就置空了 异步路由需要重新动态加载 这个过程需要时间 需要else逻辑中next(to)再一次进入hook
        // 又因为仓库中menuRoutes已经有存放公共路由不便做判断
        // 所以 username 作为路由是否已经逐个注册完成(addRoute方法)的判断依据 其实用头像属性avatar也可以 原理一样
        next() //此时异步路由已经全部加载完 有用户信息 直接放行
      } else {
        // 没有用户名 说明 此时异步路由还没注册挂载 需要等待user_info逐个路由动态加载完
        try {
          // 不能在登录按钮获取用户信息 用户如果关闭浏览器后直接访问主页 没经过登录按钮 那么pinia用户信息就是null
          await userStore.user_info() //等待user_info中异步路由动态加载完毕
          next(to) //中断当前导航 让前置守卫hook再执行一次 再进入钩子后 原本置空的pinia仓库中异步路由已经挂载好 可由上方next()直接放行
        } catch (error) {
          // 用户信息发生变更 用户信息失败 (如token过期等)
          await userStore.user_logout() //退出登录
          ElMessage({
            type: 'warning',
            message: '用户信息发生变更，请重新登录！',
          })
          next({ path: '/login', query: { redirect: to.path } })
        }
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
