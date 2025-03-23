<template>
  <div class="book-card">
    <router-link :to="`/book/${book.id}`">
      <img :src="book.cover" :alt="book.title" />
    </router-link>

    <h3>{{ book.title }}</h3>
    <p>{{ $t('book.author') }}: {{ book.author }}</p>
    <p>{{ $t('book.category') }}: {{ book.category }}</p>
    <p>{{ $t('book.price') }}: {{ convertedPrice }} {{ selectedCurrency }}</p>

    <!-- Sepete Ekle Butonu -->
    <button class="cart-btn" @click="addToCart">🛒 {{ $t('bookDetail.addToCart') }}</button>

    <button @click="toggleFavorite" :class="{ favorite: isFavorited }">
      {{ isFavorited ? $t('book.removeFromFavorites') : $t('book.addToFavorites') }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { defineProps } from 'vue'

const props = defineProps({
  book: Object
})

const store = useStore()

const selectedCurrency = computed(() => store.getters['currency/currentCurrency'])
const exchangeRates = computed(() => store.getters['currency/exchangeRates'])

const currentRate = computed(() => {
  const rate = exchangeRates.value?.[selectedCurrency.value]
  return rate || 1
})

const convertedPrice = computed(() => {
  const price = Number(props.book.price)
  return (price * currentRate.value).toFixed(2)
})

const addToCart = () => {
  store.commit('cart/addToCart', props.book)
}

const isFavorited = computed(() => store.getters['favorites/isFavorite'](props.book.id))

const toggleFavorite = () => {
  if (isFavorited.value) {
    store.commit('favorites/removeFromFavorites', props.book.id)
  } else {
    store.commit('favorites/addToFavorites', props.book)
  }
}
</script>

<style scoped>
.book-card {
  width: 100%;
  max-width: 280px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 1.2rem;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: #1e1e2f;
}

.book-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.book-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.book-card img:hover {
  transform: scale(1.03);
}

.book-card h3 {
  margin-top: 1rem;
  font-size: 1.1rem;
  color: #f9a826;
}

.book-card p {
  font-size: 0.9rem;
  margin: 0.3rem 0;
  color: #444;
}

.cart-btn {
  margin-top: 20px;
  background: linear-gradient(to right, #42b883, #2ecc71);
  color: white;
  font-weight: bold;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cart-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

button {
  margin-top: 12px;
  padding: 10px 16px;
  background: linear-gradient(to right, #f9d342, #f39c12);
  color: #1e1e2f;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
}

button.favorite {
  background: linear-gradient(to right, #ff5252, #ff1744);
  color: #fff;
}

/* 🌙 Dark Mode */
body.dark .book-card {
  background: rgba(30, 30, 50, 0.9);
  color: #f1f1f1;
}

body.dark .book-card p {
  color: #ccc;
}

body.dark .book-card h3 {
  color: #f9d342;
}

body.dark button {
  background: linear-gradient(to right, #f9d342, #f39c12);
  color: #1e1e2f;
}

body.dark button.favorite {
  background: linear-gradient(to right, #ff5252, #ff1744);
  color: white;
}
</style>