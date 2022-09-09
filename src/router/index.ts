import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/shared/HomePage.vue'

const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/user/:userId',
    name: 'UserProfile',
    component: () => import('@/user/UserProfile.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import ('@/shared/AdminPage.vue'),
    meta: {
      requiresAdmin: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const isAdmin = false
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

  if (requiresAdmin && !isAdmin) next({ name: 'Home' })
  else next()
})

export default router
