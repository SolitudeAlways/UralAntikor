import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import CategoryPage from '../views/CategoryPage.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/category/:category',
    name: 'CategoryPage',
    component: CategoryPage,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    if (savedPosition) {
      // при возврате по истории — к сохраненной позиции
      return savedPosition
    }
    // по умолчанию — к началу страницы (без самопроизвольного скролла вниз)
    return { left: 0, top: 0 }
  }
})

export default router