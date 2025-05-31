<template>
  <MainLayout>
    <!-- Search -->
    <div class="row mb-4">
      <div class="col-md-6 mb-2 position-relative">
        <i class="bi bi-search search-icon"></i>
        <input
          v-model="searchQuery"
          type="text"
          class="form-control search-input ps-5 border-0"
          placeholder="Cari judul atau isi pengaduan..."
        />
      </div>
      <div class="col-md-3">
        <select v-model="kategoriId" class="form-select border-0">
          <option value="">Semua Kategori</option>
          <option v-for="kat in kategoriList" :key="kat.id" :value="kat.id">
            {{ kat.nama_kategori }}
          </option>
        </select>
      </div>
    </div>
    
    <div class="container mt-4" style="font-family: 'Poppins', sans-serif;">
      <h2 v-if="role === 'admin'">Daftar Semua Pengaduan</h2>
      <h2 class="" v-else>Daftar Pengaduan Saya</h2>

      <div v-if="loading">Memuat data...</div>
      <div v-else-if="pengaduans.length === 0">Belum ada pengaduan.</div>

      <div v-else>
        <div class="row">
          <div v-for="item in pengaduanTersaring" :key="item.id" class="col-md-4 mt-4 mb-4">
            <div class="card h-100 shadow-custom"
            :class="{'highlight-card': item.highlighted}"
            >
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <!-- Judul -->
                  <h5 class="card-title fw-bold">{{ item.judul }}</h5>
                  
                  <!-- Isi -->
                  <p class="card-text">{{ item.isi }}</p>

                  <!-- Kategori (rata kanan) -->
                  <p class="card-text text-end text-muted mb-1">
                    Kategori:
                    {{ item.kategori?.nama_kategori || 'Tidak ada kategori' }}
                  </p>

                  <!-- Pengirim (admin saja) -->
                  <p v-if="role === 'admin'" class="fw-bold text-end">
                    <span v-if="item.is_anonymous">Anonim</span>
                    <span v-else-if="item.user">{{ item.user.name }}</span>
                    <span v-else>Tidak diketahui</span>
                  </p>

                  <!-- Status -->
                  <p class="text-muted">Status: {{ item.status }}</p>
                </div>

                <!-- Tombol -->
                <div class="mt-auto d-flex justify-content-between align-items-center pt-2">
                  <router-link
                    :to="`/pengaduan/${item.id}`"
                    class="btn btn-lihat-selengkapnya btn-sm flex-grow-1 me-2"
                  >
                    Lihat selengkapnya
                  </router-link>

                  <div class="d-flex gap-2">
                    <router-link
                      v-if="role !== 'admin'"
                      :to="`/pengaduan/edit/${item.id}`"
                      class="btn btn-outline-warning btn-sm"
                      title="Edit"
                    >
                      <i class="bi bi-pencil"></i>
                    </router-link>

                    <router-link 
                      v-if="role === 'admin'" 
                      :to="`/tanggapan/${item.id}`"
                      class="btn btn-outline-success btn-sm"
                      title="Tanggapi"
                    >
                      <i class="bi bi-reply-fill"></i>
                    </router-link>

                    <button
                      @click="hapusPengaduan(item.id)"
                      class="btn btn-outline-danger btn-sm"
                      title="Hapus"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>

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
      userId: null,
      searchQuery: '',
      kategoriId: '',
      kategoriList: []
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const userId = localStorage.getItem('user_id')

    this.role = role
    this.userId = parseInt(userId)

    try {
      // Ambil pengaduan
      const endpoint = role === 'admin'
        ? 'http://localhost:8000/api/pengaduan/all'
        : 'http://localhost:8000/api/pengaduan/me'

      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      })

      this.pengaduans = res.data

      // Ambil daftar kategori
      const kategoriRes = await axios.get('http://localhost:8000/api/kategori', {
        headers: { Authorization: `Bearer ${token}` }
      })

      this.kategoriList = kategoriRes.data
      this.kategoriList = [
        { id: 1, nama_kategori: 'Fasilitas Sekolah' },
        { id: 2, nama_kategori: 'Guru dan Staff' },
        { id: 3, nama_kategori: 'Kegiatan Belajar' },
        { id: 4, nama_kategori: 'Lain-lain' }
      ]

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
        this.pengaduans = this.pengaduans.filter(p => p.id !== id)
      } catch (error) {
        console.error('Gagal menghapus:', error)
        alert('Terjadi kesalahan saat menghapus pengaduan.')
      }
    }
  },
  computed: {
    pengaduanTersaring() {
      const query = this.searchQuery.toLowerCase()

      return this.pengaduans
        .map(item => {
          const cocokJudul = item.judul.toLowerCase().includes(query)
          const cocokIsi = item.isi.toLowerCase().includes(query)
          const cocokKategori = this.kategoriId === '' || item.kategori_id == this.kategoriId

          const isHighlighted = query !== '' && (cocokJudul || cocokIsi) && cocokKategori

          return {
            ...item,
            highlighted: isHighlighted
          }
        })
        .filter(item => {
          const cocokJudul = item.judul.toLowerCase().includes(query)
          const cocokIsi = item.isi.toLowerCase().includes(query)
          const cocokKategori = this.kategoriId === '' || item.kategori_id == this.kategoriId

          return (cocokJudul || cocokIsi) && cocokKategori
        })
        .sort((a, b) => {
          return (b.highlighted === true) - (a.highlighted === true)
        })
    }
  }

}
</script>

<style scoped>
.shadow-custom {
  box-shadow: 6px 6px 20px 0px rgba(0,0,0,0.1);
  -webkit-box-shadow: 6px 6px 20px 0px rgba(0,0,0,0.1);
  -moz-box-shadow: 6px 6px 20px 0px rgba(0,0,0,0.1);
  border: none;
  border-radius: 10px;
}

/* Ukuran font default untuk konten halaman */
.container {
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
}

.btn-lihat-selengkapnya {
  background-color: #cef2fe;
  font-weight: 600; /* semi-bold */
  color: #000; /* opsional: agar teks terlihat jelas */
  border: none;
  transition: background-color 0.2s ease-in-out;
}

.btn-lihat-selengkapnya:hover {
  background-color: #bde7f9;
}

.highlight-card {
  border: 2px solid #007bff;
  background-color: #e6f0ff;
  transition: all 0.2s ease-in-out;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 28px;
  transform: translateY(-50%);
  color: #999;
  font-size: 1rem;
  pointer-events: none;
}

</style>
