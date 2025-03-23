<template>
  <div class="dashboard">
    <h1>Sepet</h1>
    <div class="charts">
      <PaymentSimulator />
      <CategoryPieChart />
      <CurrencyBreakdown />
      
    </div>
  </div>
</template>

<script setup>
import CategoryPieChart from '../components/charts/CategoryPieChart.vue'
import CurrencyBreakdown from '../components/CurrencyBreakdown.vue'
import PaymentSimulator from '../components/PaymentSimulator.vue'
</script>

<style scoped>
.dashboard {
  max-width: 1300px;
  margin: 40px auto;
  padding: 2.5rem;
  text-align: center;
  background: rgba(77, 12, 12, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: #1e1e2f;
}

.dashboard h1 {
  font-size: 2.4rem;
  margin-bottom: 2rem;
  color: #f9a826;
}

/* Kart Alanı */
.charts {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  align-items: flex-start;
}

/* Her grafik bileşeni */
.charts > * {
  flex: 1 1 400px;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(14px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.charts > *:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

/* 🌙 Dark Mode */
body.dark .dashboard {
  background: rgba(30, 30, 50, 0.95);
  color: #f1f1f1;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

body.dark .dashboard h1 {
  color: #f9d342;
}

body.dark .charts > * {
  background: rgba(40, 40, 60, 0.9);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

/* Geçişler */
*, *::before, *::after {
  transition: all 0.3s ease;
}
</style>
