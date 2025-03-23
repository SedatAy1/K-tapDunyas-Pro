import { createStore } from 'vuex'
import theme from './modules/theme'
import books from './modules/books'
import favorites from './modules/favorites'
import user from './modules/user' 
import currency from './modules/currency'
import font from './font'

const store = createStore({
  modules: {
    books,
    favorites,
    user,
    theme,
    currency,
    font
  }
})

export default store