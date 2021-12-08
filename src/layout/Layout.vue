<template>
  <div>
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
const Header = () => import('../components/Header.vue')

export default {
  components: {
    Header
  }
}
</script>

<style>
</style>