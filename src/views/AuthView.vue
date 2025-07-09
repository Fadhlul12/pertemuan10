<template>
  <div class="auth-container">
    <div class="auth-box">
      <img src="/cyberpunk-logo.png" class="logo" alt="GameTrack Logo" />

      <h2>{{ isLoginMode ? 'Login to GameTrack' : 'Register on GameTrack' }}</h2>

      <form @submit.prevent="handleSubmit">
        <input v-model="form.email" type="email" placeholder="Email" required />
        <input v-model="form.password" type="password" placeholder="Password" required />
        <input
          v-if="!isLoginMode"
          v-model="form.username"
          type="text"
          placeholder="Username"
          required
        />
        <button type="submit">{{ isLoginMode ? 'Login' : 'Register' }}</button>
      </form>

      <div class="social-login">
        <p>or continue with</p>
        <div class="icons">
          <button class="social google"><img src="/google-icon.png" /> Google</button>
          <button class="social steam"><img src="/steam-icon.png" /> Steam</button>
          <button class="social fb"><img src="/fb-icon.png" /> Facebook</button>
        </div>
      </div>

      <p class="toggle" @click="isLoginMode = !isLoginMode">
        {{ isLoginMode ? 'Need an account? Register' : 'Already have an account? Login' }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const isLoginMode = ref(true)
const form = ref({ email: '', password: '', username: '' })

const handleSubmit = async () => {
  try {
    if (isLoginMode.value) {
      await authStore.login(form.value)
    } else {
      await authStore.register(form.value)
    }
    router.push('/')
  } catch (e) {
    alert(e.message)
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 2rem;
}


.auth-box {
  background: rgba(0, 0, 0, 0.85);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 0 25px #00ffc8;
  width: 100%;
  max-width: 420px;
  text-align: center;
}

.logo {
  width: 80px;
  margin-bottom: 1rem;
}

h2 {
  margin-bottom: 1.5rem;
  color: #00ffc8;
}

form input {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  background: #1e1e2f;
  color: #fff;
}

form input::placeholder {
  color: #aaa;
}

form button {
  width: 100%;
  padding: 0.75rem;
  background: #00ffc8;
  border: none;
  color: #000;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}


form button:hover {
  background: #00e0b5;
}

.toggle {
  margin-top: 1rem;
  color: #bbb;
  cursor: pointer;
  text-decoration: underline;
}

.social-login {
  margin: 1.5rem 0;
}

.social-login p {
  margin-bottom: 0.5rem;
  color: #ccc;
}

.icons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem;
  width: 100%;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  border: none;
}

.social img {
  width: 18px;
  height: 18px;
}

.google {
  background: #fff;
  color: #000;
}

.steam {
  background: #171a21;
  color: #fff;
}

.fb {
  background: #1877f2;
  color: #fff;
}
</style>
