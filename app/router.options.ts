import type { RouterConfig } from '@nuxt/schema'
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  routes: () => [
    // {
    //   name: 'home',
    //   path: '/',
    //   component: () => import('~/src/views/pages/index.vue')
    // },
    {
      name: 'ja-home',
      path: '/ja/',
      component: () => import('~/src/views/pages/index.vue')
    },
    {
      name: 'en-home',
      path: '/en/',
      component: () => import('~/src/views/pages/index.vue')
    },
    {
      name: 'profile',
      path: '/profile',
      component: () => import('~/src/views/pages/profile.vue')
    },
    // {
    //   name: 'article',
    //   path: '/article/:id?',
    //   component: () => import('~/src/views/pages/article/[id].vue')
    // },
    {
      name: 'ja-article',
      path: '/ja/article/:id?',
      component: () => import('~/src/views/pages/article/[id].vue')
    },
    {
      name: 'enArticle',
      path: '/en/article/:id?',
      component: () => import('~/src/views/pages/article/[id].vue')
    }
  ]
}
