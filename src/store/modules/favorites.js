export default {
  namespaced: true,
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('favorites')) || [] // localStorage'dan yükleme
  }),
  mutations: {
    addToFavorites(state, book) {
      const exists = state.favorites.some(fav => fav.id === book.id)
      if (!exists) {
        state.favorites.push(book)
        localStorage.setItem('favorites', JSON.stringify(state.favorites)) // localStorage'a kaydet
      }
    },
    removeFromFavorites(state, bookId) {
      state.favorites = state.favorites.filter(book => book.id !== bookId)
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    }
  },
  getters: {
    getFavorites: state => state.favorites,
    isFavorite: state => id => state.favorites.some(book => book.id === id)
  }
}