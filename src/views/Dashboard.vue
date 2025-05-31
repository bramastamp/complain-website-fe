<template>
  <MainLayout>
  <div class="container mt-5">
    <h2 v-if="role === 'admin'">Daftar Semua Pengaduan</h2>
    <h2 v-else>Daftar Pengaduan Saya</h2>
    <div v-if="loading">Memuat data...</div>
    <div v-else-if="pengaduans.length === 0">Belum ada pengaduan.</div>
    <div v-else>
      <div class="row">
      <div v-for="item in pengaduans" :key="item.id" class="col-md-4 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <!-- Tampilkan nama pengirim HANYA jika role-nya admin -->
            <p v-if="role === 'admin'">
              <span v-if="item.is_anonymous">Pengirim: Anonim</span>
              <span v-else-if="item.user">Pengirim: {{ item.user.name }}</span>
              <span v-else>Pengirim: Tidak diketahui</span>
            </p>
            <h5 class="card-title">{{ item.judul }}</h5>
            <p class="card-text">{{ item.isi }}</p>
            <p class="card-text">
              <strong>Kategori:</strong>
              {{ item.kategori?.nama_kategori || 'Tidak ada kategori' }}
            </p>
            <p class="text-muted">Status: {{ item.status }}</p>

            <router-link :to="`/pengaduan/${item.id}`" class="btn btn-info btn-sm me-2">Detail</router-link>
            <router-link
              v-if="role !== 'admin'"
              :to="`/pengaduan/edit/${item.id}`"
              class="btn btn-warning btn-sm"
            >
              Edit
            </router-link>
            <router-link 
              v-if="role === 'admin'" 
              :to="`/tanggapan/${item.id}`" 
              class="btn btn-success btn-sm me-2"
            >
              Tanggapi
            </router-link>
            <button @click="hapusPengaduan(item.id)" class="btn btn-danger btn-sm ms-2">Hapus</button>
          </div>
        </div>
      </div>
    </div>

    </div>
  </div>
  </MainLayout>
</template>

<script>
import axios from 'axios'
import MainLayout from '../layouts/MainLayout.vue'


export default {
  components: {
    MainLayout
  },
  data() {
    return {
      pengaduans: [],
      loading: true,
      role: '',
      userId: null
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const userId = localStorage.getItem('user_id') // pastikan kamu simpan user_id saat login

    this.role = role
    this.userId = parseInt(userId) // pastikan dalam bentuk angka (sama seperti item.user_id)

    try {
      const endpoint = role === 'admin'
        ? 'http://localhost:8000/api/pengaduan/all'
        : 'http://localhost:8000/api/pengaduan/me'

      const res = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      this.pengaduans = res.data
    } catch (error) {
      console.error(error)
      this.$router.push('/login')
    } finally {
      this.loading = false
    }
  },
  methods: {
    async hapusPengaduan(id) {
      if (!confirm('Yakin ingin menghapus pengaduan ini?')) return

      try {
        const token = localStorage.getItem('token')
        await axios.delete(`http://localhost:8000/api/pengaduan/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        // Hapus dari daftar lokal
        this.pengaduans = this.pengaduans.filter(p => p.id !== id)
      } catch (error) {
        console.error('Gagal menghapus:', error)
        alert('Terjadi kesalahan saat menghapus pengaduan.')
      }
    }
  }

}
</script>