import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import tr from './locales/tr.json'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'tr', // Kullanıcının seçtiği dili hatırla
  fallbackLocale: 'en',
  messages: {
    tr,
    en
  }
})

export default i18n