<template>
  <el-col style="margin-top: 1px">
    <el-menu
      :default-active="path"
      router
      style="min-height: calc(100vh - 55px)"
    >
      <el-menu-item index="/shop/welcome">
        <i class="fas fa-fan" style="margin-left: 5px"></i>
        <span slot="title" style="margin-left: 12px">欢迎光临</span>
      </el-menu-item>
      <el-menu-item index="/shop/products">
        <i class="fas fa-pizza-slice" style="margin-left: 5px"></i>
        <span slot="title" style="margin-left: 12px">所有商品</span>
      </el-menu-item>
      <el-menu-item index="/shop/orders">
        <i class="fas fa-th-large" style="margin-left: 5px"></i>
        <span slot="title" style="margin-left: 12px">订单管理</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  data() {
    return {
      path: this.$route.path
    }
  }
}
</script>

<style scoped>
.el-submenu,
.el-menu-item {
  min-width: 149px !important;
}
</style>