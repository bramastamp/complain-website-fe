<template>
  <div class="container mt-5">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label>Nama</label>
        <input v-model="form.name" type="text" class="form-control" required>
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input v-model="form.email" type="email" class="form-control" required>
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input v-model="form.password" type="password" class="form-control" required>
      </div>
      <div class="mb-3">
        <label>Konfirmasi Password</label>
        <input v-model="form.password_confirmation" type="password" class="form-control" required>
      </div>
      <button class="btn btn-success">Register</button>
      <p class="text-danger mt-2" v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      error: ''
    }
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:8000/api/register', this.form)
        this.$router.push('/login')
      } catch (err) {
        this.error = 'Registrasi gagal. Coba lagi.'
      }
    }
  }
}
</script>
