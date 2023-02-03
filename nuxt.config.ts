// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: 'jabelic',
    apikey: process.env.NUXT_API_KEY,
    // Keys within public are also exposed client-side
    public: {
      apikey: process.env.NUXT_API_KEY,
      apiBase: '/api'
    }
  },
  css: ['~/assets/style/_reset.css', '~/assets/style/index.css'],
})
