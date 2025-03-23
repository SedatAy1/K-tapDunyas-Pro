<template>
  <div class="filter">
    <input
      v-model="localFilters.searchQuery"
      type="text"
      :placeholder="$t('filter.search')"
    />

    <select v-model="localFilters.selectedCategory">
      <option value="">{{ $t('filter.allCategories') }}</option>
      <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
    </select>

    <input
      v-model.number="localFilters.maxPrice"
      type="number"
      :placeholder="$t('filter.maxPrice')"
    />
  </div>
</template>

<script setup>
import { computed, watch, reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const books = computed(() => store.getters['books/getBooks'])

const categories = computed(() => [...new Set(books.value.map(b => b.category))])
const tags = computed(() => {
  const allTags = books.value.flatMap(b => b.tags || [])
  return [...new Set(allTags)]
})

const localFilters = reactive({
  searchQuery: '',
  selectedCategory: '',
  maxPrice: null,
  selectedTag: ''
})

watch(localFilters, () => {
  emit('update:filters', { ...localFilters })
})

const emit = defineEmits(['update:filters'])
</script>

<style scoped>
.filter {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin: 25px 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* Ortak input & select stilleri */
input,
select {
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  background: #f1f1f1;
  color: #1e1e2f;
  font-size: 0.95rem;
  min-width: 160px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

input:focus,
select:focus {
  outline: none;
  border: 1px solid #f9d342;
  box-shadow: 0 0 6px #f9d342;
}

::placeholder {
  color: #999;
}

/* 🌙 Dark Mode */
body.dark .filter {
  background: rgba(30, 30, 50, 0.9);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

body.dark input,
body.dark select {
  background: #2f2f44;
  color: #f1f1f1;
  border: 1px solid #444;
}

body.dark ::placeholder {
  color: #aaa;
}

/* Geçişler */
*, *::before, *::after {
  transition: all 0.3s ease;
}
</style>
