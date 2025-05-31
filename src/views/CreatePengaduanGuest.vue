<template>
  <MainLayout>
    <div class="container mt-5">
      <h2>Buat Pengaduan Baru Sebagai Anonim</h2>
      <p>Catatan: Data Anda tidak akan disimpan. Anda tidak dapat melakukan 
        pemantauan terhadap pengaduan yang telah Anda buat, ini mencakup mengubah dan menghapus pengaduan, 
        dan melihat tanggapan yang diberikan pihak sekolah mengenai pengaduan yang Anda buat.</p>
      <div class="alert alert-success" v-if="successMessage">{{ successMessage }}</div>
      <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>

      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="kategori" class="form-label">Kategori</label>
          <select id="kategori" v-model="kategori_id" class="form-control" required>
            <option disabled value="">Pilih kategori</option>
            <option v-for="kategori in kategoriList" :key="kategori.id" :value="kategori.id">
              {{ kategori.nama_kategori }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="judul" class="form-label">Judul</label>
          <input type="text" id="judul" class="form-control" v-model="judul" required />
        </div>

        <div class="mb-3">
          <label for="isi" class="form-label">Isi Pengaduan</label>
          <textarea id="isi" class="form-control" rows="5" v-model="isi" required></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Kirim Pengaduan</button>
      </form>
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
      judul: '',
      isi: '',
      kategori_id: '',
      kategoriList: [],
      successMessage: '',
      errorMessage: ''
    }
  },
  methods: {
    async submitForm() {
      if (!this.kategori_id || !this.judul.trim() || !this.isi.trim()) {
        this.errorMessage = 'Semua bidang harus diisi.'
        this.successMessage = ''
        return
      }

      try {
        await await axios.post('http://localhost:8000/api/pengaduan-guest', {
          judul: this.judul,
          isi: this.isi,
          kategori_id: this.kategori_id,
        })

        this.successMessage = 'Pengaduan berhasil dikirim!'
        this.errorMessage = ''
        this.judul = ''
        this.isi = ''
        this.kategori_id = ''
      } catch (error) {
        this.errorMessage = 'Gagal mengirim pengaduan. Pastikan semua data valid.'
        this.successMessage = ''
        console.error(error)
      }
    }
  },
  async created() {
    try {
      const res = await axios.get('http://localhost:8000/api/kategori')
      this.kategoriList = res.data
    } catch (error) {
      this.errorMessage = 'Gagal memuat kategori.'
      console.error('Gagal memuat kategori:', error)
    }
  }
}
</script>