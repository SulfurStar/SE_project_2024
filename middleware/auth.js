
export default defineNuxtRouteMiddleware((to, from) => {
  onMounted(() => {
    const user = useState('user');
    if (!user.value) {
      return navigateTo('/login');
    }
  });
});