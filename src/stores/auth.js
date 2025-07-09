import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const isAuthenticated = ref(localStorage.getItem('loggedIn') === 'true')

  function updateUser({ username, email, password, avatar }) {
  const updatedUser = { username, email, password, avatar }
  user.value = updatedUser
  localStorage.setItem('user', JSON.stringify(updatedUser))
  localStorage.setItem('registeredUser', JSON.stringify(updatedUser))
}


  function login({ email, password }) {
    const stored = JSON.parse(localStorage.getItem('registeredUser'))
    if (!stored || stored.email !== email || stored.password !== password) {
      throw new Error('Email or password is incorrect')
    }
    user.value = stored
    isAuthenticated.value = true
    localStorage.setItem('user', JSON.stringify(stored))
    localStorage.setItem('loggedIn', 'true')
  }

  function register({ email, password, username }) {
    if (!email.includes('@') || password.length < 6) {
      throw new Error('Email harus valid dan kata sandi minimal 6 karakter')
    }
    const newUser = { email, password, username, avatar: '' }
    localStorage.setItem('registeredUser', JSON.stringify(newUser))
    login(newUser)
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user')
    localStorage.removeItem('loggedIn')
  }

  function updateUsername(newName) {
    if (user.value) {
      user.value.username = newName
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  function updateAvatar(newUrl) {
    if (user.value) {
      user.value.avatar = newUrl
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  function updateProfile(updatedUser) {
    if (user.value) {
      user.value.username = updatedUser.username
      user.value.email = updatedUser.email
      user.value.avatar = updatedUser.avatar
      if (updatedUser.password) {
        user.value.password = updatedUser.password
      }
      localStorage.setItem('user', JSON.stringify(user.value))
      localStorage.setItem('registeredUser', JSON.stringify(user.value))
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateUsername,
    updateAvatar,
    updateProfile,
    updateUser
  }
})
