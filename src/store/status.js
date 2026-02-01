import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStatusStore = defineStore('status', {
   state: () => ({
      status: {
         activeLayout: null,
         isLoading: false,
         isError: false,
         error: null,
      },
      selectedCategory:"life",

   }),
   getters: {},
   actions: {
      setStatus(payload) {
         this.status = { ...this.status, ...payload }
      },
      setCategory(category){
         if(category ){
            this.selectedCategory = category
         }
      }
   },
})

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useStatusStore, import.meta.hot))
}
