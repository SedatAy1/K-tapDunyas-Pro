<template>
  <div class="profile">
    <h1>{{ $t('profilePageTitle') }}</h1>
    <p>{{ $t('profilePageInfo') }}</p>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.profile {
  max-width: 700px;
  margin: 60px auto;
  padding: 2rem 2.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(14px);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  color: #1e1e2f;
  transition: all 0.3s ease;
  text-align: center;
}

.profile h1 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: #f9a826;
}

.profile p {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
}

/* 🌙 Dark Mode */
body.dark .profile {
  background: rgba(30, 30, 50, 0.95);
  color: #f1f1f1;
}

body.dark .profile p {
  color: #ccc;
}

body.dark .profile h1 {
  color: #f9d342;
}
</style>