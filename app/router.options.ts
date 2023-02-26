import type { RouterConfig } from '@nuxt/schema'
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig> {
    routes: (_routes) => [
      {
        name: 'home',
        path: '/',
        component: () => import('~/src/views/index.vue')
      },
      {
        name: 'profile',
        path: '/profile',
        component: () => import('~/src/views/profile.vue')
      },
      {
        name: 'article',
        path: '/article/:id?',
        component: () => import('~/src/views/article/[id].vue')
      }
    ],
  }