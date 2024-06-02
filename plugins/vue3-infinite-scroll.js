import { defineNuxtPlugin } from '#app'
import { ElInfiniteScroll } from 'element-plus'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElInfiniteScroll)
})