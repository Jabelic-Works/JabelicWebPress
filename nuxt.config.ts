// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: 'jabelic',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api'
    }
  }
})
