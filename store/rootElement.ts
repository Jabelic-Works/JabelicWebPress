import { defineStore } from 'pinia'

export const useRootElementStore = defineStore('rootElementStore', {
  state: (): { height: number } => ({ height: 0 }),
  getters: {
    getHeight: (state) => state.height
  },
  actions: {
    setHeight(arg: number) {
      this.height = arg
    }
  }
})
