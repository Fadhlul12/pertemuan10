<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Perpustakaan Digital</h1>
      <p class="subtitle">Masuk ke akun Anda</p>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <!-- Email Input -->
        <div class="input-group">
          <label for="email">Email</label>
          <div class="input-wrapper">
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Masukkan email Anda"
              required
            >
          </div>
        </div>
        
        <!-- Password Input -->
        <div class="input-group">
          <label for="password">Password</label>
          <div class="input-wrapper">
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Masukkan password Anda"
              required
            >
          </div>
        </div>
        
        <!-- Remember Me & Forgot Password -->
        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe">
            <span>Ingat saya</span>
          </label>
          <a href="#" class="forgot-password">Lupa password?</a>
        </div>
        
        <!-- Login Button -->
        <button type="submit" class="login-btn">Masuk</button>
        
        <!-- Social Login Divider -->
        <div class="divider">
          <span class="divider-line"></span>
          <span class="divider-text">Atau masuk dengan</span>
          <span class="divider-line"></span>
        </div>
        
        <!-- Social Login Buttons -->
        <div class="social-login">
          <button type="button" class="social-btn google">
            <img src="https://www.google.com/favicon.ico" alt="Google">
            Google
          </button>
          <button type="button" class="social-btn facebook">
            <img src="https://www.facebook.com/favicon.ico" alt="Facebook">
            Facebook
          </button>
        </div>
        
        <!-- Registration Link -->
        <p class="register-link">
          Belum punya akun? <a href="#">Daftar sekarang</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false
    }
  },
  methods: {
    handleLogin() {
      // Handle login logic
      console.log('Login attempted:', {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe
      });
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  padding: 40px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 24px;
}

.subtitle {
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 30px;
  font-size: 14px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-size: 14px;
  font-weight: 500;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s;
  box-sizing: border-box;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
  color: #2c3e50;
  cursor: pointer;
}

.remember-me input {
  margin-right: 8px;
}

.forgot-password {
  color: #3498db;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 20px;
}

.login-btn:hover {
  background-color: #2980b9;
}

.divider {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: #e0e0e0;
}

.divider-text {
  padding: 0 10px;
  color: #7f8c8d;
  font-size: 12px;
}

.social-login {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.social-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.social-btn img {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.social-btn.google:hover {
  border-color: #db4437;
  background-color: rgba(219, 68, 55, 0.05);
}

.social-btn.facebook:hover {
  border-color: #4267B2;
  background-color: rgba(66, 103, 178, 0.05);
}

.register-link {
  text-align: center;
  color: #7f8c8d;
  font-size: 14px;
}

.register-link a {
  color: #3498db;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }
  
  .social-login {
    flex-direction: column;
  }
  
  .social-btn {
    width: 100%;
  }
}

</style>