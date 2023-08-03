import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCN from 'element-plus/lib/locale/lang/zh-cn' //此处国际化有坑 引包有问题
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import App from '@/App.vue'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCN,
})
app.mount('#app')
