import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state() {
    return {
      routeUrl: '' as string,
      isCollapsed: true as boolean,
    }
  },
})
