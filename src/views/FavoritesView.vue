<template>
  <div class="favorites">
    <h1>{{ $t('favorites') }}</h1>

    <div v-if="favorites.length > 0" class="books-container">
      <BookCard v-for="book in favorites" :key="book.id" :book="book" />
    </div>

    <p v-else>{{ $t('noFavorites') }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import BookCard from '../components/BookCard.vue'

const store = useStore()
const favorites = computed(() => store.getters['favorites/getFavorites'])
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 60px auto;
  padding: 2rem 2.5rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  color: #1e1e2f;
  transition: all 0.3s ease;
}

.register h1 {
  font-size: 2.2rem;
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

input::placeholder {
  color: #999;
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

/* 🌙 Koyu Mod */
body.dark .register {
  background: rgba(30, 30, 50, 0.95);
  color: #f1f1f1;
}

body.dark input {
  background: #2f2f44;
  color: #f1f1f1;
  border: 1px solid #444;
}

body.dark input::placeholder {
  color: #aaa;
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

/* Genel geçiş efektleri */
*, *::before, *::after {
  transition: all 0.3s ease;
}
</style>
