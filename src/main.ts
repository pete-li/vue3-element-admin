import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import zhCN from 'element-plus/lib/locale/lang/zh-cn' //此处国际化有坑 引包有问题
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import GlobalComponents from '@/components'
import '@/styles/index.scss'
import router from './router'
import pinia from '@/store'

const app = createApp(App)

app.use(GlobalComponents) // 全局注册自定义组件
app.use(ElementPlus, {
  locale: zhCN,
})
app.use(router)
app.use(pinia)

app.mount('#app')
