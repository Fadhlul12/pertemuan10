<template>
  <div class="backlog-view">
    <div class="overlay"></div>

    <h1>🕹️ My Backlog</h1>

    <div v-if="gameStore.backlog.length === 0" class="empty-backlog glass">
      <p>No games in your backlog</p>
      <router-link to="/collection" class="browse-link">Browse Collection</router-link>
    </div>

    <div v-else class="backlog-grid">
      <div
        v-for="item in gameStore.backlog"
        :key="item.id"
        class="backlog-card glass"
      >
        <GameCard :game="getGame(item.gameId)" />

        <div class="meta">
          <div class="added">🎯 Added: {{ formatDate(item.addedAt) }}</div>
          <button @click="gameStore.removeFromBacklog(item.id)" class="remove-btn">
            🗑 Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import GameCard from '@/components/GameCard.vue'

const gameStore = useGameStore()

onMounted(() => {
  gameStore.fetchGames()
  gameStore.fetchBacklog()
})

const getGame = (gameId) => {
  return gameStore.games.find((game) => game.id === gameId) || {}
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}
</script>

<style scoped>
.backlog-view {
  position: relative;
  padding: 2rem;
  min-height: 100vh;
  background-image: url('@/assets/Cpu.png');
  background-size: cover;
  background-position: center;
  overflow: hidden;
  color: #e0e0e0;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  z-index: 0;
  border-radius: 12px;
}

.backlog-view > * {
  position: relative;
  z-index: 1;
}

h1 {
  font-size: 2rem;
  color: #00ffe7;
  text-shadow: 0 0 10px #00ffe7;
  margin-bottom: 1.5rem;
  text-align: center;
}

.backlog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.backlog-card {
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.meta {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ccc;
}

.meta .added {
  font-size: 0.9rem;
  color: #aaa;
}

.remove-btn {
  background-color: #ff1744;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 0 6px #ff1744;
}

.remove-btn:hover {
  background-color: #d50000;
}

.empty-backlog {
  text-align: center;
  padding: 3rem;
  font-style: italic;
  color: #ccc;
}

.browse-link {
  margin-top: 1rem;
  display: inline-block;
  color: #00ffe7;
  text-decoration: underline;
  font-weight: bold;
}

/* Glassmorphism reusable */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
