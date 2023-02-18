// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: 'jabelic',
    apikey: process.env.NUXT_API_KEY,
    enApikey: process.env.NUXT_EN_API_KEY,
    // Keys within public are also exposed client-side
    public: {
      apikey: process.env.NUXT_API_KEY,
      enApikey: process.env.NUXT_EN_API_KEY,
      apiBase: '/api'
    }
  },
  css: ['~/assets/style/_reset.css', '~/assets/style/index.css'],
  modules: ['@pinia/nuxt'],
  app:{
    head: {
      title: "Jabelic Web Press",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/icon-16x16.png" }, // これを追記する
      ],
    },
  },
  components: [
    /** components内のディレクトリを無関係として、ファイル名でauto importさせる設定 */
    {
      path: "~/components",
      pathPrefix: false
    }
  ]
})
