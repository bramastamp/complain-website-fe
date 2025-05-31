<template>
  <div class="container mt-5">
    <h2>Edit Pengaduan</h2>

    <form @submit.prevent="updatePengaduan" class="mt-4">
      <div class="mb-3">
        <label for="judul" class="form-label">Judul</label>
        <input
          type="text"
          id="judul"
          v-model="form.judul"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="isi" class="form-label">Isi</label>
        <textarea
          id="isi"
          v-model="form.isi"
          class="form-control"
          rows="5"
          required
        ></textarea>
      </div>

      <button type="submit" class="btn btn-success">Update</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        judul: '',
        isi: ''
      }
    }
  },
  async mounted() {
    const id = this.$route.params.id
    const token = localStorage.getItem('token')

    try {
      const res = await axios.get(`http://localhost:8000/api/pengaduan/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      this.form.judul = res.data.judul
      this.form.isi = res.data.isi
    } catch (error) {
      console.error('Gagal mengambil data:', error)
    }
  },
  methods: {
    async updatePengaduan() {
      const id = this.$route.params.id
      const token = localStorage.getItem('token')

      try {
        await axios.put(
          `http://localhost:8000/api/pengaduan/${id}`,
          this.form,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        alert('Pengaduan berhasil diperbarui')
        this.$router.push('/dashboard')
      } catch (error) {
        alert('Gagal memperbarui pengaduan')
        console.error(error)
      }
    }
  }
}
</script>