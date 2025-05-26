<template>
  <div class="home-container">
    <!-- Background image with overlay -->
    <div class="background-overlay"></div>
    
    <!-- Main content -->
    <div class="content">
      <!-- Navigation -->
      <nav class="navbar">
        <h1 class="logo">Perpustakaan Digital</h1>
        <ul class="nav-links">
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/dashboard">Dashboard</router-link></li>
          <li><router-link to="/cari">Cari Buku</router-link></li>
          <li><router-link to="/my-books">Buku Saya</router-link></li>
          <li><router-link to="/admin">Admin</router-link></li>
        </ul>
      </nav>

      <!-- Hero section -->
      <section class="hero">
        <h1>Selamat Datang di Perpustakaan Digital</h1>
        <p class="subtitle">Temukan, baca, dan kelola koleksi buku digital Anda dengan mudah.</p>
        
        <div class="cta-buttons">
          <router-link to="/SearchBooks" class="btn primary">Jelajahi Koleksi</router-link>
          <router-link to="/login" class="btn secondary">Mulai Membaca</router-link>
        </div>
      </section>

      <!-- Features section -->
      <section class="features">
        <div class="feature-card">
          <div class="icon">📚</div>
          <h3>Cart Buku</h3>
          <p>Telusuri ribuan koleksi buku dengan cepat dan mudah.</p>
        </div>
        
        <div class="feature-card">
          <div class="icon">❤️</div>
          <h3>Buku Favorit</h3>
          <p>Simpan dan baca buku favorit Anda kapan saja.</p>
        </div>
        
        <div class="feature-card">
          <div class="icon">⚙️</div>
          <h3>Dashboard Admin</h3>
          <p>Kelola koleksi dan pengguna dengan fitur admin.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home-container {
  position: relative;
  min-height: 100vh;
  color: #fff;
}

.background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.background-overlay::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.content {
  position: relative;
  z-index: 1;
  padding: 20px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  margin-bottom: 2rem;
}

.logo {
  margin: 0;
  font-size: 1.5rem;
  color: #fff;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1.5rem;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #4CAF50;
}

.hero {
  text-align: center;
  padding: 4rem 2rem;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.btn.primary {
  background-color: #4CAF50;
  color: white;
}

.btn.primary:hover {
  background-color: #3e8e41;
}

.btn.secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn.secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
}

.feature-card {
  padding: 1.5rem;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card .icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin-bottom: 0.5rem;
  color: #4CAF50;
}

.feature-card p {
  opacity: 0.9;
  line-height: 1.6;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
  }
  
  .hero h1 {
    font-size: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>