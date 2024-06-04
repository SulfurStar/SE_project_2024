// 確保使用者登入狀態不會因為重新整理而消失
export default defineNuxtPlugin((nuxtApp) => {
  const user = useState('user');
  const isLoading = useState('isLoading', () => true);

  if (process.client) {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      user.value = JSON.parse(savedUser);
    }
    isLoading.value = false;
  }

  watch(user, (newUser) => {
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  });
});