<template>
  <div class="app">
    <NavBar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </transition>
      </router-view>
    </main>
    <footer class="app-footer">
      <p>© 2023 GameTrack - All rights reserved</p>
    </footer>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-image: url('@/assets/car.png'); /* ganti dengan background cyberpunk kamu */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  color: white;
  font-family: 'Poppins', sans-serif;
}


.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 0;
  width: 100%;
  max-width: none;
  margin: 0;
}


.app-footer {
  text-align: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.5);
  color: #eee;
  backdrop-filter: blur(8px);
  font-size: 0.9rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
