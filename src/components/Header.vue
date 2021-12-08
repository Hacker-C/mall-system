<template>
  <el-row type="flex" class="line">
    <el-col :span="4">
      <h3 style="padding-left: 20px; padding-top: 15px">在线商城</h3>
    </el-col>
    <el-col flex="1" :push="0" style="">
      <el-menu
        :default-active="path"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router
      >
        <el-menu-item index="/home" style="padding: 0">首页</el-menu-item>
        <el-menu-item index="/category">商品分类</el-menu-item>
        <el-submenu index="">
          <template slot="title">更多</template>
          <el-menu-item index="/about">关于本网站</el-menu-item>
          <el-menu-item index="/notice">网站公告</el-menu-item>
        </el-submenu>
        <el-menu-item>
          <el-input
            v-model="search"
            style="width: 250px"
            placeholder="请输入搜索内容"
            suffix-icon="el-icon-search"
          ></el-input>
        </el-menu-item>

        <el-menu-item index="5"
          ><i class="el-icon-star-on"></i> 收藏夹</el-menu-item
        >
        <el-menu-item index="6"
          ><i class="el-icon-shopping-cart-1"></i> 购物车</el-menu-item
        >
        <el-menu-item index="7">订单</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="3" style="margin-top: 20px">
      <el-link>注册成为商家</el-link>
    </el-col>
    <el-col :span="3">
      <el-button
        type="primary"
        style="height: 35px; line-height: 10px; margin-top: 10px"
        >登录</el-button
      >
    </el-col>
    <el-col :span="3" style="padding-right: 0; padding-top: 18px">
      <el-dropdown style="width: 100%; padding: 0">
        <span class="el-dropdown-link">
          欢迎，请登录！<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      search: '',
      path: this.$route.path
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.line {
  border-bottom: 1px solid #ccc;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>