import * as components from '@/components'
import { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default function install(app: App) {
  Object.entries(components).forEach(([key, value]) => {
    app.component(key, value)
  })
  // 全局引入element-plus的icon
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
