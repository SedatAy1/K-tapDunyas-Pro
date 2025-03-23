<template>
  <div class="currency-breakdown">
    <h2>💱 Fiyat Dağılımı (Tüm Kurlar)</h2>
    <ul>
      <li v-for="(converted, currency) in totals" :key="currency">
        {{ currency }}: {{ converted.toFixed(2) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const books = computed(() => store.getters['books/getBooks'])
const exchangeRates = computed(() => store.getters['currency/exchangeRates'])

const totals = computed(() => {
  const totalTry = books.value.reduce((sum, b) => sum + Number(b.price), 0)
  const result = {}

  for (const [currency, rate] of Object.entries(exchangeRates.value)) {
    result[currency] = totalTry * rate
  }

  return result
})
</script>

<style scoped>
.currency-breakdown {
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  color: #1e1e2f;
  transition: all 0.3s ease;
  text-align: center;
}

/* Başlık */
.currency-breakdown h2 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #f9a826;
}

/* Liste */
.currency-breakdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.currency-breakdown li {
  font-weight: bold;
  font-size: 1rem;
  margin: 8px 0;
  background: rgba(255, 255, 255, 0.3);
  padding: 8px 12px;
  border-radius: 10px;
  color: #333;
  transition: background 0.3s ease;
}

/* Dark mode */
body.dark .currency-breakdown {
  background: rgba(30, 30, 50, 0.95);
  color: #f1f1f1;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
}

body.dark .currency-breakdown h2 {
  color: #f9d342;
}

body.dark .currency-breakdown li {
  background: rgba(255, 255, 255, 0.05);
  color: #f1f1f1;
}

/* Yumuşak geçişler */
*, *::before, *::after {
  transition: all 0.3s ease;
}
</style>
