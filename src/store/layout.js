import { defineStore, acceptHMRUpdate } from 'pinia'

export const useLayoutStore = defineStore('layout', {
 state: () => ({
   layout:"life",
 }),
 getters: {
   getLayout() {
     return this.layout
   },
 },
 actions: {
   setLayout(layout) {
     this.layout = layout
   },
 },
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
}
