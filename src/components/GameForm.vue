<template>
  <div class="game-form">
    <h2>{{ game ? '✏️ Edit Game' : '🎮 Add New Game' }}</h2>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Title</label>
        <input id="title" v-model="form.title" type="text" required />
      </div>

      <div class="form-group">
        <label for="cover">Cover Image URL</label>
        <input id="cover" v-model="form.cover" type="url" placeholder="https://..." />
        <img v-if="form.cover" :src="form.cover" alt="Preview" class="preview-image" />
      </div>

      <div class="form-group">
        <label for="platforms">Platforms (comma separated)</label>
        <input id="platforms" v-model="form.platforms" type="text" placeholder="PC, Switch" />
      </div>

      <div class="form-group">
        <label for="progress">Progress (%)</label>
        <input id="progress" v-model="form.progress" type="number" min="0" max="100" />
      </div>

      <div class="form-actions">
        <button type="submit" class="save-btn">✅ Save</button>
        <button type="button" @click="$emit('cancel')" class="cancel-btn">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, watchEffect } from 'vue'

const props = defineProps({
  game: Object,
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  title: '',
  cover: '',
  platforms: '',
  progress: 0,
})

watchEffect(() => {
  if (props.game) {
    form.title = props.game.title
    form.cover = props.game.cover
    form.platforms = props.game.platforms?.join(', ') || ''
    form.progress = props.game.progress
  } else {
    form.title = ''
    form.cover = ''
    form.platforms = ''
    form.progress = 0
  }
})

const handleSubmit = () => {
  const payload = {
    title: form.title,
    cover: form.cover,
    platforms: form.platforms.split(',').map(p => p.trim()),
    progress: Number(form.progress),
  }
  emit('submit', payload)
}
</script>

<style scoped>
.game-form {
  background: #fff;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

h2 {
  margin-bottom: 1.2rem;
  color: #2e7d32;
  font-size: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 500;
  color: #333;
}

input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.preview-image {
  margin-top: 0.5rem;
  max-width: 100%;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
}

.save-btn {
  flex: 1;
  background-color: #4CAF50;
  color: white;
  padding: 0.6rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.cancel-btn {
  flex: 1;
  background-color: #ccc;
  color: black;
  padding: 0.6rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #388e3c;
}

.cancel-btn:hover {
  background-color: #b0b0b0;
}
</style>
