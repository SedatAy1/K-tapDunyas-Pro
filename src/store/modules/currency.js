// src/store/modules/currency.js

export default {
  namespaced: true,
  state: () => ({
    selectedCurrency: 'TRY',
    exchangeRates: {
      TRY: 1,
      USD: 0.032,
      EUR: 0.03,
      GBP: 0.025
    }
  }),
  getters: {
    currentCurrency: (state) => state.selectedCurrency,
    exchangeRates: (state) => state.exchangeRates
  },
  mutations: {
    setSelectedCurrency(state, currency) {
      state.selectedCurrency = currency
    },
    setExchangeRates(state, rates) {
      state.exchangeRates = rates
    }
  },
  actions: {
    async fetchRates({ commit }) {
      try {
        // örnek sabit veri - istersen API'den çekebilirsin
        const rates = {
          TRY: 1,
          USD: 0.032,
          EUR: 0.03,
          GBP: 0.025
        }
        commit('setExchangeRates', rates)
      } catch (error) {
        console.error('Kur verileri alınamadı:', error)
      }
    }
  }
}