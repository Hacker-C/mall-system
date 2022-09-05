<template>
  <div>
    <div style="width: 80%; margin-left: 50%; transform: translate(-50%)">
      <!-- 首页轮播图 -->
      <Carousel />
      <!-- 商品分类 -->
      <Category />
      <!-- 限时折扣 -->
      <Discount />
      <EleModule />
      <BookModule />
    </div>
    <Footer />
  </div>
</template>

<script>
const Carousel = () => import('./components/Carousel.vue')
const Category = () => import('./components/category/Category.vue')
const Discount = () => import('./components/Discount.vue')
const EleModule = () => import('./components/ProductModule/EleModule.vue')
const BookModule = () => import('./components/ProductModule/BookModule.vue')
const Footer = () => import('@/components/Footer.vue')

export default {
  components: {
    Carousel,
    Category,
    Discount,
    EleModule,
    BookModule,
    Footer
  }
}
</script>

<style scoped>
</style>