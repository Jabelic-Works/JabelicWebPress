import type { RouterConfig } from '@nuxt/schema'
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig> {
    routes: (_routes) => [
      {
        name: 'home',
        path: '/',
        component: () => import('~/src/views/pages/index.vue')
      },
      {
        name: 'profile',
        path: '/profile',
        component: () => import('~/src/views/pages/profile.vue')
      },
      {
        name: 'article',
        path: '/article/:id?',
        component: () => import('~/src/views/pages/article/[id].vue')
      }
    ],
  }