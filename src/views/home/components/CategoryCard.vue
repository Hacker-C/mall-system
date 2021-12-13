<template>
  <a
    href="javascript:;"
    style="display: block; text-decoration: none"
    @click="getProductDetails"
  >
    <el-card class="card" title="点击可查看商品详情">
      <img :src="product.imgSrc" class="image" />
      <p style="text-align: center">{{ product.productName }}</p>
      <p class="desc">
        {{ product.productDesc }}
      </p>
      <span style="color: red; margin-left: 10%; font-size: 15px"
        >￥{{ product.productPrice }}</span
      >
      <div>
        <el-button size="small" @click="addToCart">加入购物车</el-button>
        <el-button size="small" @click="buy">购买</el-button>
      </div>
    </el-card>
  </a>
</template>

<script>
import request from '../../../utils/request'
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
                duration: 2000
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 2000
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
          duration: 2000
        })
      }
      // 阻止事件冒泡
      e.stopPropagation()
    },
    buy(e) {
      let pId = this.product.productId
      let uId = sessionStorage.getItem('userId')
      if (uId) {
      } else {
        this.$message({
          message: '请先登录！',
          type: 'warning',
          duration: 2000
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
  width: 200px;
  /* height: 220px; */
  transition: all 0.2s;
  margin-top: 10px;
  margin-left: 20px;
  padding-top: 0;
  padding-bottom: 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.card:hover {
  transform: scale(1.05);
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