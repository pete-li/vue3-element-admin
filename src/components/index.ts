import SvgIcon from '@/components/SvgIcon/index.vue'
import { App } from 'vue'

const golbalComponents = { SvgIcon }

export default {
  install(app: App) {
    Object.entries(golbalComponents).forEach(([key, value]) => {
      app.component(key, value)
    })
  },
}
