<template>
  <div>
    <Header :key="i" @logout="addKey" />
    <router-view></router-view>
  </div>
</template>

<script>
const Header = () => import('../components/Header.vue')

export default {
  components: {
    Header
  },
  data() {
    return {
      i: 0
    }
  },
  methods: {
    addKey() {
      this.i++
    }
  }
}
</script>

<style>
</style>