<template>
  <div class="container mt-5">
    <h2>Detail Pengaduan</h2>
    <p><strong>Status:</strong> {{ pengaduan.status }}</p>
    <p><strong>Isi Pengaduan:</strong> {{ pengaduan.isi }}</p>

    <div v-if="tanggapans.length">
      <h3>Tanggapan Admin</h3>
      <ul>
        <li v-for="t in tanggapans" :key="t.id">
          {{ t.isi_tanggapan }} <br />
          <small>oleh Admin ID: {{ t.admin_id }}, {{ new Date(t.created_at).toLocaleString() }}</small>
        </li>
      </ul>
    </div>

    <div v-else>
      <p>Belum ada tanggapan.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
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
  }
}
</script>