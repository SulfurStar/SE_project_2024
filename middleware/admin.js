import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user');
  if (process.server) {
    return;
  }
  if (user.value.role !== 'ADMIN') {
    return navigateTo('/'); // 重定向到未授權頁面
  }
});