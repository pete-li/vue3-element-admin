import { defineStore } from 'pinia'
const useSettingStore = defineStore('Setting', {
  state: () => {
    return {
      isFold: false,
      isRefresh: false,
      isFullScreen: false,
    }
  },
  actions: {},
  getters: {},
})

export default useSettingStore
