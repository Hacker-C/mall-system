<template>
  <div class="container">
    <SubHeader>
      <template v-slot> 欢迎光临！！！ </template>
    </SubHeader>
    <i> 这里是商家管理后台。 </i>
  </div>
</template>

<script>
const SubHeader = () => import('../../components/SubHeader.vue')
export default {
  components: {
    SubHeader
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-radius: 5px;
  /* background-color: #fff; */
}
i {
  color: #666;
}
</style>