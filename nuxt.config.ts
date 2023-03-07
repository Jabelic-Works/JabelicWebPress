// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: 'jabelic',
    apikey: process.env.NUXT_API_KEY,
    enApikey: process.env.NUXT_EN_API_KEY,
    apiEndpoint: process.env.NUXT_MICROCMS_API_END_POINT,
    enApiEndpoint: process.env.NUXT_EN_MICROCMS_API_END_POINT,
    // Keys within public are also exposed client-side
    public: {
      apikey: process.env.NUXT_API_KEY,
      enApikey: process.env.NUXT_EN_API_KEY,
      apiEndpoint: process.env.NUXT_MICROCMS_API_END_POINT,
      enApiEndpoint: process.env.NUXT_EN_MICROCMS_API_END_POINT,
      apiBase: '/api'
    }
  },
  css: ['~/assets/style/_reset.css', '~/assets/style/index.css'],
  modules: ['@pinia/nuxt', '@vueuse/nuxt'],
  app: {
    head: {
      title: 'Jabelic Web Press',
      meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
        { rel: 'icon', type: 'image/png', href: '/icon-16x16.png' } // これを追記する
      ]
    }
  },
  components: [
    /**
     * components内のディレクトリ構成を無視してauto importさせる設定
     * -> ファイル名はuniqueであることが必須となる
     */
    {
      path: '/<rootDir>/src/views/components',
      pathPrefix: false
    }
  ],
  imports: {
    dirs: [
      // Scan top-level modules
      'src/views/composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'src/views/composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'src/views/composables/**'
    ]
  }
})
