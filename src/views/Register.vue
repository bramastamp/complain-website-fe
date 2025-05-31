<template>
  <div class="register-page d-flex flex-column justify-content-center align-items-center">
    <h2 class="website-title mb-4">Laporin!</h2>

    <div class="register-box p-4">
      <h3 class="mb-4 text-center fw-bold">Register</h3>

      <form @submit.prevent="register">
        <div class="mb-3">
          <label class="form-label">Nama</label>
          <input v-model="form.name" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="form.email" type="email" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input v-model="form.password" type="password" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Konfirmasi Password</label>
          <input v-model="form.password_confirmation" type="password" class="form-control" required />
        </div>

        <button class="btn btn-primary w-100">Register</button>
        <p class="text-danger mt-2" v-if="error">{{ error }}</p>
      </form>

      <!-- Login Prompt -->
      <div class="mt-4 text-center">
        <p class="mb-0">
          Sudah punya akun?
          <router-link to="/login" class="text-decoration-none text-primary fw-semibold">
            Login
          </router-link>
        </p>
      </div>
    </div>
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.register-page {
  height: 100vh;
  background-color: #f6f5f5;
  font-family: 'Poppins', sans-serif;
}

.website-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #343a40;
}

.register-box {
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.1);
}
</style>