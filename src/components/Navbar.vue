<template>
  <nav class="navbar navbar-expand navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="/dashboard">PengaduanApp</a>
      <div>
        <button @click="logout" class="btn btn-danger btn-sm">Logout</button>
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