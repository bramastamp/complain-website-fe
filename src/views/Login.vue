<template>
  <div class="container mt-5">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control" required>
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" required>
      </div>
      <button class="btn btn-primary">Login</button>
      <p class="text-danger mt-2" v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('http://localhost:8000/api/login', {
          email: this.email,
          password: this.password
        })

        // Simpan token dan role dari response backend
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('role', res.data.user.role)
        localStorage.setItem('user', JSON.stringify(res.data.user)) // opsional: simpan info user lengkap

        // Arahkan ke dashboard
        this.$router.push('/dashboard')
      } catch (err) {
        this.error = 'Login gagal. Periksa kembali email dan password.'
      }
    }
  }
}
</script>