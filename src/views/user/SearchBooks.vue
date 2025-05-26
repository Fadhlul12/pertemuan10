<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <header class="mb-8">
      <h1 class="text-2xl font-bold text-indigo-800">Cari Buku</h1>
      <nav class="mt-4 space-x-4">
        <router-link to="/" class="text-indigo-600 hover:text-indigo-800">Home</router-link>
        <router-link to="/search-books" class="font-semibold text-indigo-800">Cari Buku</router-link>
        <router-link to="/my-books" class="text-indigo-600 hover:text-indigo-800">Buku Saya</router-link>
        <router-link to="/dashboard" class="text-indigo-600 hover:text-indigo-800">Dashboard</router-link>
      </nav>
    </header>

    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Cari buku..."
        class="w-full rounded border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
      />

      <div class="mt-4 flex flex-wrap gap-4">
        <select v-model="selectedCategory" class="rounded border px-3 py-2">
          <option value="">Semua Kategori</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>

        <select v-model="selectedAvailability" class="rounded border px-3 py-2">
          <option value="">Semua Status</option>
          <option value="available">Tersedia</option>
          <option value="borrowed">Dipinjam</option>
        </select>

        <button @click="resetFilters" class="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300">Reset</button>
      </div>
    </div>

    <div v-if="filteredBooks.length > 0">
      <ul class="space-y-4">
        <li v-for="book in filteredBooks" :key="book.id" class="rounded bg-white p-4 shadow">
          <h3 class="text-lg font-semibold text-gray-800">{{ book.title }}</h3>
          <p class="text-sm text-gray-600">Penulis: {{ book.author }}</p>
          <p class="text-sm text-gray-600">Kategori: {{ book.category }} | Tahun: {{ book.year }}</p>
          <p class="text-sm" :class="book.available ? 'text-green-600' : 'text-red-600'">
            Status: {{ book.available ? 'Tersedia' : 'Dipinjam' }}
          </p>
        </li>
      </ul>
    </div>

    <div v-else class="mt-10 text-center text-gray-500">
      Tidak ada buku ditemukan.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      selectedAvailability: '',
      categories: ['Fiksi', 'Non-Fiksi', 'Sains', 'Teknologi', 'Sejarah', 'Bisnis'],
      books: [
        { id: 1, title: 'Vue.js Dasar', author: 'Andi', year: 2022, category: 'Teknologi', available: true },
        { id: 2, title: 'Sejarah Dunia', author: 'Budi', year: 2020, category: 'Sejarah', available: false },
        { id: 3, title: 'Bisnis Online', author: 'Citra', year: 2021, category: 'Bisnis', available: true },
        { id: 4, title: 'Fiksi Modern', author: 'Dedi', year: 2019, category: 'Fiksi', available: true }
      ]
    };
  },
  computed: {
    filteredBooks() {
      return this.books.filter(book => {
        const q = this.searchQuery.toLowerCase();
        const matchSearch = book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q) || book.category.toLowerCase().includes(q);
        const matchCategory = !this.selectedCategory || book.category === this.selectedCategory;
        const matchAvailability =
          !this.selectedAvailability ||
          (this.selectedAvailability === 'available' && book.available) ||
          (this.selectedAvailability === 'borrowed' && !book.available);
        return matchSearch && matchCategory && matchAvailability;
      });
    }
  },
  methods: {
    resetFilters() {
      this.searchQuery = '';
      this.selectedCategory = '';
      this.selectedAvailability = '';
    }
  }
};
</script>

<style scoped>
.router-link-active {
  font-weight: bold;
  color: #4f46e5;
}
</style>
