<template>
  <div>
    <h2>{{ $t('topReadBooks') }}</h2>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { t } = useI18n()
const store = useStore()
const books = computed(() => store.getters['books/getBooks'])

const topBooks = computed(() => {
  const sorted = [...books.value].sort((a, b) => (b.readCount || 0) - (a.readCount || 0))
  return sorted.slice(0, 5)
})

const chartData = computed(() => ({
  labels: topBooks.value.map(book => book.title),
  datasets: [
    {
      label: t('readCount'),
      data: topBooks.value.map(book => book.readCount || 0),
      backgroundColor: '#42b883'
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: t('top5BooksChartTitle')
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}))
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 10px;
}
</style>