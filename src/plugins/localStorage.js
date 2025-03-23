// src/plugins/localStorage.js
export default {
  install(app) {
    app.config.globalProperties.$storage = {
      set(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
      },
      get(key, defaultValue = null) {
        const val = localStorage.getItem(key)
        try {
          return val ? JSON.parse(val) : defaultValue
        } catch {
          return defaultValue
        }
      },
      remove(key) {
        localStorage.removeItem(key)
      },
      clear() {
        localStorage.clear()
      }
    }
  }
}