<template>
  <div class="chart-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip
} from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip)

const canvas = ref(null)

onMounted(() => {
  const ctx = canvas.value.getContext('2d')

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Game Progress (%)',
          data: [20, 30, 50, 60, 70, 85, 100],
          borderColor: '#00ffe7',
          backgroundColor: 'rgba(0, 255, 231, 0.2)',
          tension: 0.3,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#00ffe7' },
          grid: { color: 'rgba(255,255,255,0.1)' }
        },
        x: {
          ticks: { color: '#00ffe7' },
          grid: { display: false }
        }
      },
      plugins: {
        legend: { labels: { color: '#00ffe7' } },
        tooltip: { enabled: true }
      }
    }
  })
})
</script>

<style scoped>
.chart-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 0 12px #00ffe7;
}
</style>
