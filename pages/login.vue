<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Enter your email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
        <div class="form-footer">
          <button @click.prevent="handleForgotPassword" class="link-button">Forgot Password?</button>
          <button @click.prevent="handleRegister" class="link-button">Register</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      handleLogin() {
        // 處理登入邏輯
        console.log('Login with:', this.email, this.password);
      },
      handleForgotPassword() {
        // 處理忘記密碼邏輯
        console.log('Redirect to forgot password page');
      },
      handleRegister() {
        // 使用 Vue Router 進行頁面跳轉
        this.$router.push('/landlord_register');
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 0.75rem;
    background-color: #20e086;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 1rem;
  }
  
  button:hover {
    background-color: #20e086;
  }
  
  .form-footer {
    display: flex;
    justify-content: space-between;
  }
  
  .link-button {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
  }
  
  .link-button:hover {
    color: #0056b3;
  }
  </style>
  