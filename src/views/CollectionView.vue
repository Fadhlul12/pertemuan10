<template>
  <div class="collection-view">
    <div class="overlay"></div>

    <div class="header">
      <h1>💾 My Game Collection</h1>
      <button @click="showForm = true">+ Add Game</button>
    </div>

    <div class="content-grid">
      <div class="games-list">
        <div v-if="gameStore.games.length === 0" class="empty">
          <p>No games yet. Add one!</p>
        </div>

        <div class="games-grid">
          <div v-for="game in gameStore.games" :key="game.id" class="game-card glass">
            <router-link
              :to="`/games/${game.id}`"
              style="text-decoration: none; color: inherit;"
            >
              <GameCard :game="game" />
            </router-link>

            <div class="actions">
              <button @click="editGame(game)">Edit</button>
              <button @click="gameStore.deleteGame(game.id)" class="delete">Delete</button>
              <button @click="gameStore.addToBacklog(game.id)" class="backlog">In Backlog</button>
            </div>
          </div>
        </div>
      </div>

      <div class="form-panel glass" v-if="showForm || selectedGame">
        <GameForm
          :game="selectedGame"
          @submit="handleSubmit"
          @cancel="handleCancel"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import GameCard from '@/components/GameCard.vue'
import GameForm from '@/components/GameForm.vue'

const gameStore = useGameStore()
const showForm = ref(false)
const selectedGame = ref(null)

onMounted(() => {
  gameStore.fetchGames()
  gameStore.fetchBacklog()
})

const editGame = (game) => {
  selectedGame.value = game
  showForm.value = true
}

const handleSubmit = (gameData) => {
  if (selectedGame.value) {
    gameStore.updateGame(selectedGame.value.id, gameData)
  } else {
    gameStore.addGame(gameData)
  }
  showForm.value = false
  selectedGame.value = null
}

const handleCancel = () => {
  showForm.value = false
  selectedGame.value = null
}
</script>

<style scoped>
.collection-view {
  position: relative;
  padding: 2rem;
  min-height: 100vh;
  background-image: url('@/assets/max.png');
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

.collection-view > * {
  position: relative;
  z-index: 1;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header h1 {
  color: #00ffe7;
  text-shadow: 0 0 8px #00ffe7;
}

button {
  background: #00ffe7;
  color: #000;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 0 6px #00ffe7;
  transition: background 0.3s;
}

button:hover {
  background: #0ff;
}

.content-grid {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.games-list {
  flex: 2;
}

.form-panel {
  flex: 1.2;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.2rem;
}

.game-card {
  padding: 1rem;
  border-radius: 12px;
  overflow: hidden;
}

.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 0.6rem;
  gap: 0.5rem;
}

.actions button {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
}

.actions .delete {
  background: #ff1744;
  color: white;
  box-shadow: 0 0 6px #ff1744;
}

.actions .backlog {
  background: #00b0ff;
  color: white;
  box-shadow: 0 0 6px #00b0ff;
}

.empty {
  text-align: center;
  color: #ccc;
  padding: 2rem 0;
  font-style: italic;
}
</style>
