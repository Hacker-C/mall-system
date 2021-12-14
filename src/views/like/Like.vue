<template>
  <div style="width: 80%; margin-left: 50%; transform: translate(-50%)">
    <h3 class="head">
      <i class="fas fa-star" style="color: #909399"></i> 我的收藏夹
    </h3>
    <div v-if="isLogin && likeProducts.length > 0">
      <el-row type="flex" class="header">
        <el-col class="nav" :span="1"> </el-col>
        <el-col class="nav" :span="4"> 商品图片 </el-col>
        <el-col class="nav" :span="3"> 商品名称 </el-col>
        <el-col class="nav" :span="4">单价</el-col>
        <el-col class="nav" :span="4">数量</el-col>
        <el-col class="nav" :span="4">总计</el-col>
        <el-col class="nav" :span="4">操作</el-col>
      </el-row>
      <!-- <div v-for="(item, index) in likeProducts" :key="index">
        <CartItem :cartProduct="item" @reload="load" />
      </div> -->
    </div>
    <div v-else-if="likeProducts.length == 0 && isLogin" style="color: #909399">
      您还没有添加任何商品到购物车，先去逛逛吧~
    </div>
    <div v-else style="color: #909399">请先登录（注册后登录即可成为会员）</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      likeProducts: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      let userId = sessionStorage.getItem('userId')
      this.isLogin = userId ? true : false
    }
  }
}
</script>

<style scoped>
.head {
  /* background-color: pink; */
  height: 50px;
  line-height: 60px;
  font-weight: 400;
  border-bottom: 1px dotted rgba(204, 204, 204, 0.5);
}
</style>