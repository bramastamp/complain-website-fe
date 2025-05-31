<template>
  <div class="login-page d-flex flex-column justify-content-center align-items-center">
    <h2 class="website-title mb-4">Laporin!</h2>

    <div class="login-box p-4">
      <h3 class="mb-4 text-center fw-bold">Login</h3>

      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" required />
        </div>

        <button class="btn btn-primary w-100">Login</button>

        <p class="text-danger mt-2" v-if="error">{{ error }}</p>
      </form>

      <!-- Register dan Buat Pengaduan -->
      <div class="mt-4 text-center">
        <p class="mb-1">
          Belum memiliki akun?
          <router-link to="/register" class="text-decoration-none text-primary fw-semibold">
            Register
          </router-link>
        </p>
        <button 
          class="btn btn-outline-primary btn-sm mt-2"
          @click="$router.push('/pengaduan/create/guest')"
        >
          Buat Pengaduan Tanpa Login
        </button>
      </div>
    </div>
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

        localStorage.setItem('token', res.data.token)
        localStorage.setItem('role', res.data.user.role)
        localStorage.setItem('user', JSON.stringify(res.data.user))

        this.$router.push('/dashboard')
      } catch (err) {
        this.error = 'Login gagal. Periksa kembali email dan password.'
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.login-page {
  height: 100vh;
  background-color: #f6f5f5;
  font-family: 'Poppins', sans-serif;
}

.website-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #343a40;
}

.login-box {
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.1);
}
</style>