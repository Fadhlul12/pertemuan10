<template>
  <router-link :to="`/games/${game.id}`" class="game-card">
    <div class="cover-wrapper">
      <img
        v-if="game.cover"
        :src="game.cover"
        alt="Game Cover"
        class="game-cover"
        @error="handleImageError"
      />
      <div v-else class="fallback-cover">
        {{ game.title.charAt(0).toUpperCase() }}
      </div>
    </div>

    <h3>{{ game.title }}</h3>

    <div class="progress-bar">
      <div class="progress" :style="{ width: game.progress + '%' }"></div>
    </div>
    <p class="progress-text">{{ game.progress }}%</p>

    <div class="platforms">
      <span v-for="platform in game.platforms" :key="platform">{{ platform }}</span>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  game: {
    type: Object,
    required: true
  }
})

const handleImageError = () => {
  props.game.cover = null
}
</script>

<style scoped>
.game-card {
  display: block;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 255, 231, 0.2);
  border-radius: 16px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 255, 231, 0.15);
  transition: transform 0.3s ease;
  color: inherit;
  text-decoration: none;
}

.game-card:hover {
  transform: scale(1.03);
  box-shadow: 0 0 20px rgba(0, 255, 231, 0.3);
}

.cover-wrapper {
  width: 100%;
  height: 180px;
  margin-bottom: 1rem;
  overflow: hidden;
  border-radius: 10px;
  background-color: #1e1e1e;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fallback-cover {
  width: 100%;
  height: 100%;
  background: #00ffe7;
  color: black;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-radius: 10px;
}

h3 {
  color: #00ffe7;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 6px #00ffe7;
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin: 0.5rem 0;
}

.progress {
  height: 100%;
  background: #00ffe7;
  box-shadow: 0 0 5px #00ffe7;
}

.progress-text {
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.platforms {
  margin-top: 0.5rem;
}

.platforms span {
  background: rgba(0, 255, 231, 0.15);
  color: #00ffe7;
  padding: 0.3rem 0.6rem;
  margin-right: 0.3rem;
  border-radius: 4px;
  font-size: 0.85rem;
  text-shadow: 0 0 4px #00ffe7;
}
</style>
