export default {
  namespaced: true,
  state: () => ({
    darkMode: localStorage.getItem('darkMode') === 'true' // 📌 Tercih edilen tema kaydediliyor
  }),
  mutations: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
      localStorage.setItem('darkMode', state.darkMode)
    }
  },
  getters: {
    isDarkMode: (state) => state.darkMode
  }
}