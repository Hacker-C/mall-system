<template>
  <div style="width: 80%; margin-left: 50%; transform: translate(-50%)">
    <Carousel />
    <Hot />
  </div>
</template>

<script>
const Carousel = () => import('./components/Carousel.vue')
const Hot = () => import('./components/Category.vue')
export default {
  components: {
    Carousel,
    Hot
  }
}
</script>

<style>
</style>