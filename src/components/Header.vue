<template>
  <el-row type="flex" class="line">
    <el-col :span="4">
      <a href="/">
        <img
          src="../assets/upload/logo.svg"
          alt=""
          style="height: 40px; width: 40px; margin-left: 7px; margin-top: 7px"
        />
      </a>
      <h3
        style="
          padding-left: 10px;
          display: inline-block;
          color: #409eff;
          position: absolute;
          bottom: 20px;
          font-size: 15px;
        "
      >
        在线商城
      </h3>
    </el-col>
    <el-col flex="1">
      <el-menu
        :default-active="path"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router
      >
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/product_list">所有商品</el-menu-item>
        <el-col :span="10" style="text-align: center">
          <el-input
            v-model="search"
            placeholder="请输入搜索内容"
            suffix-icon="el-icon-search"
            style="width: 200px; margin-top: 10px"
          ></el-input>
          <el-button style="margin-left: 5px">搜索</el-button>
        </el-col>
        <el-menu-item
          index="/like"
          class="el-menu-right"
          :offset="2"
          style="line-height: 38px"
        >
          <el-badge :value="12" class="item" type="primary" v-if="false">
            收藏夹
          </el-badge>
          <div v-else class="item2">收藏夹</div>
        </el-menu-item>
        <el-menu-item
          index="/cart"
          class="el-menu-right"
          style="line-height: 38px"
        >
          <el-badge :value="0" class="item"> 购物车 </el-badge>
        </el-menu-item>
        <el-menu-item
          index="/order"
          class="el-menu-right"
          style="line-height: 38px"
        >
          <el-badge :value="8" class="item" style="height: 20px" v-if="false">
            我的订单
          </el-badge>
          <div v-else class="item2">我的订单</div>
        </el-menu-item>
        <el-menu-item index="/profile" class="el-menu-right">我的</el-menu-item>
        <el-submenu index="">
          <template slot="title">更多</template>
          <el-menu-item index="/about">关于本网站</el-menu-item>
          <el-menu-item index="/notice">网站公告</el-menu-item>
          <el-menu-item index="shopkeeper">
            <el-link>注册成为商家</el-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="3">
      <el-button
        style="height: 35px; line-height: 10px; margin-top: 10px"
        @click="toLogin"
        v-if="isLogin"
        >登录</el-button
      >
      <el-button
        style="height: 35px; line-height: 10px; margin-top: 10px"
        @click="logout"
        v-else
        >注销</el-button
      >
    </el-col>
    <el-col :span="3" style="padding-right: 0; padding-top: 18px">
      <el-dropdown style="width: 100%; padding: 0">
        <span class="el-dropdown-link">
          游客<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>
            <a href="javascript:;" @click="logout"> 退出 </a>
          </el-dropdown-item>
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
      path: this.$route.path,
      isLogin: false
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
    },
    toLogin() {
      this.$router.push('/login')
    },
    logout() {
      sessionStorage.clear()
      this.$router.push('/home')
      this.$message({
        message: '退出账号成功！',
        type: 'success',
        duration: 2000
      })
      this.$emit('logout')
    },
    // 强制刷新本组件
    reload() {
      this.$forceUpdate()
    }
  },
  created() {
    this.isLogin = sessionStorage.getItem('userId') ? false : true
  }
}
</script>

<style scoped>
.item {
  height: 20px;
}
.item2 {
  margin-top: 11px;
}
.line {
  border-bottom: 1px solid #ccc;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 12px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-menu-right {
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 12px;
}
.badge__content {
  position: absolute;
  left: 0;
}
</style>