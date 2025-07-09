<template>
  <div class="game-detail-view">
    <div class="detail-glass" v-if="game">
      <div class="game-header">
        <img :src="game.cover" :alt="game.title" class="game-cover" />
        <div class="info">
          <h1>{{ game.title }}</h1>
          <div class="platforms">
            <span v-for="platform in game.platforms" :key="platform" class="platform">
              {{ platform }}
            </span>
          </div>
          <div class="progress-wrap">
            <label>Progress: {{ game.progress }}%</label>
            <progress :value="game.progress" max="100"></progress>
          </div>
          <div class="actions">
            <button v-if="!isInBacklog" @click="addToBacklog">Add to Backlog</button>
            <button v-else class="remove" @click="removeFromBacklog">Remove from Backlog</button>
          </div>
        </div>
      </div>

      <div class="details-section">
        <div class="card">
          <h2>Details</h2>
          <p><strong>Genre:</strong> {{ game.genre || 'N/A' }}</p>
          <p><strong>Release Date:</strong> {{ game.releaseDate || 'N/A' }}</p>
          <p><strong>Play Time:</strong> {{ game.playTime || 'N/A' }} hours</p>
        </div>

        <div class="card">
          <h2>Notes <span v-if="saving" style="font-size: 0.9rem; color: #ccc;">(saving...)</span>
          <span v-if="saved" style="font-size: 0.9rem; color: lightgreen;">(saved ✓)</span></h2>
          <textarea v-model="game.notes" placeholder="Write your thoughts..."></textarea>
        </div>

        <div class="card">
          <h2>Achievements</h2>
          <div class="achievements">
            <div
              v-for="(ach, idx) in game.achievements || []"
              :key="idx"
              class="badge"
              :class="{ unlocked: ach.unlocked }"
            >
              <h3>{{ ach.name }}</h3>
              <p>{{ ach.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading">Loading game details...</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGameStore } from '@/stores/game'

const route = useRoute()
const gameStore = useGameStore()
const game = ref(null)

const saving = ref(false)
const saved = ref(false)

onMounted(async () => {
  await gameStore.fetchGames()
  await gameStore.fetchBacklog()
  game.value = gameStore.games.find(g => g.id === route.params.id)
})

const isInBacklog = computed(() =>
  gameStore.backlog.some(item => item.gameId === game.value?.id)
)

const addToBacklog = () => {
  if (game.value) gameStore.addToBacklog(game.value.id)
}

const removeFromBacklog = () => {
  const backlogEntry = gameStore.backlog.find(item => item.gameId === game.value?.id)
  if (backlogEntry) gameStore.removeFromBacklog(backlogEntry.id)
}

// AUTO SAVE NOTES
let timeout = null

const saveNotesDebounced = () => {
  clearTimeout(timeout)
  saving.value = true
  saved.value = false

  timeout = setTimeout(() => {
    if (game.value?.id) {
      fetch(`http://localhost:3000/games/${game.value.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: game.value.notes })
      })
        .then(() => {
          saving.value = false
          saved.value = true
          setTimeout(() => (saved.value = false), 1500)
        })
        .catch(err => {
          saving.value = false
          console.error('Gagal auto-save catatan:', err)
        })
    }
  }, 800)
}

watch(
  () => game.value?.notes,
  (newVal, oldVal) => {
    if (newVal !== oldVal) saveNotesDebounced()
  }
)
</script>

<style scoped>
.game-detail-view {
  background: url('@/assets/max.png') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  padding: 3rem;
  color: #e0f7fa;
}

.detail-glass {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 0 30px #00ffe7;
}

.game-header {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.game-cover {
  width: 280px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 0 15px #00ffe7;
}

.info h1 {
  color: #00ffe7;
  margin-bottom: 1rem;
  text-shadow: 0 0 8px #00ffe7;
}

.platforms {
  margin-bottom: 1rem;
}

.platform {
  background: #00e0b5;
  color: #000;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  margin-right: 0.4rem;
  font-size: 0.85rem;
  box-shadow: 0 0 6px #00e0b5;
}

.progress-wrap {
  margin-bottom: 1rem;
}

progress {
  width: 100%;
  height: 10px;
  border-radius: 4px;
  background: #333;
  overflow: hidden;
}

progress::-webkit-progress-bar {
  background-color: #222;
}

progress::-webkit-progress-value {
  background-color: #00ffe7;
}

button {
  padding: 0.6rem 1.2rem;
  background: #00ffe7;
  color: #000;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 8px #00ffe7;
}

button.remove {
  background: #ff3d00;
  color: white;
  box-shadow: 0 0 8px #ff3d00;
}

.details-section {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 0 15px rgba(0, 255, 231, 0.2);
}

textarea {
  width: 100%;
  min-height: 100px;
  padding: 0.5rem;
  background: #111;
  border: 1px solid #00ffe7;
  color: #fff;
  border-radius: 6px;
}

.achievements {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.badge {
  padding: 1rem;
  border: 1px solid #00ffe7;
  border-radius: 6px;
  background: rgba(0, 255, 231, 0.05);
  color: #00ffe7;
  transition: 0.3s;
}

.badge.unlocked {
  background: rgba(0, 255, 231, 0.15);
  border-color: #00ffe7;
  box-shadow: 0 0 8px #00ffe7;
}

.loading {
  text-align: center;
  color: #bbb;
  margin-top: 3rem;
}
</style>
