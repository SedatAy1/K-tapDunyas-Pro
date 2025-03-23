<template>
  <div class="carousel-wrapper">
    <h2>{{ $t('ui.popularBooks') }}</h2>
    <Carousel
      :itemsToShow="3"
      :wrapAround="true"
      :autoplay="3000"
      :pauseAutoplayOnHover="true"
      transition="500"
      class="carousel"
    >
      <Slide v-for="book in topBooks" :key="book.id">
        <!-- 🔗 Kitap detay sayfasına yönlendirme -->
        <router-link :to="`/book/${book.id}`" class="book-slide">
          <img :src="book.cover" :alt="book.title" />
          <div class="info">
            <h3>{{ book.title }}</h3>
            <p>{{ book.author }}</p>
          </div>
        </router-link>
      </Slide>
    </Carousel>
  </div>
</template>

<script setup>
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const books = computed(() => store.getters['books/getBooks'])
const topBooks = computed(() => books.value.slice(0, 6))
</script>

<style scoped>
.carousel-wrapper {
  margin-top: 0px;
  margin-bottom: -1px;
  padding: 3rem;
  background: linear-gradient(to right, #97a8b8, #2a2a40);
  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.1);
}

.carousel-wrapper h2 {
  text-align: center;
  font-size: 2.2rem;
  color: #f9d342;
  font-weight: 700;
  margin-bottom: 2.2rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.book-slide {
  display: block;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 0.8rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  margin: 0 10px; /* Kartlar arası boşluk ↓ */
  max-width: 240px;
}

.book-slide:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
}

.book-slide img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
}

.book-slide .info {
  margin-top: 0.8rem;
  text-align: center;
}

.book-slide .info h3 {
  font-size: 1rem;
  color: #f9d342;
  margin-bottom: 4px;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.book-slide .info p {
  color: #f0f0f0;
  font-size: 0.85rem;
  opacity: 0.85;
  margin: 0;
}
</style>