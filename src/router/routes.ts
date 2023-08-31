// 公共常量路由
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '用户登录',
      hidden: true,
      icon: '',
    },
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '',
      hidden: false,
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'screen',
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'Platform',
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
      icon: '',
    },
  },
]

// 异步路由
export const asyncRoutes = [
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'acl',
    meta: {
      title: '权限管理',
      icon: 'Lock',
      hidden: false,
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'user',
        meta: {
          title: '用户管理',
          icon: 'User',
          hidden: false,
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'role',
        meta: {
          title: '角色管理',
          icon: 'Avatar',
          hidden: false,
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'permission',
        meta: {
          title: '菜单管理',
          icon: 'List',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'product',
    meta: {
      title: '商品管理',
      icon: 'Goods',
      hidden: false,
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'trademark',
        meta: {
          title: '品牌管理',
          icon: 'Shop',
          hidden: false,
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'attr',
        meta: {
          title: '属性管理',
          icon: 'Management',
          hidden: false,
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'spu',
        meta: {
          title: 'SPU管理',
          icon: 'Calendar',
          hidden: false,
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'sku',
        meta: {
          title: 'SKU管理',
          icon: 'ScaleToOriginal',
          hidden: false,
        },
      },
    ],
  },
]

/*
 * 必须拆任意路由 因为如果把任意路由放在公共常量路由中
 * 会发现如果在异步路由中刷新 当路由没有addRoute完的时候 此时还没有异步路由的存在
 * 又因为任意路由使用正则表达式，此时没有异步路由匹配不到则重定向到404页面 此结果并非所愿
 * 故需要在pinia的user中在最后动态添加路由的时候来拼接任意路由：
 * [...userRoutes, anyRoute].forEach((route: RouteRecordRaw) => {
      router.addRoute(route) //动态加路由 相当于注册路由
 * })
 * */
// 任意路由
export const anyRoute = [
  {
    path: '/:pathMatch(.*)*',
    name: 'any',
    redirect: '/404',
    meta: {
      title: '其他页面',
      hidden: true,
      icon: '',
    },
  },
]
