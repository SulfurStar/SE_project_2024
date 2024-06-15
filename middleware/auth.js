
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user');
    
    console.log('user', user.value);
    if (!user.value) {
      return navigateTo('/login');
  }
  if(!user.value.role ) {
    return navigateTo('/landlord_register');
  }

});