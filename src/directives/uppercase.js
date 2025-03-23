export default {
  mounted(el) {
    el.addEventListener('input', () => {
      el.value = el.value.toUpperCase()
      el.dispatchEvent(new Event('input')) // v-model'e yansıması için
    })
  }
}