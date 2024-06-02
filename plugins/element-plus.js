import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElementPlus from 'element-plus/dist/index.full';
import { defineNuxtPlugin } from '#app';
export default defineNuxtPlugin((nuxtApp) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    nuxtApp.vueApp.component(key, component);
  }
  nuxtApp.vueApp.use(ElementPlus);
});