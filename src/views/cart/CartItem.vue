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
      <el-button size="small">删除</el-button>
      <el-button size="small">查看</el-button>
      <el-button size="small">购买</el-button>
    </el-col>
  </el-row>
</template>

<script>
import request from '../../utils/request'
export default {
  data() {
    return {
      num: 1
    }
  },
  methods: {
    handleChange(value) {
      request
        .patch('/cart/' + this.cartProduct.cartId, {
          count: value
        })
        .then((res) => {
          console.log('修改成功')
        })
        .catch((err) => {
          console.log(err)
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