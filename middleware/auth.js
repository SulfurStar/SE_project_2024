export default defineNuxtRouteMiddleware((to, from) => {
  onMounted(() => {
    const user = useState('user').value;

    // 檢查用戶是否已經登入
    if (!user) {
      return navigateTo('/login');
    }
  });
});