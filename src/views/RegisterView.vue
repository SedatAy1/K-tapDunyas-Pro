<template>
  <div class="register">
    <h1>{{ $t('register') }}</h1>
    <input v-model="name" type="text" :placeholder="$t('fullName')" />
    <input v-model="email" type="email" :placeholder="$t('email')" />
    <input v-model="password" type="password" :placeholder="$t('password')" />
    <button @click="register">{{ $t('register') }}</button>
    <p>
      {{ $t('alreadyHaveAccount') }}
      <router-link to="/login">{{ $t('login') }}</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref("")
const email = ref("")
const password = ref("")

const register = () => {
  alert(`${name.value} - ${$t('registerSuccess')}`)
  router.push('/login')
}
</script>

<style scoped>
.register {
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

.register h1 {
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

.register p {
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #444;
}

.register a {
  color: #f39c12;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.register a:hover {
  color: #d68910;
}

/* 🌙 Dark Mode */
body.dark .register {
  background: rgba(30, 30, 50, 0.95);
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

body.dark .register p {
  color: #bbb;
}

body.dark .register a {
  color: #f9d342;
}

body.dark .register a:hover {
  color: #fff176;
}
</style>
