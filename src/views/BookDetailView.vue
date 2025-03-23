<template>
  <div v-if="book" class="book-detail">
    <h1>{{ book.title }}</h1>
    <img :src="book.cover" :alt="book.title" />

    <p><strong>{{ $t('bookDetail.author') }}:</strong> {{ book.author }}</p>
    <p><strong>{{ $t('bookDetail.category') }}:</strong> {{ book.category }}</p>
    <p><strong>{{ $t('bookDetail.price') }}:</strong> {{ book.price }} {{ book.currency }}</p>
    <p><strong>{{ $t('bookDetail.views') }}:</strong> {{ book.viewCount || 0 }}</p>

    <!-- ⭐️ Puanlama Sistemi -->
    <div class="rating">
      <span
        v-for="star in 5"
        :key="star"
        class="star"
        :class="{ filled: star <= rating }"
        @click="setRating(star)"
      >★</span>
      <p v-if="averageRating">
        {{ $t('bookDetail.averageRating') }}: {{ averageRating.toFixed(1) }} ⭐️
      </p>
    </div>

    <button class="cart-btn" @click="addToCart">🛒 {{ $t('bookDetail.addToCart') }}</button>

    <!-- 🔗 Sosyal Medya Paylaşımı -->
    <div class="social-share">
      <span>{{ $t('bookDetail.shareBook') }}:</span>
      <button @click="shareFacebook">Facebook</button>
      <button @click="shareTwitter">Twitter</button>
      <button @click="shareWhatsApp">WhatsApp</button>
    </div>

    <h2>{{ $t('bookDetail.comments') }}</h2>
    <div class="comments">
      <p v-for="comment in comments" :key="comment.id">{{ comment.text }}</p>
    </div>

    <textarea
      v-model="newComment"
      :placeholder="$t('bookDetail.addCommentPlaceholder')"
    ></textarea>
    <button @click="addComment">{{ $t('bookDetail.submitComment') }}</button>
  </div>

  <p v-else>{{ $t('bookDetail.bookNotFound') }}</p>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()

const book = computed(() => store.getters['books/getBooks'].find(b => b.id == route.params.id))

onMounted(() => {
  if (book.value) {
    store.commit('books/incrementViewCount', book.value.id)
  }
})

const addToCart = () => {
  store.commit('cart/addToCart', book.value)
}

const newComment = ref("")
const comments = ref(JSON.parse(localStorage.getItem(`comments-${route.params.id}`)) || [])

const addComment = () => {
  if (newComment.value.trim() !== "") {
    comments.value.push({ id: Date.now(), text: newComment.value })
    localStorage.setItem(`comments-${route.params.id}`, JSON.stringify(comments.value))
    newComment.value = ""
  }
}

// ⭐️ Puanlama Sistemi
const ratingKey = `rating-${route.params.id}`
const rating = ref(Number(localStorage.getItem(ratingKey)) || 0)

const setRating = (star) => {
  rating.value = star
  localStorage.setItem(ratingKey, String(star))
}

const allRatings = ref(JSON.parse(localStorage.getItem('ratings') || '{}'))

watch(rating, () => {
  allRatings.value[route.params.id] = rating.value
  localStorage.setItem('ratings', JSON.stringify(allRatings.value))
})

const averageRating = computed(() => {
  const ratings = Object.values(allRatings.value).map(Number)
  const valid = ratings.filter(r => !isNaN(r))
  return valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : null
})

// 🔗 Sosyal Medya Paylaşım
const shareUrl = computed(() => window.location.href)

const shareFacebook = () => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}`, '_blank')
}

const shareTwitter = () => {
  const text = encodeURIComponent(`Check out this book: ${book.value.title}`)
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl.value)}`, '_blank')
}

const shareWhatsApp = () => {
  const text = encodeURIComponent(`Check out this book: ${book.value.title} - ${shareUrl.value}`)
  window.open(`https://wa.me/?text=${text}`, '_blank')
}
</script>

<style scoped>
.social-share {
  margin: 1.5rem 0;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.social-share span {
  font-weight: bold;
  color: #444;
}

.social-share button {
  background: linear-gradient(to right, #42b883, #2ecc71);
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.social-share button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.book-detail {
  max-width: 600px;
  margin: 60px auto;
  padding: 2rem 2.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(14px);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  color: #1e1e2f;
  transition: all 0.3s ease;
  text-align: center;
}

.book-detail h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #f9a826;
}

.book-detail img {
  width: 200px;
  border-radius: 12px;
  margin: 1rem 0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.book-detail p {
  font-size: 1rem;
  color: #333;
  margin: 0.5rem 0;
}

.book-detail strong {
  color: #444;
}

.rating {
  margin: 1.2rem 0;
}

.star {
  font-size: 1.5rem;
  color: #ccc;
  cursor: pointer;
  margin: 0 2px;
  transition: color 0.2s ease;
}

.star.filled {
  color: #f9d342;
}

h2 {
  margin-top: 2rem;
  font-size: 1.4rem;
  color: #f39c12;
}

.comments {
  margin: 1rem 0;
  text-align: left;
}

.comments p {
  background: rgba(255, 255, 255, 0.3);
  padding: 10px 14px;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  color: #2c2c2c;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.cart-btn {
  margin-top: 20px;
  background: linear-gradient(to right, #42b883, #2ecc71);
  color: white;
  font-weight: bold;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cart-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

textarea {
  width: 100%;
  height: 90px;
  padding: 12px;
  margin-top: 10px;
  border-radius: 10px;
  border: none;
  background: #f5f5f5;
  color: #1e1e2f;
  font-size: 1rem;
  resize: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

textarea:focus {
  outline: none;
  border: 1px solid #f9d342;
  box-shadow: 0 0 6px #f9d342;
}

button {
  margin-top: 10px;
  padding: 10px 16px;
  background: linear-gradient(to right, #f9d342, #f39c12);
  color: #1e1e2f;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

button:hover {
  filter: brightness(1.05);
  transform: translateY(-2px);
}

body.dark .book-detail {
  background: rgba(30, 30, 50, 0.95);
  color: #f1f1f1;
}

body.dark .book-detail p {
  color: #ccc;
}

body.dark .comments p {
  background: rgba(255, 255, 255, 0.05);
  color: #f1f1f1;
}

body.dark textarea {
  background: #2f2f44;
  color: #f1f1f1;
  border: 1px solid #444;
}

body.dark textarea::placeholder {
  color: #aaa;
}

*, *::before, *::after {
  transition: all 0.3s ease;
}
</style>
