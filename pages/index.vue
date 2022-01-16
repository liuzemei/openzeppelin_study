<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        study
      </h1>
      <h2 class="subtitle">
        My primo Nuxt.js project
      </h2>
      <h1>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h1>
      <nuxt-link to="/demo">demo</nuxt-link>
      <nuxt-link to="/about">about</nuxt-link>
      <Button>Default</Button>

      <Button
        type="primary"
        @click="clickGetTime"
      >获取时间</Button>
      <p>{{timeStamp}}</p>

    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo
  },
  data() {
    return {
      timeStamp: 0
    }
  },
  methods: {
    async clickGetTime() {
      console.log(this)
      const data = await this.$apis.getTimestamp()
      console.log(data)
    }
  },
  created() {
    console.log(this.$apis)
  }
}
</script>

<style lang="less" scoped>
</style>
