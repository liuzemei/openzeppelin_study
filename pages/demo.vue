<template>
  <div class="container">
    <div>
      <h1 class="title">
        {{user_id}}
      </h1>
      <h2 class="subtitle">
        {{a}}
      </h2>
      <p>{{$t('header.register')}}</p>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('user')
export default {
  components: {
    Logo
  },
  fetch({ store }) {
    console.log(store.state)
    store.commit('increment')
    console.log(store.state)
  },
  data() {
    return {
      a: 10
    }
  },
  methods: {
    ...mapMutations(['updateUserID']),
    ...mapActions(['updateUserIDAction'])
  },
  computed: {
    ...mapState(['user_id'])
  },
  mounted() {
    console.log(this.$apis)
    console.log(process.env.NODE_ENV)
    console.log(process.env.VUE_APP_BASE_URL)
    setTimeout(() => {
      this.updateUserID('haha')
      setTimeout(() => {
        this.updateUserIDAction('haha1232')
      }, 1000)
    }, 1000)
  },
  created() {
  },
  async asyncData(ctx) {
    const { a } = await test()
    return { a }
  }
}

async function test() {
  return {
    a: 11
  }
}
</script>
