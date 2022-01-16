import Vue from 'vue'
Vue.prototype.$ls = {
  get(k) {
    const v = localStorage.getItem(k)
    try {
      return JSON.parse(v)
    } catch (e) {
      return v
    }
  },
  set(k, v) {
    if (typeof v === 'object')
      v = JSON.stringify(v)
    localStorage.setItem(k, v)
  }
}