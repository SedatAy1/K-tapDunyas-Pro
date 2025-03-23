<template>
  <nav class="navbar">
    <router-link to="/">{{ $t('home.title') }}</router-link>
    <router-link to="/favorites">{{ $t('favorites') }}</router-link>
    <router-link v-if="isAdmin" to="/admin">{{ $t('dashboard.adminPanel') }}</router-link>
    <router-link v-if="!isAuthenticated" to="/login">{{ $t('auth.login') }}</router-link>
    <router-link v-if="!isAuthenticated" to="/register">{{ $t('auth.register') }}</router-link>
    <router-link v-if="isAuthenticated" to="/profile">{{ $t('profile.title') }}</router-link>
    <router-link to="/dashboard">{{ $t('dashboard.title') }}</router-link>
    <button v-if="isAuthenticated" @click="logout" class="logout-btn">{{ $t('auth.logout') }}</button>

    <button @click="toggleTheme" class="theme-toggle-btn">
        {{ isDarkMode ? $t("ui.darkMode") : $t("ui.lightMode") }}
    </button>

    <!-- 🌍 Dil Seçici -->
    <select v-model="currentLocale" @change="changeLocale">
      <option value="tr">TR</option>
      <option value="en">EN</option>
    </select>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

const store = useStore()
const { locale } = useI18n()

const isAuthenticated = computed(() => store.getters['user/isAuthenticated'])
const isAdmin = computed(() => store.getters['user/isAdmin'])
const isDarkMode = computed(() => store.getters['theme/isDarkMode'])

const logout = () => {
  store.commit('user/logout')
  window.location.reload()
}

const toggleTheme = () => {
  store.commit('theme/toggleDarkMode')
  const isDark = store.getters['theme/isDarkMode']
  if (isDark) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
}

// Locale Değişim Fonksiyonu
const currentLocale = computed({
  get: () => locale.value,
  set: (val) => locale.value = val
})

const changeLocale = () => {
  localStorage.setItem('lang', currentLocale.value) // Kaydet
  location.reload() // Sayfayı yenileyerek dil değişimini uygulayın
}
</script>

<style scoped>
/* === Navbar Genel Ayarlar === */
.navbar {
  position: fixed;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 14px 32px;
  font-weight: 600;
  border-radius: 20px;
  transition: all 0.3s ease;

  background: linear-gradient(145deg, #ffffff, #f3f3f3);
  color: #1e1e2f;
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

  border: 1px solid #e0e0e0;
  max-width: 800px;
  width: calc(100% - 40px); /* Mobilde taşmaması için */
}

/* === Linkler === */
.navbar a {
  color: #1e1e2f;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 8px;
  transition: background 0.3s ease, color 0.3s ease;
}

.navbar a:hover {
  background: rgba(249, 211, 66, 0.15);
  color: #d97706; /* amber-600 */
}


/* === Butonlar === */
button {
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  color: #fff;
}

.logout-btn {
  background: linear-gradient(to right, #e74c3c, #c0392b);
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
}

.logout-btn:hover {
  background: linear-gradient(to right, #ff6b6b, #d94444);
  filter: brightness(1.05);
}

.theme-toggle-btn {
  color: #1e1e2f; /* koyu metin rengi */
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.theme-toggle-btn:hover {
  background: linear-gradient(to right, #dddddd, #cccccc);
  color: #1e1e1e;
}

/* === Select Menüler === */
select {
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #ffffff;
  color: #2c2c2c;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

select:focus {
  outline: none;
  border-color: #f9d342;
  box-shadow: 0 0 5px #f9d342;
}

/* === Genel Geçişler === */
*, *::before, *::after {
  transition: all 0.3s ease;
}

button:hover, .book-card:hover {
  transform: translateY(-2px);
}

/* === 🌙 Koyu Mod === */
body.dark {
  background: #0a0a1c;
  color: #efefef;
}

body.dark .navbar {
  background: rgba(30, 30, 50, 0.95);
  border-bottom: 1px solid rgba(234, 221, 221, 0.1);
  color: #f1f1f1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

body.dark .navbar a {
  color: #f1f1f1;
}

body.dark .navbar a:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #f9d342;
}

body.dark .logout-btn {
  background: linear-gradient(to right, #b33939, #8e2d2d);
}

body.dark .theme-toggle-btn {
  background: linear-gradient(to right, #222, #333);
  color: #fff;
}

body.dark select {
  background: #c71919;
  color: #f1f1f1;
  border: 1px solid #444;
}
*, *::before, *::after {
  transition: all 0.3s ease;
}

</style>
