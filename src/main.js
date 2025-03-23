import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Uppercase from './directives/uppercase'
import i18n from './i18n'
import Focus from './directives/focus'
import './style.css'
import localStoragePlugin from './plugins/localStorage'
import './style.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.directive('uppercase', Uppercase)
app.directive('focus', Focus)
app.use(i18n)
app.use(localStoragePlugin) 

app.mount('#app')
