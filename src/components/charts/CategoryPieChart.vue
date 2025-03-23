<template>
  <div>
    <h2>{{ $t('categoryDistribution') }}</h2>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const store = useStore()
const { t } = useI18n()
const books = computed(() => store.getters['books/getBooks'])

const categoryCounts = computed(() => {
  const counts = {}
  books.value.forEach(book => {
    counts[book.category] = (counts[book.category] || 0) + 1
  })
  return counts
})

const chartData = computed(() => ({
  labels: Object.keys(categoryCounts.value),
  datasets: [
    {
      label: t('bookCount'),
      data: Object.values(categoryCounts.value),
      backgroundColor: [
        '#42b883', '#ff6384', '#36a2eb', '#ffcd56', '#9966ff', '#ff9f40'
      ],
      borderWidth: 1
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    },
    title: {
      display: true,
      text: t('categoryPieChartTitle')
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