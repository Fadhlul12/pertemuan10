<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="logo">
        <img src="/cyberpunk-logo.png" alt="Logo" class="logo-img" />
        <span>GameTrack</span>
      </router-link>

      <div class="nav-links">
        <router-link 
          v-for="link in links" 
          :key="link.path" 
          :to="link.path"
          :class="{ active: $route.path === link.path }"
        >
          {{ link.name }}
        </router-link>
      </div>

      <div class="profile-container">
        <span class="greeting">👋 Hi, {{ authStore.user?.username || 'User' }}</span>
        <div class="avatar" @click="toggleMenu">
          <img :src="authStore.user?.avatar || 'https://via.placeholder.com/36x36?text=?'" />
        </div>

        <div v-if="menuOpen" class="dropdown">
          <router-link to="/profile">👤 Profile</router-link>
          <button @click="confirmLogout">🚪 Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const menuOpen = ref(false)

const links = [
  { path: '/', name: 'Dashboard' },
  { path: '/collection', name: 'Collection' },
  { path: '/backlog', name: 'Backlog' }
]

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const confirmLogout = () => {
  if (confirm('Apakah Anda yakin ingin logout?')) {
    authStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(to right, #0f0c29, #302b63, #24243e);
  padding: 1rem 0;
  width: 100%;
  color: #00ffe1;
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.4);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: bold;
  color: #00ffe1;
  gap: 0.5rem;
}

.logo-img {
  height: 40px;
  width: auto;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  color: #ccc;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a.active {
  color: #00ffe1;
  font-weight: bold;
  text-shadow: 0 0 5px #00ffe1;
}

.profile-container {
  display: flex;
  align-items: center;
  position: relative;
  gap: 0.5rem;
}

.greeting {
  font-weight: bold;
  color: #00ffe1;
  text-shadow: 0 0 3px #00ffe1;
}

.avatar img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid #00ffe1;
}

.dropdown {
  position: absolute;
  top: 110%;
  right: 0;
  background: #1e1e2f;
  color: white;
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 255, 225, 0.3);
  padding: 1rem;
  width: 180px;
  z-index: 100;
}

.dropdown a,
.dropdown button {
  display: block;
  padding: 0.6rem 0.8rem;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  text-align: left;
  width: 100%;
  transition: background 0.2s;
}

.dropdown a:hover,
.dropdown button:hover {
  background: #292947;
}
</style>
