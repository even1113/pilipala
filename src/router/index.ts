import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/HomeView.vue')
    },
    {
      path: '/playpage',
      name: 'playpage',
      component: () => import('@/views/video/PlayPage.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/user/UserIndex.vue')
    },
    {
      path: '/vedio',
      name: 'vedio',
      component: () => import('@/views/video/PlayPage.vue')
    },
    {
      path: '/anime',
      component: () => import('@/views/anime/AnimeList.vue')
    },
    {
      path: '/total',
      component: () => import('@/views/anime/TotalAnime.vue')
    },
    {
      path: '/index',
      component: () => import('@/views/anime/AnimeIndex.vue')
    }
  ]
})

export default router
