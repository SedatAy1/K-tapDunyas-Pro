const state = {
  size: 'medium' // small | medium | large
}

const getters = {
  fontSize: (state) => state.size
}

const mutations = {
  setFontSize(state, size) {
    state.size = size
    document.documentElement.style.setProperty('--font-size', fontSizeMap[size])
  }
}

const fontSizeMap = {
  small: '14px',
  medium: '16px',
  large: '18px'
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}