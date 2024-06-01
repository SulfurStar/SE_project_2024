// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 其他配置
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID
    },
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
  },

});
