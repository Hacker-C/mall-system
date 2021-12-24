<template>
  <div class="layout">
    <Header :key="i" @reloadHeader="addKey" style="background-color: #fff" />
    <router-view></router-view>
    <el-backtop>
      <div class="backtop"><i class="fas fa-arrow-up"></i></div>
    </el-backtop>
  </div>
</template>

<script>
const Header = () => import('../components/Header.vue')

export default {
  components: {
    Header
  },
  data() {
    return {
      i: 0
    }
  },
  methods: {
    addKey() {
      this.i++
    }
  }
}
</script>

<style scoped>
.backtop {
  height: 100%;
  width: 100%;
  background-color: #f2f5f6;
  text-align: center;
  line-height: 40px;
  color: #1989fa;
}
.backtop:hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>