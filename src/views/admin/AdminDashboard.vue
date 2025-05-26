<template>
  <div class="dashboard-container">
    <h1 class="title">Dashboard Admin</h1>
    <p class="subtitle">
      Selamat datang, Admin! Anda dapat mengelola buku, pengguna, dan melihat laporan dari sini.
    </p>

    <div class="grid">
      <div class="card">
        <h2>Total Buku</h2>
        <p>1520</p>
      </div>
      <div class="card">
        <h2>Pengguna Terdaftar</h2>
        <p>320</p>
      </div>
      <div class="card">
        <h2>Laporan Masuk</h2>
        <p>27</p>
      </div>
      <div class="card">
        <h2>Buku Sedang Dipinjam</h2>
        <p>88</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard'
}
</script>

<style scoped>
.dashboard-container {
  padding: 2rem;
  color: #2c3e50;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #555;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #f7f9fc;
  padding: 1.5rem;
  border-left: 5px solid #3498db;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card h2 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.card p {
  font-size: 1.8rem;
  font-weight: bold;
  color: #2c3e50;
}
</style>
