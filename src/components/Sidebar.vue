<template>
  <div id="sidebar-wrapper" class="bg-white border-0 px-3 pt-4">
    <!-- Header -->
    <div class="mb-5 mt-2 text-center">
      <h4 class="fw-bold" style="font-family: 'Poppins', sans-serif;">Laporin!</h4>
    </div>

    <!-- Menu -->
    <div class="nav flex-column">
      <!-- Tampilkan hanya jika sudah login -->
      <router-link
        v-if="isLoggedIn"
        to="/dashboard"
        class="nav-link custom-nav-link d-flex align-items-center gap-2 mb-2"
        :class="{ active: $route.path === '/dashboard' }"
      >
        <i class="bi bi-speedometer2"></i>
        <span>Dashboard</span>
      </router-link>

      <router-link
        v-if="isLoggedIn"
        to="/pengaduan/create"
        class="nav-link custom-nav-link d-flex align-items-center gap-2 mb-2"
        :class="{ active: $route.path === '/pengaduan/create' }"
      >
        <i class="bi bi-pencil-square"></i>
        <span>Buat Pengaduan</span>
      </router-link>

      <!-- Tombol Logout/Login -->
      <button
        @click="handleAuthAction"
        class="nav-link d-flex align-items-center gap-2 text-start w-100 btn btn-link mb-2"
        :class="isLoggedIn ? 'logout-btn' : 'login-btn'"
      >
        <i :class="isLoggedIn ? 'bi bi-box-arrow-right' : 'bi bi-box-arrow-in-right'"></i>
        <span>{{ isLoggedIn ? 'Logout' : 'Login' }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('token')
    };
  },
  methods: {
    handleAuthAction() {
      if (this.isLoggedIn) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user_id');
        this.$router.push('/login');
      } else {
        this.$router.push('/login');
      }
    }
  },
  watch: {
    '$route'() {
      this.isLoggedIn = !!localStorage.getItem('token');
    }
  }
}
</script>

<style scoped>
#sidebar-wrapper {
  width: 250px;
  min-height: 100vh;
  border-right: 1px solid #dee2e6;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  font-family: 'Poppins', sans-serif;
}

.custom-nav-link {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: #6c757d;
  font-weight: 600;
  transition: background-color 0.3s ease-in-out;
}

.custom-nav-link:hover {
  background-color: #f1f1f1;
  text-decoration: none;
  color: #495057;
}

.custom-nav-link.active {
  background-color: #f6f5f5;
  color: #343a40;
}

/* Tombol Logout (Merah) */
.logout-btn {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  color: #dc3545;
  transition: background-color 0.3s ease-in-out;
}

.logout-btn:hover {
  background-color: #ffe2e5;
  color: #a71d2a;
}

/* Tombol Login (Biru) */
.login-btn {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  color: #007bff;
  transition: background-color 0.3s ease-in-out;
}

.login-btn:hover {
  background-color: #e0f0ff;
  color: #0056b3;
}
</style>