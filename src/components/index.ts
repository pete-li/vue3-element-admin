import SvgIcon from '@/components/SvgIcon/index.vue'
import { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const golbalComponents = { SvgIcon }

export default {
  install(app: App) {
    Object.entries(golbalComponents).forEach(([key, value]) => {
      app.component(key, value)
    })
    // 全局引入element-plus的icon
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
