<template>
  <div class="profile-container">
    <h2>👤 My Profile</h2>

    <form @submit.prevent="handleSave">
      <label>Username</label>
      <input v-model="username" type="text" required />

      <label>Email</label>
      <input v-model="email" type="email" required />

      <label>Password</label>
      <input v-model="password" type="password" />

      <label>Avatar URL</label>
      <input v-model="avatar" type="url" placeholder="https://..." />

      <div class="preview" v-if="avatar">
        <img :src="avatar" alt="Preview" />
      </div>

      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const auth = useAuthStore()
const username = ref(auth.user?.username || '')
const email = ref(auth.user?.email || '')
const password = ref('')
const avatar = ref(auth.user?.avatar || '')

const handleSave = () => {
  auth.updateUser({
    username: username.value,
    email: email.value,
    password: password.value || auth.user.password,
    avatar: avatar.value,
  })
  alert('Profile updated!')
}
</script>

<style scoped>
.profile-container {
  max-width: 450px;
  margin: 3rem auto;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(0, 255, 231, 0.1);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0, 255, 231, 0.15);
  color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #00ffe7;
  text-shadow: 0 0 10px #00ffe7;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: 500;
  color: #00ffe7;
}

input {
  padding: 0.7rem;
  border: 1px solid #00ffe78c;
  border-radius: 8px;
  background: #111;
  color: #fff;
  font-size: 1rem;
  transition: 0.3s;
}

input:focus {
  border-color: #00ffe7;
  outline: none;
  box-shadow: 0 0 8px #00ffe7;
}

button {
  background: #00ffe7;
  color: #000;
  padding: 0.8rem;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #00c6a7;
  box-shadow: 0 0 12px #00ffe7;
}

.preview img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 1rem;
  box-shadow: 0 0 10px rgba(0, 255, 231, 0.25);
}
</style>
