<template>
  <el-col style="margin-top: 1px">
    <el-menu
      :default-active="path"
      router
      style="min-height: calc(100vh - 55px)"
    >
      <el-menu-item index="/admin/welcome">
        <i class="fas fa-fan" style="margin-left: 5px"></i>
        <span slot="title" style="margin-left: 12px">欢迎光临</span>
      </el-menu-item>
      <el-submenu index="users">
        <template slot="title">
          <i class="far fa-user" style="margin-left: 5px"></i>
          <span style="margin-left: 12px">用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/all_roles">
            <span slot="title">所有角色</span>
          </el-menu-item>
          <el-menu-item index="/admin/all_users"> 所有用户 </el-menu-item>
          <el-menu-item index="/admin/all_shops"> 商家管理 </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="system">
        <template slot="title">
          <i class="fas fa-tablet-alt" style="margin-left: 5px"></i>
          <span style="margin-left: 12px">系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/home_set">
            <span slot="title">首页管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/all_products">
            <span slot="title">所有商品</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="orders">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/orders">
            <span slot="title">所有订单</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
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