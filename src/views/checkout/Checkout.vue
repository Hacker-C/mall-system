<template>
  <div style="width: 80%; margin-left: 50%; transform: translate(-50%)">
    <h3 class="header">订单结算页面</h3>
    <div class="sub-header">
      <h4><i class="fas fa-list-ul"></i> 商品列表</h4>
    </div>
    <div class="list-bd">
      <CheckoutItem v-for="i in 4" :key="i" />
    </div>
  </div>
</template>

<script>
import CheckoutItem from './CheckoutItem.vue'
export default {
  components: {
    CheckoutItem
  }
}
</script>

<style scoped>
.header {
  height: 50px;
  line-height: 60px;
  font-weight: 400;
  border-bottom: 1px dotted rgba(204, 204, 204, 0.5);
}
.sub-header {
  margin-top: 20px;
  display: flex;
}
h3,
h4 {
  font-weight: 400;
}
.list-bd {
  border-top: 1px solid rgba(204, 204, 204, 0.5);
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  margin-top: 10px;
}
.item {
  text-align: center;
}
</style>