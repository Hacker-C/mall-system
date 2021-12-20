<template>
  <div style="width: 80%; margin-left: 50%; transform: translate(-50%)">
    <h3 class="head">
      <i class="fas fa-cart-plus" style="color: #909399"></i> 我的购物车
    </h3>
    <div v-if="isLogin && cartProducts.length > 0">
      <el-row type="flex" class="header">
        <el-col class="nav" :span="1"> </el-col>
        <el-col class="nav" :span="4"> 商品图片 </el-col>
        <el-col class="nav" :span="4"> 商品名称 </el-col>
        <el-col class="nav" :span="3">单价</el-col>
        <el-col class="nav" :span="4">数量</el-col>
        <el-col class="nav" :span="4">总计</el-col>
        <el-col class="nav" :span="4">操作</el-col>
      </el-row>
      <CartItem
        v-for="(item, index) in cartProducts"
        :key="index"
        :cartProduct="item"
        @reload="reloadCount"
        @reload2="reloadItem"
      />
      <el-row type="flex" justify="end" class="total-bd">
        <el-col :span="2" class="totalCount">共：{{ total }} 件</el-col>
        <el-col class="total" :span="4">
          合计：￥{{ money.toFixed(2) }} 元</el-col
        >
        <el-col class="discount" :span="3">
          优惠减：￥{{ discountAmount }}
        </el-col>
      </el-row>
      <el-row type="flex" justify="end" style="margin-bottom: 20px">
        <el-button
          type="primary"
          round
          style="width: 10%; margin-top: 10px"
          @click="toCheckout"
          >去结算</el-button
        >
      </el-row>
    </div>
    <div
      v-else-if="cartProducts.length == 0 && isLogin == true"
      style="color: #909399"
    >
      您还没有添加任何商品到购物车，先去逛逛吧~
    </div>
    <div v-else style="color: #909399">请先登录（注册后登录即可成为会员）</div>
  </div>
</template>

<script>
import request from '../../utils/request'
const CartItem = () => import('./CartItem.vue')

export default {
  data() {
    return {
      isLogin: false,
      cartProducts: [],
      totalCount: {},
      totalPrice: {},
      total: 0,
      money: 0,
      origin: 0
    }
  },
  created() {
    this.load()
    this.reloadCount()
  },
  methods: {
    toCheckout() {
      let obj = {
        total: this.total,
        money: this.money,
        cartProducts: this.cartProducts
      }
      this.load()
      sessionStorage.setItem('checkout', JSON.stringify(obj))
      this.$router.push('/checkout')
    },
    reloadCount(cId, pId, count, p, d) {
      this.totalCount[cId] = [count, p, d]
      this.total = 0
      this.cartProducts.forEach((p, i) => {
        if (p.productId == pId) {
          this.cartProducts[i].count = count
        }
      })
      this.money = 0
      this.origin = 0
      for (let v of Object.values(this.totalCount)) {
        if (v[0]) {
          this.total += v[0]
          this.money += v[1]
          this.origin += v[2]
        }
      }
    },
    reloadItem() {
      this.load()
    },
    load() {
      let userId = sessionStorage.getItem('userId')
      this.isLogin = userId ? true : false
      if (userId) {
        request
          .get('/cart/' + userId)
          .then((res) => {
            if (res.code == '0') {
              this.cartProducts = []
              res.data.forEach((e) => {
                this.cartProducts.push(e)
                // 计算总数
                this.totalCount[e.cartId] = [
                  e.count,
                  e.count * e.productPrice * e.discount,
                  e.count * e.productPrice
                ]
                // 计算总价格
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
          .then(() => {
            this.reloadCount()
          })
      }
    }
  },
  components: {
    CartItem
  },
  computed: {
    discountAmount() {
      return (this.origin - this.money).toFixed(2)
    }
  }
}
</script>

<style scoped>
.total,
.discount,
.totalCount {
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  font-size: 15px;
}
.total-bd {
  height: 50px;
  line-height: 50px;
}
.head {
  /* background-color: pink; */
  height: 50px;
  line-height: 60px;
  font-weight: 400;
  border-bottom: 1px dotted rgba(204, 204, 204, 0.5);
}
.header {
  height: 50px;
  line-height: 70px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
}
.nav {
  color: #828bb2;
}
</style>