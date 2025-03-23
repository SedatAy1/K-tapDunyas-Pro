<template>
  <div id="app">
    <Navbar />
    
    <Suspense>
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <div class="loading">Yükleniyor...</div>
      </template>
    </Suspense>

    <div id="modals"></div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import { useStore } from 'vuex'


const store = useStore()

// 📌 Sayfa açıldığında temayı yükle
if (store.getters['theme/isDarkMode']) {
  document.body.classList.add('dark')
}
</script>
<style>
/* === Global Reset ve Tema Tabanı === */
html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: background 0.4s ease, color 0.4s ease;
}

/* 🌞 Açık Mod */
body {
  background: #f8f9fb;
  color: #1e1e2f;
  overflow-x: hidden;
}

/* 🌙 Koyu Mod */
body.dark {
  background: #1e1e2f;
  color: #f1f1f1;
}

/* Yükleniyor Fallback */
.loading {
  text-align: center;
  font-size: 1.2rem;
  padding: 2rem;
  color: inherit;
}
</style>
