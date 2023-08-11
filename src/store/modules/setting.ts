import { defineStore } from 'pinia'
const useSettingStore = defineStore('Setting', {
  state: () => {
    return {
      isFold: false,
    }
  },
  actions: {},
  getters: {},
})

export default useSettingStore
