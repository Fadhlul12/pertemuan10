import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/collection',
    name: 'collection',
    component: () => import('@/views/CollectionView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/backlog',
    name: 'backlog',
    component: () => import('@/views/BacklogView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/AuthView.vue')
  },

  {
  path: '/profile',
  name: 'profile',
  component: () => import('@/views/ProfileView.vue'),
  meta: { requiresAuth: true }
},
{
  path: '/games/:id',
  name: 'GameDetail',
  component: () => import('@/views/GameDetailView.vue')
},

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router