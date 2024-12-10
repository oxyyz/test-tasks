import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/pages/Index.vue'),
  },
  {
    path: '/playground',
    name: 'Playground',
    component: () => import('@/pages/Playground.vue'),
  },
] as RouteRecordRaw[]
