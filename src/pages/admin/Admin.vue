<template>
  <div style="width: 100%">
    <el-container>
      <el-header style="padding: 0; margin: 0; height: 50px">
        <Header />
      </el-header>
      <el-container>
        <el-aside width="150px">
          <Aside />
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
const Header = () => import('./components/Header.vue')
const Aside = () => import('./components/Aside.vue')
title: '欢迎'

export default {
  data() {
    return {}
  },
  components: {
    Header,
    Aside
  }
}
</script>

<style scoped>
.top-nav {
  height: 20px;
  line-height: 20px;
  margin-bottom: 10px;
}
</style>