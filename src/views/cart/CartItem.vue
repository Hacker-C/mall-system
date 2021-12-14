<template>
  <el-row type="flex" class="cart-item-bd">
    <el-col :span="5">
      <img :src="cartProduct.imgSrc" alt="" class="image" />
    </el-col>
    <el-col :span="3"> 《{{ cartProduct.productName }} 》</el-col>
    <el-col :span="3">￥{{ cartProduct.productPrice }}</el-col>
    <el-col :span="5">
      <el-input-number
        v-model="num"
        controls-position="right"
        style="width: 80%"
        @change="handleChange"
        :min="1"
        :max="999"
      ></el-input-number>
    </el-col>
    <el-col :span="3"
      >￥{{ (cartProduct.productPrice * this.num).toFixed(2) }}</el-col
    >
    <el-col :span="5">
      <el-popover placement="top" width="160" v-model="visible">
        <p>确定从收藏夹移出该商品吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false"
            >取消</el-button
          >
          <el-button type="primary" size="mini" @click="deleteCartItem"
            >确定</el-button
          >
        </div>
      </el-popover>
      <el-button size="small" @click="visible = true">删除</el-button>
      <el-button size="small" @click="toDetails">查看</el-button>
      <el-button size="small">购买</el-button>
    </el-col>
  </el-row>
</template>

<script>
import request from '../../utils/request'
export default {
  data() {
    return {
      num: 1,
      visible: false
    }
  },
  methods: {
    handleChange(value) {
      request
        .patch('/cart/' + this.cartProduct.cartId, {
          count: value
        })
        .then((res) => {
          // console.log('修改成功')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteCartItem() {
      this.visible = false
      let cId = this.cartProduct.cartId
      // console.log(this.cartProduct.cartId)
      request
        .delete('/cart/' + cId)
        .then((res) => {
          if (res.code == '0') {
            // 删除成功
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1000
            })
            this.$emit('reload')
          } else {
            this.$message.error('删除失败！服务器错误！')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    toDetails() {
      // 点击 CartItem 组件，通过路由传递商品id给Dtails组件，然后发起请求。
      this.$router.push({
        path: '/details',
        query: {
          id: this.cartProduct.productId
        }
      })
    }
  },
  props: {
    cartProduct: {
      type: Object
    }
  },
  created() {
    this.num = this.cartProduct.count
  }
}
</script>

<style scoped>
.cart-item-bd {
  padding: 10px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  height: 150px;
  line-height: 140px;
  /* line-height: 100%; */
}
.image {
  /* width: 70%; */
  height: 80%;
  margin: 5% 10%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
}
</style>