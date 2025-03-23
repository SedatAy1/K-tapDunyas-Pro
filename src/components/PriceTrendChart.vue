<template>
  <div>
    <h3>Fiyat Trendleri</h3>
    <p v-if="trend.length === 0">Veri yok</p>
    <ul v-else>
      <li v-for="(item, index) in trend" :key="index">
        {{ item.currency }}: {{ (item.price * currentRate).toFixed(2) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

// Dummy fiyat trend verisi
const trend = [
  { currency: 'TRY', price: 100 },
  { currency: 'USD', price: 3.2 },
  { currency: 'EUR', price: 3 },
  { currency: 'GBP', price: 2.5 }
]

const store = useStore()

const selectedCurrency = computed(() => store.getters['currency/currentCurrency'])
const exchangeRates = computed(() => store.getters['currency/exchangeRates'] || {})

const currentRate = computed(() => {
  const rate = exchangeRates.value?.[selectedCurrency.value]
  return rate || 1 // default fallback
})
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 5px 0;
}
</style>