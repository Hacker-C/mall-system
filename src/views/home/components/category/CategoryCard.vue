<template>
  <el-card
    class="card"
    title="点击可查看商品详情"
    @click.native="getProductDetails"
  >
    <img :src="product.imgSrc" class="image" />
    <p style="text-align: center">{{ product.productName }}</p>
    <p class="desc">
      {{ product.productDesc }}
    </p>
    <span style="color: red; margin-left: 10%; font-size: 15px"
      >￥{{ product.productPrice }}</span
    >
  </el-card>
</template>

<script>
import request from '../../../../utils/request'
export default {
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    getProductDetails() {
      // 点击Card组件，通过路由传递商品id给Dtails组件，期间发起请求。
      this.$router.push({
        path: '/details',
        query: {
          id: this.product.productId
        }
      })
    },
    // 将商品加入到购物车
    addToCart(e) {
      let pId = this.product.productId
      let uId = sessionStorage.getItem('userId')
      if (uId) {
        request
          .post('/cart', {
            userId: uId,
            productId: pId
          })
          .then((res) => {
            if (res.code == '1') {
              this.$message({
                message: res.msg,
                type: 'warning',
                duration: 1000
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1000
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.$message({
          message: '请先登录！',
          type: 'warning',
          duration: 1000
        })
      }
      // 触发父组件 Layout的 logout，刷新Header组件
      this.$emit('reloadHeader')
      // 阻止事件冒泡
      e.stopPropagation()
    },
    addToLike(e) {
      let pId = this.product.productId
      let uId = sessionStorage.getItem('userId')
      if (uId) {
        request
          .post('/like', {
            productId: pId,
            userId: uId
          })
          .then((res) => {
            if (res.code == '1') {
              this.$message({
                message: res.msg,
                type: 'warning',
                duration: 1000
              })
              return
            }
            if (res.code == '0') {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1000
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.$message({
          message: '请先登录！',
          type: 'warning',
          duration: 1000
        })
      }
      e.stopPropagation()
    }
  }
}
</script>

<style scoped>
.image {
  margin-left: 50%;
  height: 120px;
  transform: translate(-50%);
  display: block;
}
.card {
  /* width: 20%; */
  height: 200px;
  transition: all 0.2s;
  padding-top: 0;
  padding-bottom: 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.04);
}

.desc {
  font-size: 10px;
  color: #333;
  margin-left: 10%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>