export const state = () => ({
  counter: 0,
  locales: ['en', 'zh'],
  locale: 'en'
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}
