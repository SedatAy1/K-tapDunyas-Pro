<template>
  <BookCarousel />
  <div class="home">
    <h1>{{ $t('homePage.bookList') }}</h1>

    <div class="currency-select">
      <label for="currency">{{ $t('homePage.currency') }}</label>
      <select v-model="selectedCurrency">
        <option value="TRY">₺ TRY</option>
        <option value="USD">$ USD</option>
        <option value="EUR">€ EUR</option>
        <option value="GBP">£ GBP</option>
      </select>
    </div>

    <div class="export-import">
      <button @click="exportBooks">{{ $t('homePage.exportBooks') }}</button>
      <input type="file" accept=".json" @change="importBooks" />
    </div>

    <button @click="showModal = true" class="add-book-btn">{{ $t('homePage.addBook') }}</button>
    <BookFilter @update:filters="updateFilters" />

    <div class="books-container">
      <BookCard v-for="book in visibleBooks" :key="book.id" :book="book" />
    </div>

    <Teleport to="#modals">
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h2>{{ $t('homePage.addBook') }}</h2>

          <input v-model="newBook.title" v-uppercase v-focus type="text" :placeholder="$t('homePage.bookTitle')" />
          <p v-if="v$.title.$error" class="error-msg">{{ $t('homePage.validationTitle') }}</p>

          <input v-model="newBook.author" v-uppercase type="text" :placeholder="$t('homePage.bookAuthor')" />
          <p v-if="v$.author.$error" class="error-msg">{{ $t('homePage.validationAuthor') }}</p>

          <input v-model="newBook.category" v-uppercase type="text" :placeholder="$t('homePage.bookCategory')" />
          <p v-if="v$.category.$error" class="error-msg">{{ $t('homePage.validationCategory') }}</p>

          <input v-model="newBook.price" type="number" :placeholder="$t('homePage.bookPrice')" />
          <p v-if="v$.price.$error" class="error-msg">{{ $t('homePage.validationPrice') }}</p>

          <input type="file" accept="image/*" @change="handleImageUpload" />
          <p v-if="v$.cover.$error" class="error-msg">{{ $t('homePage.validationCover') }}</p>

          <input v-model="tagInput" type="text" :placeholder="$t('homePage.bookTagsPlaceholder')" />

          <button @click="addBook">{{ $t('homePage.submit') }}</button>
          <button @click="showModal = false">{{ $t('homePage.cancel') }}</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required, minLength, numeric } from '@vuelidate/validators'
import BookCard from '../components/BookCard.vue'
import BookFilter from '../components/BookFilter.vue'
import { saveBook, getAllBooks } from '@/utils/idb'
import { seedBooks } from '@/utils/seedBooks'
import BookCarousel from '../components/BookCarousel.vue'

const store = useStore()

onMounted(() => {
  if (store.getters['books/getBooks'].length === 0) {
    const books = seedBooks()
    books.forEach(book => store.commit('books/addBook', book))
  }
})

onMounted(async () => {
  const booksFromIndexedDB = await getAllBooks()
  if (booksFromIndexedDB.length) {
    booksFromIndexedDB.forEach(book => {
      store.commit('books/addBook', book)
    })
  }
})

const books = computed(() => store.getters['books/getBooks'])

const filters = ref({ searchQuery: '', selectedCategory: '', maxPrice: null, selectedTag: '' })
const updateFilters = (newFilters) => filters.value = newFilters

const filteredBooks = computed(() =>
  books.value.filter(book =>
    (!filters.value.searchQuery || book.title.toLowerCase().includes(filters.value.searchQuery.toLowerCase())) &&
    (!filters.value.selectedCategory || book.category === filters.value.selectedCategory) &&
    (!filters.value.maxPrice || book.price <= filters.value.maxPrice) &&
    (!filters.value.selectedTag || (book.tags || []).includes(filters.value.selectedTag))
  )
)

const displayLimit = ref(8)
const visibleBooks = computed(() => filteredBooks.value.slice(0, displayLimit.value))

const handleScroll = () => {
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 10) {
    displayLimit.value += 8
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  store.dispatch('currency/fetchRates')
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const showModal = ref(false)
const newBook = ref({ title: '', author: '', category: '', price: null, cover: '', tags: [] })
const tagInput = ref('')

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    newBook.value.cover = reader.result
  }
  reader.readAsDataURL(file)
}

const rules = {
  title: { required, minLength: minLength(2) },
  author: { required },
  category: { required },
  price: { required, numeric },
  cover: { required }
}
const v$ = useVuelidate(rules, newBook)

const addBook = () => {
  v$.value.$touch()
  if (v$.value.$invalid) {
    alert('Lütfen tüm alanları eksiksiz ve doğru doldurun.')
    return
  }

  const tags = tagInput.value
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0)

  const book = {
    id: Date.now(),
    ...newBook.value,
    tags
  }

  store.commit('books/addBook', book)
  saveBook(book)
  showModal.value = false
  alert('Kitap başarıyla eklendi!')
  newBook.value = { title: '', author: '', category: '', price: null, cover: '', tags: [] }
  tagInput.value = ''
  v$.value.$reset()
}

const exportBooks = () => {
  const dataStr = JSON.stringify(books.value, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'kitaplar.json'
  link.click()
  URL.revokeObjectURL(url)
}

const importBooks = (event) => {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    try {
      const importedBooks = JSON.parse(reader.result)
      if (Array.isArray(importedBooks)) {
        importedBooks.forEach(book => {
          store.commit('books/addBook', book)
        })
        alert('Kitaplar başarıyla içe aktanldı.')
      } else {
        alert('Geçersiz JSON dosyası!')
      }
    } catch {
      alert('Dosya okunurken hata oluştu.')
    }
  }
  reader.readAsText(file)
}

const selectedCurrency = computed({
  get: () => store.getters['currency/currentCurrency'],
  set: (val) => store.commit('currency/setSelectedCurrency', val)
})
</script>

<style scoped>
/* Ana düzen */
.home {
  padding: 2rem;
  background: linear-gradient(to right, #97a8b8, #2a2a40);
  color: #f1f1f1;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Başlık */
.home h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #f9d342;
  text-shadow: 1px 1px 5px rgba(0,0,0,0.3);
}

/* Para birimi seçimi */
.currency-select {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.currency-select label {
  font-weight: bold;
  font-size: 1rem;
  color: #f9d342;
}

.currency-select select {
  background: #2f2f44;
  color: #f1f1f1;
  padding: 0.5rem 1rem;
  border: 1px solid #444;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.currency-select select:focus {
  outline: none;
  border-color: #f9d342;
  box-shadow: 0 0 5px #f9d342;
}

/* Export / Import */
.export-import {
  margin: 20px auto;
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.export-import button {
  background: #444a6d;
  color: #f1f1f1;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.export-import button:hover {
  background: #5a618f;
}

.export-import input[type="file"] {
  background: #2f2f44;
  color: #f1f1f1;
  padding: 0.4rem;
  border-radius: 6px;
  cursor: pointer;
}

/* Kitaplar */
.books-container {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
  margin-top: 30px;
}

.book-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow: hidden;
  width: 220px;
  padding: 1rem;
  text-align: center;
  color: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5);
}

.book-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 0.8rem;
}

.book-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #f9d342;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
}

.book-card p {
  font-size: 0.9rem;
  color: #cccccc;
  margin: 0;
}

/* Kitap ekleme butonu */
.add-book-btn {
  background: linear-gradient(to right, #f9d342, #e0a800);
  color: #1e1e2f;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.add-book-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.3);
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 15, 25, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.4s ease;
  z-index: 9999;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: #2a2a3c;
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 0 20px rgba(0,0,0,0.6);
  animation: slideUp 0.4s ease;
  color: #f1f1f1;
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-content h2 {
  color: #f9d342;
  margin-bottom: 1rem;
}

.modal input {
  width: 100%;
  padding: 0.7rem;
  margin-bottom: 10px;
  background: #1e1e2f;
  border: 1px solid #444;
  border-radius: 6px;
  color: #f1f1f1;
  transition: border-color 0.3s ease;
}

.modal input:focus {
  outline: none;
  border-color: #f9d342;
  box-shadow: 0 0 5px #f9d342;
}

.modal-content button {
  padding: 0.7rem 1.2rem;
  margin-top: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.modal-content button:first-of-type {
  background: #4caf50;
  color: white;
}

.modal-content button:first-of-type:hover {
  background: #45a049;
}

.modal-content button:last-of-type {
  background: #e74c3c;
  color: white;
}

.modal-content button:last-of-type:hover {
  background: #c0392b;
}

/* Hata mesajları */
.error-msg {
  color: #ff7675;
  font-size: 0.85rem;
  text-align: left;
  margin-bottom: 10px;
}
</style>
