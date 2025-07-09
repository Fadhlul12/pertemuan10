<template>
  <div class="progress-bar">
    <div class="progress-label">{{ label }}</div>
    <div class="progress-track">
      <div 
        class="progress-fill" 
        :style="{ width: `${percentage}%`, backgroundColor: color }"
      ></div>
    </div>
    <div class="progress-value">{{ percentage }}%</div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true,
    validator: value => value >= 0 && value <= 100
  },
  label: {
    type: String,
    default: 'Progress'
  },
  color: {
    type: String,
    default: '#4CAF50'
  }
})

const percentage = computed(() => Math.round(props.value))
</script>

<style scoped>
.progress-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
}

.progress-label {
  min-width: 80px;
  font-size: 0.8rem;
  color: #666;
}

.progress-track {
  flex: 1;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.progress-value {
  min-width: 40px;
  text-align: right;
  font-size: 0.8rem;
  font-weight: bold;
}
</style>