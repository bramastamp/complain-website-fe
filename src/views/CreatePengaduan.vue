<template>
  <div class="container mt-5">
    <h2>Buat Pengaduan Baru</h2>
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

      <!-- Checkbox Kirim sebagai Anonim -->
      <div class="form-check mb-3">
        <input
          class="form-check-input"
          type="checkbox"
          id="anonim"
          v-model="is_anonymous"
        />
        <label class="form-check-label" for="anonim">
          Kirim sebagai anonim
        </label>
      </div>

      <button type="submit" class="btn btn-primary">Kirim Pengaduan</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      judul: '',
      isi: '',
      kategori_id: '',
      is_anonymous: false, // checkbox state
      kategoriList: [],
      successMessage: '',
      errorMessage: ''
    }
  },
  methods: {
    async submitForm() {
      try {
        const token = localStorage.getItem('token')
        await axios.post('http://localhost:8000/api/pengaduan', {
          judul: this.judul,
          isi: this.isi,
          kategori_id: this.kategori_id,
          is_anonymous: this.is_anonymous // sesuai input checkbox
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        this.successMessage = 'Pengaduan berhasil dikirim!'
        this.judul = ''
        this.isi = ''
        this.kategori_id = ''
        this.is_anonymous = false
        this.errorMessage = ''
      } catch (error) {
        this.errorMessage = 'Gagal mengirim pengaduan. Pastikan semua data valid.'
        console.error(error)
      }
    }
  },
  async created() {
    try {
      const res = await axios.get('http://localhost:8000/api/kategori')
      this.kategoriList = res.data
    } catch (error) {
      console.error('Gagal memuat kategori:', error)
    }
  }
}
</script>