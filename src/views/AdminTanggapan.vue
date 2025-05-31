<template>
  <div class="container mt-5">
    <h2>Kelola Tanggapan Pengaduan</h2>

    <hr />

    <div v-if="pengaduan">
      <h5>Detail Pengaduan</h5>
      <p><strong>ID:</strong> {{ pengaduan.id }}</p>
      <p><strong>Isi Pengaduan:</strong> {{ pengaduan.isi }}</p>
      <hr />
    </div>

    <h3>Tambah Tanggapan Baru</h3>
    <form @submit.prevent="submitTanggapan">
      <div class="mb-3">
        <label for="isi" class="form-label">Isi Tanggapan</label>
        <textarea
          id="isi"
          v-model="form.isi_tanggapan"
          class="form-control"
          rows="4"
          required
        ></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Kirim Tanggapan</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['pengaduanId'], // ambil dari route param
  data() {
    return {
      tanggapans: [],
      form: {
        pengaduan_id: this.$route.params.pengaduanId,
        isi_tanggapan: '',
      },
      pengaduan: null,
    };
  },
  async mounted() {
    await this.fetchPengaduan();
    await this.fetchTanggapans();
  },
  methods: {
    async fetchPengaduan() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token tidak ditemukan. Silakan login ulang.');
        return;
      }

      try {
        console.log('pengaduanId:', this.pengaduanId);
        const res = await axios.get(
          `http://localhost:8000/api/pengaduan/${this.$route.params.pengaduanId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        this.pengaduan = res.data;
      } catch (error) {
        alert(
          'Gagal mengambil data pengaduan: ' +
            (error.response?.data?.message || error.message)
        );
      }
    },
    async fetchTanggapans() {
      const token = localStorage.getItem('token');
      try {
        // Ambil tanggapan untuk pengaduan tertentu saja
        const res = await axios.get(
          `http://localhost:8000/api/pengaduan/${this.$route.params.pengaduanId}/tanggapan`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        this.tanggapans = res.data;
      } catch (error) {
        alert('Gagal mengambil data tanggapan');
      }
    },
    async submitTanggapan() {
      const token = localStorage.getItem('token');
      try {
        await axios.post(
          `http://localhost:8000/api/tanggapan`,
          {
            pengaduan_id: this.form.pengaduan_id,
            isi_tanggapan: this.form.isi_tanggapan,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert('Tanggapan berhasil dikirim');
        this.$router.push('/dashboard');
        this.form.isi_tanggapan = '';
        this.fetchTanggapans();
      } catch (error) {
        alert(
          'Gagal mengirim tanggapan: ' +
            (error.response?.data?.message || error.message)
        );
      }
    },
  },
};
</script>
