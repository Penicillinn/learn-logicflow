import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/node',
    },
    {
      path: '/node',
      name: 'node',
      component: () => import('@/views/Content.vue'),
    },
    {
      path: '/customnode',
      name: 'customnode',
      component: () => import('@/views/Content.vue'),
    },
    {
      path: '/edge',
      name: 'edge',
      component: () => import('@/views/Content.vue'),
    },
    {
      path: '/customedge',
      name: 'customedge',
      component: () => import('@/views/Content.vue'),
    },
    {
      path: '/theme',
      name: 'theme',
      component: () => import('@/views/Theme.vue'),
    },
    {
      path: '/grid',
      name: 'grid',
      component: () => import('@/views/Grid.vue'),
    },
    {
      path: '/background',
      name: 'background',
      component: () => import('@/views/Background.vue'),
    },
    {
      path: '/event',
      name: 'event',
      component: () => import('@/views/Event.vue'),
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('@/views/Menu.vue'),
    },
    {
      path: '/dnd',
      name: 'dnd',
      component: () => import('@/views/DndPanel.vue'),
    },
    {
      path: '/control',
      name: 'control',
      component: () => import('@/views/Control.vue'),
    },
    {
      path: '/adapter',
      name: 'adapter',
      component: () => import('@/views/Adapter.vue'),
    },
    {
      path: '/process',
      name: 'process',
      component: () => import('@/views/Process.vue'),
    },
  ],
})

export default router
