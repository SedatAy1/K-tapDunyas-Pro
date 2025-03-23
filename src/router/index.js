import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import BookDetailView from '../views/BookDetailView.vue'
import AdminView from '../views/AdminView.vue'
import store from '../store'
import DashboardView from '../views/DashboardView.vue'



const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/favorites', name: 'Favorites', component: FavoritesView },
  { path: '/book/:id', name: 'BookDetail', component: BookDetailView, props: true },
  { 
    path: '/admin', 
    name: 'Admin', 
    component: AdminView, 
    meta: { requiresAdmin: true } 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 📌 Yetkilendirme Kontrolü
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['user/isAuthenticated']
  const isAdmin = store.getters['user/isAdmin']

  if (to.meta.requiresAdmin && !isAdmin) {
    next('/') // 📌 Admin değilse ana sayfaya yönlendir
  } else {
    next()
  }
  const AdminView = () => import('../views/AdminView.vue') 
})

export default router