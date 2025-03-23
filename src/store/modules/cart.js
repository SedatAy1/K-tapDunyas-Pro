// store/modules/cart.js
export default {
  namespaced: true,
  state: () => ({
    items: []
  }),
  mutations: {
    addToCart(state, book) {
      const existing = state.items.find(i => i.id === book.id)
      if (existing) {
        existing.quantity++
      } else {
        state.items.push({ ...book, quantity: 1 })
      }
    },
    removeFromCart(state, id) {
      state.items = state.items.filter(b => b.id !== id)
    }
  },
  getters: {
    getCart: state => state.items
  }
}
