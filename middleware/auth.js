export default defineNuxtRouteMiddleware((to, from) => {
    
    const user = useState('user');
    if (!user.value) {
      // 用戶未登錄，跳轉到登錄頁面
      return navigateTo('/login');
    }
  });