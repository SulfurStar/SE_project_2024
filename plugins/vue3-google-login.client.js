import vue3GoogleLogin from 'vue3-google-login';

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const { googleClientId: GOOGLE_CLIENT_ID } = runtimeConfig.public; // 取得 googleClientId 賦值給 GOOGLE_CLIENT_ID

  // 註冊 vue3GoogleLogin 插件
  nuxtApp.vueApp.use(vue3GoogleLogin, {
    //
    clientId: GOOGLE_CLIENT_ID,
  });
});
