<template>
  <MainLayout>
    <div class="container mt-5" style="font-family: 'Poppins', sans-serif;">
      <h2 class="mb-3">Detail Pengaduan</h2>

      <h4 class="mb-2">Judul: {{ pengaduan.judul }}</h4>

      <p>
        <strong>Status: </strong>
        <span :class="statusClass(pengaduan.status)">{{ pengaduan.status || '-' }}</span>
      </p>

      <p>
        <strong>Isi Pengaduan:</strong><br />
        {{ pengaduan.isi || '-' }}
      </p>

      <div v-if="tanggapans.length">
        <h3 class="mt-4 mb-3">Tanggapan Admin</h3>
        <ul class="list-group">
          <li v-for="t in tanggapans" :key="t.id" class="list-group-item">
            {{ t.isi_tanggapan }}
            <br />
            <small class="text-muted">
              oleh Admin ID: {{ t.admin_id }}, {{ formatDate(t.created_at) }}
            </small>
          </li>
        </ul>
      </div>

      <div v-else>
        <p class="text-muted mt-4">Belum ada tanggapan.</p>
      </div>

      <router-link to="/dashboard" class="btn btn-secondary mt-4">
        Kembali ke Daftar Pengaduan
      </router-link>
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
      pengaduan: {},
      tanggapans: [],
    }
  },
  async mounted() {
    const id = this.$route.params.id
    const token = localStorage.getItem('token')

    try {
      const resPengaduan = await axios.get(`http://localhost:8000/api/pengaduan/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      this.pengaduan = resPengaduan.data

      const resTanggapan = await axios.get(`http://localhost:8000/api/pengaduan/${id}/tanggapan`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      this.tanggapans = resTanggapan.data
    } catch (error) {
      alert('Gagal mengambil data pengaduan atau tanggapan.')
    }
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return '-'
      const d = new Date(dateStr)
      return d.toLocaleString()
    },
    statusClass(status) {
      switch (status) {
        case 'terkirim':
          return 'text-primary fw-semibold'
        case 'diproses':
          return 'text-warning fw-semibold'
        case 'ditanggapi':
          return 'text-success fw-semibold'
        case 'selesai':
          return 'text-muted fw-semibold'
        default:
          return ''
      }
    }
  }
}
</script>

<style scoped>
.list-group-item {
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: #f8f9fa;
}

h2, h3, h4 {
  font-weight: 600;
}
</style>
