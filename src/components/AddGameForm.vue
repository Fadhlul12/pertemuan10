<template>
  <form @submit.prevent="handleSubmit" class="add-game-form">
    <h2>{{ editing ? 'Edit Game' : 'Add New Game' }}</h2>
    
    <div class="form-group">
      <label>Game Title</label>
      <input v-model="form.title" type="text" required>
    </div>
    
    <div class="form-group">
      <label>Platforms</label>
      <div class="platform-tags">
        <span 
          v-for="platform in form.platforms" 
          :key="platform" 
          class="platform-tag"
        >
          {{ platform }}
          <button 
            type="button" 
            @click="removePlatform(platform)"
            class="remove-platform"
          >×</button>
        </span>
        <input 
          v-model="platformInput" 
          type="text" 
          @keydown.enter.prevent="addPlatform"
          placeholder="Add platform"
        >
      </div>
    </div>
    
    <div class="form-row">
      <div class="form-group">
        <label>Progress (%)</label>
        <input v-model.number="form.progress" type="number" min="0" max="100">
      </div>
      
      <div class="form-group">
        <label>Last Played</label>
        <input v-model="form.lastPlayed" type="date">
      </div>
    </div>
    
    <div class="form-group">
      <label>Cover Image URL</label>
      <input v-model="form.coverImage" type="url" placeholder="https://example.com/image.jpg">
    </div>
    
    <div class="form-actions">
      <button type="button" @click="$emit('cancel')" class="cancel-btn">
        Cancel
      </button>
      <button type="submit" class="submit-btn">
        {{ editing ? 'Update' : 'Add' }} Game
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  game: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['submit', 'cancel'])

const editing = ref(false)
const platformInput = ref('')
const form = ref({
  title: '',
  platforms: [],
  progress: 0,
  lastPlayed: '',
  coverImage: ''
})

// Jika ada prop game, berarti mode edit
watch(() => props.game, (game) => {
  if (game) {
    editing.value = true
    form.value = {
      title: game.title,
      platforms: [...game.platforms],
      progress: game.progress,
      lastPlayed: game.lastPlayed || '',
      coverImage: game.coverImage || ''
    }
  } else {
    editing.value = false
    resetForm()
  }
}, { immediate: true })

const addPlatform = () => {
  if (platformInput.value.trim() && !form.value.platforms.includes(platformInput.value.trim())) {
    form.value.platforms.push(platformInput.value.trim())
    platformInput.value = ''
  }
}

const removePlatform = (platform) => {
  form.value.platforms = form.value.platforms.filter(p => p !== platform)
}

const resetForm = () => {
  form.value = {
    title: '',
    platforms: [],
    progress: 0,
    lastPlayed: '',
    coverImage: ''
  }
}

const handleSubmit = () => {
  emit('submit', {
    ...form.value,
    lastPlayed: form.value.lastPlayed || new Date().toISOString().split('T')[0]
  })
  if (!editing.value) {
    resetForm()
  }
}
</script>

<style scoped>
.add-game-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  max-width: 600px;
  margin: 0 auto;
}

.add-game-form h2 {
  margin-top: 0;
  color: #2E7D32;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="url"],
.form-group input[type="date"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1;
}

.platform-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.platform-tag {
  background: #e8f5e9;
  color: #2E7D32;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.remove-platform {
  background: none;
  border: none;
  color: #2E7D32;
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
  padding: 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.cancel-btn {
  background: #f5f5f5;
  color: #333;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background: #2E7D32;
}
</style>