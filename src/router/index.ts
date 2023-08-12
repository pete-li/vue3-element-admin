import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

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
router.beforeEach((_to, _from, next) => {
  nprogress.start()
  next()
})

router.afterEach(() => {
  nprogress.done()
})

router.onError((error) => {
  nprogress.done()
  console.warn('路由错误', error.message)
})

export default router
