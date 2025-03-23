<template>
  <div class="login">
    <h1>{{ $t('login') }}</h1>
    <input v-model="email" type="email" :placeholder="$t('email')" />
    <input v-model="password" type="password" :placeholder="$t('password')" />
    <button @click="login">{{ $t('login') }}</button>
    <p>{{ $t('noAccount') }} <router-link to="/register">{{ $t('register') }}</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const email = ref("")
const password = ref("")

const login = () => {
  if (email.value === "admin@mail.com" && password.value === "admin123") {
    const user = { name: "Admin Kullanıcı", email: email.value, role: "admin" }
    const token = "fake-admin-token" 
    store.commit('user/login', { user, token }) 
    router.push('/admin')
  } else if (email.value === "test@mail.com" && password.value === "123456") {
    const user = { name: "Test Kullanıcı", email: email.value, role: "user" }
    const token = "fake-user-token" 
    store.commit('user/login', { user, token })
    router.push('/') 
  } else {
    alert("Hatalı e-posta veya şifre!")
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 60px auto;
  padding: 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  color: #1e1e2f;
  transition: all 0.3s ease;
}

.login h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #f9a826;
}

input {
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 1rem;
  border: none;
  border-radius: 8px;
  background: #f1f1f1;
  color: #1e1e2f;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border: 1px solid #f9d342;
  box-shadow: 0 0 6px #f9d342;
}

button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(to right, #f9d342, #f39c12);
  color: #1e1e2f;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

button:hover {
  filter: brightness(1.05);
  transform: translateY(-2px);
}

.login p {
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #444;
}

.login a {
  color: #f39c12;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.login a:hover {
  color: #d68910;
}

/* 🌙 Koyu Mod */
body.dark .login {
  background: rgba(30, 30, 50, 0.9);
  color: #f1f1f1;
}

body.dark input {
  background: #2f2f44;
  color: #f1f1f1;
  border: 1px solid #444;
}

body.dark input:focus {
  border-color: #f9d342;
  box-shadow: 0 0 6px #f9d342;
}

body.dark button {
  background: linear-gradient(to right, #f9d342, #f39c12);
  color: #1e1e1e;
}

body.dark .login p {
  color: #bbb;
}

body.dark .login a {
  color: #f9d342;
}

body.dark .login a:hover {
  color: #fff176;
}
</style>
