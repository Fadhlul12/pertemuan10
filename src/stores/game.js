// stores/game.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('game', () => {
  const games = ref([])
  const backlog = ref([])

  const apiUrl = 'http://localhost:3000' // ganti jika port/host berbeda

  // FETCH semua game
  const fetchGames = async () => {
    try {
      const res = await fetch(`${apiUrl}/games`)
      games.value = await res.json()
    } catch (err) {
      console.error('Gagal fetch games:', err)
    }
  }

  // TAMBAH game
  const addGame = async (data) => {
    try {
      const res = await fetch(`${apiUrl}/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const newGame = await res.json()
      games.value.push(newGame)
    } catch (err) {
      console.error('Gagal tambah game:', err)
    }
  }

  // UPDATE game
  const updateGame = async (id, data) => {
    try {
      const res = await fetch(`${apiUrl}/games/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const updated = await res.json()
      const index = games.value.findIndex(g => g.id === id)
      if (index !== -1) games.value[index] = updated
    } catch (err) {
      console.error('Gagal update game:', err)
    }
  }

  // HAPUS game
  const deleteGame = async (id) => {
    try {
      await fetch(`${apiUrl}/games/${id}`, { method: 'DELETE' })
      games.value = games.value.filter(g => g.id !== id)
      backlog.value = backlog.value.filter(b => b.gameId !== id)
    } catch (err) {
      console.error('Gagal hapus game:', err)
    }
  }

  // FETCH backlog
  const fetchBacklog = async () => {
    try {
      const res = await fetch(`${apiUrl}/backlog`)
      backlog.value = await res.json()
    } catch (err) {
      console.error('Gagal fetch backlog:', err)
    }
  }

  // TAMBAH ke backlog
  const addToBacklog = async (gameId) => {
    try {
      const exists = backlog.value.find(b => b.gameId === gameId)
      if (exists) return

      const newEntry = {
        gameId,
        addedAt: new Date().toISOString(),
        priority: 'medium'
      }

      const res = await fetch(`${apiUrl}/backlog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
      })
      const result = await res.json()
      backlog.value.push(result)
    } catch (err) {
      console.error('Gagal tambah ke backlog:', err)
    }
  }

  // HAPUS dari backlog
  const removeFromBacklog = async (id) => {
    try {
      await fetch(`${apiUrl}/backlog/${id}`, { method: 'DELETE' })
      backlog.value = backlog.value.filter(b => b.id !== id)
    } catch (err) {
      console.error('Gagal hapus dari backlog:', err)
    }
  }

  return {
    games,
    backlog,
    fetchGames,
    fetchBacklog,
    addGame,
    updateGame,
    deleteGame,
    addToBacklog,
    removeFromBacklog
  }
})
