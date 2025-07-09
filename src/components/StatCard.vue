<template>
  <div class="stat-card">
    <div class="icon">{{ icon }}</div>
    <div class="info">
      <h3>{{ title }}</h3>
      <p>{{ value }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: Number,
  icon: String
})
</script>

<style scoped>
.stat-card {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.info h3 {
  margin: 0;
  font-size: 1rem;
  color: #555;
}

.info p {
  font-size: 1.5rem;
  margin: 0;
  font-weight: bold;
  color: #333;
}
</style>
