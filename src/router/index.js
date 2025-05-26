import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import DashboardUser from '../views/user/DashboardUser.vue'
import SearchBooks from '../views/user/SearchBooks.vue'
import MyBooks from '../views/user/MyBooks.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import ManageBooks from '../views/admin/ManageBooks.vue'
import ManageUsers from '../views/admin/ManageUsers.vue'
import Reports from '../views/admin/Reports.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: DashboardUser
  },
  {
    path: '/dashboard/search',
    name: 'SearchBooks',
    component: SearchBooks
  },
  {
    path: '/dashboard/my-books',
    name: 'MyBooks',
    component: MyBooks
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard
  },
  {
    path: '/admin/books',
    name: 'ManageBooks',
    component: ManageBooks
  },
  {
    path: '/admin/users',
    name: 'ManageUsers',
    component: ManageUsers
  },
  {
    path: '/admin/reports',
    name: 'Reports',
    component: Reports
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
