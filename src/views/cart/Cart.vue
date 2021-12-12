<template>
  <div style="width: 80%; margin-left: 50%; transform: translate(-50%)">
    <div v-if="isLogin">
      <el-row type="flex" class="header">
        <el-col class="nav" :span="1"> </el-col>
        <el-col class="nav" :span="4"> 商品图片 </el-col>
        <el-col class="nav" :span="3"> 商品名称 </el-col>
        <el-col class="nav" :span="4">单价</el-col>
        <el-col class="nav" :span="4">数量</el-col>
        <el-col class="nav" :span="4">总计</el-col>
        <el-col class="nav" :span="4">操作</el-col>
      </el-row>
      <div v-for="(item, index) in likeProducts" :key="index">
        <CartItem :cLikeProduct="item" />
      </div>
    </div>
    <div v-else>请先登录</div>
  </div>
</template>

<script>
import request from '../../utils/request'
const CartItem = () => import('./CartItem.vue')

export default {
  data() {
    return {
      isLogin: false,
      likeProducts: []
    }
  },
  created() {
    let userId = sessionStorage.getItem('userId')
    this.isLogin = userId ? true : false
    request
      .get('/cart/' + userId)
      .then((res) => {
        this.likeProducts = []
        res.forEach((e) => {
          this.likeProducts.push(e)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  components: {
    CartItem
  }
}
</script>

<style scoped>
.header {
  height: 50px;
  line-height: 70px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
}
.nav {
  color: #828bb2;
}
</style>