import axios from 'axios'
import store from '../store'

const api = axios.create({
  baseURL: 'https://api.example.com', // İstersen buraya gerçek URL koyarsın
  timeout: 10000
})

// ✅ Request Interceptor – Her isteğe token ekle
api.interceptors.request.use(
  config => {
    const token = store.getters['user/token']
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// ❌ Response Interceptor – Hataları yakala
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      alert('Oturum süresi doldu. Lütfen tekrar giriş yapın.')
      store.commit('user/logout')
      window.location.href = '/login'
    } else if (error.response && error.response.status === 500) {
      alert('Sunucu hatası. Lütfen daha sonra tekrar deneyin.')
    } else {
      alert('Bir hata oluştu: ' + error.message)
    }
    return Promise.reject(error)
  }
)

export default api