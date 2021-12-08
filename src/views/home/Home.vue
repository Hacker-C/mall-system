<template>
  <div style="width: 80%; margin-left: 50%; transform: translate(-50%)">
    <!-- 首页轮播图 -->
    <Carousel />
    <!-- 商品分类 -->
    <Category />
    <!-- 限时折扣 -->
    <Discount />
  </div>
</template>

<script>
const Carousel = () => import('./components/Carousel.vue')
const Category = () => import('./components/Category.vue')
const Discount = () => import('./components/Discount.vue')
export default {
  components: {
    Carousel,
    Category,
    Discount
  }
}
</script>

<style>
</style>