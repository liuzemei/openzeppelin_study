<template>
  <div :class="$i18n.locale">
    <nuxt />
  </div>
</template>

<script>
export default {
  created() {
    this.$root = { ...this.$root, ...{ FE_VUE_ENV: process.env.NODE_ENV } }
  },
  mounted() {
    window._vm = this
  }
}
</script>


<style>
</style>
