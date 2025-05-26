<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Kelola Buku</h1>
    <button class="bg-blue-600 text-white px-4 py-2 rounded mb-4">+ Tambah Buku</button>
    <table class="w-full border">
      <thead>
        <tr class="bg-gray-200">
          <th class="border px-4 py-2">Judul</th>
          <th class="border px-4 py-2">Penulis</th>
          <th class="border px-4 py-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border px-4 py-2">Contoh Buku</td>
          <td class="border px-4 py-2">Penulis A</td>
          <td class="border px-4 py-2">
            <button class="bg-yellow-500 px-2 py-1 text-white rounded">Edit</button>
            <button class="bg-red-500 px-2 py-1 text-white rounded ml-2">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
</script>
