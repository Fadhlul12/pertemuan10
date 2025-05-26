<template>
  <div class="layout">
    <aside class="sidebar">
      <h1>Perpustakaan Digital</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
<router-link to="/dashboard/search">Cari Buku</router-link>
<router-link to="/dashboard/my-books">Buku Saya</router-link>

        <router-link to="/admin">Admin</router-link>
      </nav>
    </aside>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  background-color: #1f2937;
  color: white;
  padding: 2rem 1.5rem;
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebar h1 {
  font-size: 1.6rem;
  margin-bottom: 2rem;
  text-align: left;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar a {
  color: #60a5fa;
  text-decoration: none;
  padding: 0.4rem 0.5rem;
  border-radius: 4px;
  text-align: left;
}

.sidebar a.router-link-exact-active {
  background-color: #2563eb;
  color: white;
}

.content {
  flex: 1;
  padding: 3rem;
}
</style>
