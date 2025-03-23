<template>
  <div class="checkout-wrapper">
    <div class="cart">
      <h2>{{ $t('checkout.cartTitle') }}</h2>
      <div v-for="book in cartItems" :key="book.id" class="cart-item">
        <img :src="book.cover" alt="cover" />
        <div class="info">
          <h4>{{ book.title }}</h4>
          <p>₺ {{ (book.price * book.quantity).toFixed(2) }}</p>
          <p>{{ selectedCurrency }} {{ (book.price * currentRate * book.quantity).toFixed(2) }}</p>

          <div class="quantity-control">
            <button @click="decreaseQty(book)">−</button>
            <span>{{ book.quantity }}</span>
            <button @click="increaseQty(book)">+</button>
          </div>
          <button class="remove-btn" @click="removeFromCart(book.id)">{{ $t('checkout.remove') }}</button>
        </div>
      </div>
    </div>

    <div class="summary">
      <h2>{{ $t('checkout.summaryTitle') }}</h2>
      <p><strong>{{ $t('checkout.totalTry') }}:</strong> ₺{{ totalTry.toFixed(2) }}</p>
      <p><strong>{{ $t('checkout.totalCurrency', { currency: selectedCurrency }) }}:</strong> {{ totalConverted.toFixed(2) }}</p>
      <button @click="simulatePayment">{{ $t('checkout.pay') }}</button>
      <p v-if="paid" class="success-msg">{{ $t('checkout.success') }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useStore()

const removeFromCart = (id) => {
  store.commit('books/deleteBook', id)
}

const books = computed(() => store.getters['books/getBooks'])
const selectedCurrency = computed(() => store.getters['currency/currentCurrency'])
const exchangeRates = computed(() => store.getters['currency/exchangeRates'])

const currentRate = computed(() => exchangeRates.value[selectedCurrency.value] || 1)

const cartItems = computed(() =>
  books.value.map(book => ({
    ...book,
    quantity: book.quantity || 1
  }))
)

const increaseQty = (book) => {
  const found = books.value.find(b => b.id === book.id)
  if (found) found.quantity = (found.quantity || 1) + 1
}

const decreaseQty = (book) => {
  const found = books.value.find(b => b.id === book.id)
  if (found && found.quantity > 1) {
    found.quantity -= 1
  } else {
    store.commit('books/deleteBook', book.id)
  }
}

const totalTry = computed(() =>
  books.value.reduce((sum, book) => sum + Number(book.price) * (book.quantity || 1), 0)
)

const totalConverted = computed(() => totalTry.value * currentRate.value)

const paid = ref(false)
const simulatePayment = () => {
  paid.value = true
  setTimeout(() => (paid.value = false), 3000)
}
</script>
