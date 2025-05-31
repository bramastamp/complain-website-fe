<!-- components/Sidebar.vue -->
<template>
  <div class="bg-light border-end" id="sidebar-wrapper" style="width: 250px; min-height: 100vh;">
    <div class="sidebar-heading p-3"><strong>Menu</strong></div>
    <div class="list-group list-group-flush">
      <router-link to="/dashboard" class="list-group-item list-group-item-action bg-light">Dashboard</router-link>
      <router-link to="/pengaduan/create" class="list-group-item list-group-item-action bg-light">Buat Pengaduan</router-link>
      <router-link to="/logout" class="list-group-item list-group-item-action bg-light">Logout</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped>
#sidebar-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}
</style>
