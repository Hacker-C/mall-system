<template>
  <div style="width: 80%; margin-left: 50%; transform: translate(-50%)">
    <Carousel />
    <Category />
    <Test />
  </div>
</template>

<script>
const Carousel = () => import('./components/Carousel.vue')
const Category = () => import('./components/Category.vue')
const Test = () => import('./Test.vue')
export default {
  components: {
    Carousel,
    Category,
    Test
  }
}
</script>

<style>
</style>