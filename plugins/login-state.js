// 管理使用者登入狀態(重整頁面後仍保留登入狀態、過期時間)

export default defineNuxtPlugin((nuxtApp) => {
  const user = useState('user');
  const isLoading = useState('isLoading', () => true);

  // 過期時間30分鐘
  const EXPIRATION_TIME = 30 * 60 * 1000;

  // 只在 client 端執行
  if (process.client) {
    // 檢查 localStorage 中是否有 user 資料
    const savedUser = localStorage.getItem('user');
    const savedExpiration = localStorage.getItem('expiration');

    if (savedUser && savedExpiration) {
      const expirationTime = new Date(savedExpiration).getTime();
      const currentTime = new Date().getTime();

      if (currentTime < expirationTime) {
        user.value = JSON.parse(savedUser);
      } else {
        // 過期，清除資料
        localStorage.removeItem('user');
        localStorage.removeItem('expiration');
      }
    }

    isLoading.value = false;

    // 監聽 user 狀態變化
    watch(user, (newUser) => {
      if (newUser) {
        const expirationTime = new Date().getTime() + EXPIRATION_TIME;
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('expiration', new Date(expirationTime).toISOString());
      } else {
        user.value = null;
        localStorage.removeItem('user');
        localStorage.removeItem('expiration');
      }
    });

    // 設置一個定時器來檢查過期時間
    setInterval(() => {
      const savedExpiration = localStorage.getItem('expiration');
      if (savedExpiration) {
        const expirationTime = new Date(savedExpiration).getTime();
        const currentTime = new Date().getTime();

        if (currentTime >= expirationTime) {
          user.value = null;
          localStorage.removeItem('user');
          localStorage.removeItem('expiration');
        }
      }
    }, 1000 * 60); // 每分鐘檢查一次
  }
});