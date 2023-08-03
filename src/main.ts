import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCN from 'element-plus/lib/locale/lang/zh-cn' //此处国际化有坑 引包有问题
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import GlobalComponents from '@/components'
import App from '@/App.vue'

const app = createApp(App)
app.use(GlobalComponents) // 全局注册自定义组件
app.use(ElementPlus, {
  locale: zhCN,
})
app.mount('#app')
