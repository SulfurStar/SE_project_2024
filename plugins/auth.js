// 確保使用者登入狀態不會因為重新整理而消失
export default defineNuxtPlugin((nuxtApp) => {
  const user = useState('user');
  const isLoading = useState('isLoading', () => true);

  // 過期時間30分鐘
  const EXPIRATION_TIME = 30 * 60 * 1000;

  if (process.client) {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      const currentTime = new Date().getTime();

      if (parsedUser.expiration && parsedUser.expiration > currentTime) {
        user.value = parsedUser.data;
      } else {
        localStorage.removeItem('user'); // 如果過期，移除數據
      }
    }
    isLoading.value = false;
  }

  // 如果過期，移除數據
  watch(user, (newUser) => {
    if (process.client) {
      const expiration = new Date().getTime() + EXPIRATION_TIME;
      const userData = {
        data: newUser,
        expiration,
      };
      localStorage.setItem('user', JSON.stringify(userData));
    }
  });
});