<template>
  <div class="dashboard-view">
    <div class="overlay"></div>

    <section class="dashboard-header">
      <h1>👋 Welcome back, Commander</h1>
      <p>Your gaming journey continues. Here’s your latest mission data:</p>
    </section>

    <div class="dashboard-grid">
      <div class="card stats">
        <h2>📊 Stats</h2>
        <ul>
          <li>Total Games: {{ totalGames }}</li>
          <li>Completed: {{ completedGames }}</li>
          <li>Backlog: {{ backlogCount }}</li>
        </ul>
      </div>

      <div class="card graph">
        <h2>📈 Weekly Progress</h2>
        <canvas ref="chartCanvas" height="180"></canvas>
      </div>

      <div class="card recent">
        <h2>🕹️ Recently Played</h2>
        <div v-if="recentGame">
          <img :src="recentGame.cover" alt="cover" class="recent-cover" />
          <p><strong>{{ recentGame.title }}</strong></p>
          <p>Progress: {{ recentGame.progress }}%</p>
        </div>
        <div v-else>
          <p>No recent game found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useGameStore } from '@/stores/game'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const chartCanvas = ref(null)
const gameStore = useGameStore()

onMounted(() => {
  gameStore.fetchGames()
  gameStore.fetchBacklog()
  renderChart()
})

const totalGames = computed(() => gameStore.games.length)
const completedGames = computed(() =>
  gameStore.games.filter(g => g.progress >= 100).length
)
const backlogCount = computed(() => gameStore.backlog.length)

const recentGame = computed(() => {
  return gameStore.games.length > 0
    ? gameStore.games[gameStore.games.length - 1]
    : null
})

function renderChart() {
  if (!chartCanvas.value) return

  const ctx = chartCanvas.value.getContext('2d')
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Gameplay Hours',
        data: [1, 2, 1.5, 2.5, 3, 0.5, 2],
        backgroundColor: 'rgba(0, 255, 231, 0.2)',
        borderColor: '#00ffe7',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#00ffe7' },
          grid: { color: '#333' }
        },
        x: {
          ticks: { color: '#00ffe7' },
          grid: { color: '#333' }
        }
      },
      plugins: {
        legend: { labels: { color: '#00ffe7' } }
      }
    }
  })
}
</script>

<style scoped>
.dashboard-view {
  background: url('@/assets/max.png') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  padding: 3rem;
  color: #e0f7fa;
  position: relative;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 0;
}

.dashboard-view > * {
  position: relative;
  z-index: 1;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  color: #00ffe7;
  text-shadow: 0 0 10px #00ffe7;
  font-size: 2.5rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.card {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 255, 231, 0.2);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 255, 231, 0.15);
}

.stats ul {
  list-style: none;
  padding: 0;
}

.stats li {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.recent-cover {
  width: 100%;
  max-height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.card.stats h2 {
  color: #39ff14; /* Neon Green */
  text-shadow: 0 0 8px #39ff14;
}

.card.graph h2 {
  color: #ff4081; /* Cyber Pink */
  text-shadow: 0 0 8px #ff4081;
}

.card.recent h2 {
  color: #00ffe7; /* Neon Cyan */
  text-shadow: 0 0 8px #00ffe7;
}

</style>
