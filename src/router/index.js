import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import CreatePengaduan from '../views/CreatePengaduan.vue'
import CreatePengaduanGuest from '../views/CreatePengaduanGuest.vue'
import DetailPengaduan from '../views/DetailPengaduan.vue'
import EditPengaduan from '../views/EditPengaduan.vue'
import AdminTanggapan from '../views/AdminTanggapan.vue'

const routes = [
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/pengaduan/create', component: CreatePengaduan },
  { path: '/pengaduan/create/guest', component: CreatePengaduanGuest },
  { path: '/pengaduan/:id', component: DetailPengaduan },
  { path: '/pengaduan/edit/:id', component: EditPengaduan },
  { 
    path: '/tanggapan/:pengaduanId', 
    component: AdminTanggapan, 
    props: true, // Tambahkan ini!
    meta: { requiresAuth: true, requiresRole: 'admin' } 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('role')

  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  if (to.meta.requiresRole && to.meta.requiresRole !== userRole) {
    alert('Hanya admin yang boleh akses halaman ini')
    return next('/dashboard')
  }

  next()
})

export default router