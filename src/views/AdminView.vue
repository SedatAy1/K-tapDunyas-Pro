<template>
  <div class="admin">
    <h1>Admin Paneli</h1>

    <h2>Kitap Yönetimi</h2>
    <button @click="showModal = true" class="add-book-btn">Yeni Kitap Ekle</button>

    <div class="books-container">
      <div v-for="book in books" :key="book.id" class="book-card">
        <h3>{{ book.title }}</h3>
        <p>Yazar: {{ book.author }}</p>
        <p>Kategori: {{ book.category }}</p>
        <p>Fiyat: {{ book.price }} {{ book.currency }}</p>
        <button @click="deleteBook(book.id)">Sil</button>
      </div>
    </div>

    <!-- Kitap Ekleme Modalı -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Yeni Kitap Ekle</h2>
        <input v-model="newBook.title" type="text" placeholder="Kitap Adı" />
        <input v-model="newBook.author" type="text" placeholder="Yazar" />
        <input v-model="newBook.category" type="text" placeholder="Kategori" />
        <input v-model="newBook.price" type="number" placeholder="Fiyat" />
        <input v-model="newBook.cover" type="text" placeholder="Kapak Resmi URL" />
        <button @click="addBook">Ekle</button>
        <button @click="showModal = false">İptal</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const books = computed(() => store.getters['books/getBooks'])

const showModal = ref(false)
const newBook = ref({ title: '', author: '', category: '', price: null, cover: '' })

const addBook = () => {
  if (!newBook.value.title || !newBook.value.author || !newBook.value.category || !newBook.value.price) {
    alert("Lütfen tüm alanları doldurun!")
    return
  }

  const book = {
    id: Date.now(),
    ...newBook.value
  }

  store.commit('books/addBook', book)
  showModal.value = false
  newBook.value = { title: '', author: '', category: '', price: null, cover: '' }
}

const deleteBook = (id) => {
  store.commit('books/deleteBook', id)
}
</script>

<style scoped>
.admin {
  max-width: 1200px;
  margin: 50px auto;
  padding: 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(14px);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  color: #1e1e2f;
  transition: all 0.3s ease;
}

.admin h1 {
  font-size: 2.3rem;
  margin-bottom: 1.5rem;
  color: #f9a826;
}

.admin h2 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  color: #444;
}

/* Kitap kartları */
.books-container {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
  margin-top: 30px;
}

.book-card {
  width: 220px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 14px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: #1e1e2f;
}

.book-card h3 {
  color: #f9a826;
  margin-bottom: 0.5rem;
}

.book-card p {
  font-size: 0.9rem;
  margin: 0.2rem 0;
  color: #333;
}

.book-card button {
  margin-top: 0.8rem;
  background: linear-gradient(to right, #e74c3c, #c0392b);
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.book-card button:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
}

/* Ekle Butonu */
.add-book-btn {
  background: linear-gradient(to right, #f9d342, #f39c12);
  color: #1e1e1e;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.add-book-btn:hover {
  filter: brightness(1.05);
  transform: translateY(-2px);
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 15, 25, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
  color: #1e1e2f;
}

.modal-content h2 {
  color: #f9a826;
  margin-bottom: 1rem;
}

.modal input {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 1rem;
  border: none;
  border-radius: 8px;
  background: #f1f1f1;
  color: #1e1e2f;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.modal input:focus {
  outline: none;
  border: 1px solid #f9d342;
  box-shadow: 0 0 6px #f9d342;
}

.modal-content button {
  padding: 10px 14px;
  margin: 0.3rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-content button:first-of-type {
  background: linear-gradient(to right, #4caf50, #388e3c);
  color: white;
}

.modal-content button:first-of-type:hover {
  filter: brightness(1.1);
}

.modal-content button:last-of-type {
  background: #e74c3c;
  color: white;
}

.modal-content button:last-of-type:hover {
  background: #c0392b;
}

/* 🌙 Karanlık Mod */
body.dark .admin {
  background: rgba(30, 30, 50, 0.95);
  color: #f1f1f1;
}

body.dark .admin h2 {
  color: #ccc;
}

body.dark .book-card {
  background: rgba(40, 40, 60, 0.9);
  color: #f1f1f1;
}

body.dark .book-card p {
  color: #ccc;
}

body.dark .modal-content {
  background: rgba(40, 40, 60, 0.95);
  color: #f1f1f1;
}

body.dark .modal input {
  background: #2f2f44;
  color: #f1f1f1;
  border: 1px solid #444;
}

body.dark .modal input::placeholder {
  color: #aaa;
}

*, *::before, *::after {
  transition: all 0.3s ease;
}
</style>
