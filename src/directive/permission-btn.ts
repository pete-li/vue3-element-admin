import { App, DirectiveBinding } from 'vue'
import useUserStore from '@/store/modules/user.ts'
import pinia from '@/store'

const userStore = useUserStore(pinia)
export const permissionBtn = (app: App<Element>) => {
  app.directive('permission-btn', {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      if (!userStore.buttons.includes(binding.value)) {
        el.parentNode?.removeChild(el)
      }
    },
  })
}
