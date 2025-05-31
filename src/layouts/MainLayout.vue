<!-- layouts/MainLayout.vue -->
<template>
  <div class="d-flex">
    <Sidebar />

    <div class="flex-grow-1 p-4" style="margin-left: 250px;">
      <slot />
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
  components: {
    Sidebar
  }
}
</script>
