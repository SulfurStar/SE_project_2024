export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user');

  // 等待用戶狀態初始化
  if (process.server) {
    return;
  }

  if (!user.value) {
    return navigateTo('/login');
  }

  if (!user.value.role) {
    return navigateTo('/landlord_register');
  }
});