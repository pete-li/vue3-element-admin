import { defineStore } from 'pinia'
const useSettingStore = defineStore('Setting', {
  state: () => {
    return {
      isFold: localStorage.getItem('isFold') === 'true',
      isRefresh: false,
    }
  },
  actions: {},
  getters: {},
})

export default useSettingStore
