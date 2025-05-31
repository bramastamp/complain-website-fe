<template>
  <nav class="navbar navbar-expand navbar-light bg-light">
    <div class="container">
      <div class="mb-5 text-center"> <!-- mb-5 untuk tambah jarak -->
        <h4 class="fw-bold" style="font-family: 'Poppins', sans-serif;">Laporin!</h4>
      </div>
      <div>
        <!-- <button @click="logout" class="btn btn-danger btn-sm">Logout</button> -->
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>