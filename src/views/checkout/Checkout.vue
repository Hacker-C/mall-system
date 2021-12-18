<template>
  <div
    style="
      width: 80%;
      margin-left: 50%;
      transform: translate(-50%);
      margin-bottom: 20px;
    "
  >
    <h3 class="header">
      <span class="header-span"> 订单结算页面 </span>
    </h3>
    <div class="sub-header">
      <h4><i class="fas fa-list-ul"></i> 商品列表</h4>
    </div>

    <el-row type="flex">
      <el-col :span="8" class="item-header">商品图片</el-col>
      <el-col :span="8" class="item-header">商品名称</el-col>
      <el-col :span="8" class="item-header">价格 x 数量</el-col>
    </el-row>
    <div class="list-bd">
      <CheckoutItem
        v-for="(product, index) in products"
        :key="index"
        :cProduct="product"
      />
    </div>
    <div class="info-bd">
      <el-row type="flex" justify="end">
        <el-col :span="4" class="bottom-item" style="color: #999">
          寄送至：{{ address }}
        </el-col>
        <el-col :span="4" class="bottom-item" style="color: #999">
          收件人：{{ realName }}
        </el-col>
        <el-col :span="10"></el-col>
        <el-col :span="3" class="bottom-item">共 {{ total }} 件</el-col>
        <el-col :span="5" class="bottom-item"
          >商品原总价：￥{{ originPrice }}
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="4" class="bottom-item bb"
          >已优惠： ￥{{ (originPrice - this.money).toFixed(2) }}
        </el-col>
        <el-col :span="5" class="bottom-item bb"
          >应付金额：
          <span class="m"> ￥{{ this.money.toFixed(2) }} </span>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="end" style="margin-top: 10px">
      <el-button type="info" @click="cancel">取消订单</el-button>
      <el-button type="success">提交订单</el-button>
    </el-row>
  </div>
</template>

<script>
import request from '../../utils/request'
import CheckoutItem from './CheckoutItem.vue'
export default {
  data() {
    return {
      products: [],
      total: 0,
      money: 0,
      address: '',
      realName: ''
    }
  },
  created() {
    let items = JSON.parse(sessionStorage.getItem('checkout'))
    this.products = items.cartProducts
    this.total = items.total
    this.money = items.money
    let uId = sessionStorage.getItem('userId')
    request.get('/user/' + uId).then((res) => {
      this.realName = res.data.realName
      this.address = res.data.address
    })
  },
  components: {
    CheckoutItem
  },
  computed: {
    originPrice() {
      return this.products
        .reduce((preV, curP) => preV + curP.productPrice * curP.count, 0)
        .toFixed(2)
    }
  },
  methods: {
    cancel() {
      sessionStorage.setItem('checkout', null)
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.header {
  height: 50px;
  line-height: 60px;
  font-weight: 400;
}
.header-span {
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
}
.sub-header {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
}
h3,
h4 {
  font-weight: 400;
}
.list-bd {
  border-top: 1px solid rgba(204, 204, 204, 0.5);
  margin-top: 10px;
  margin-bottom: 20px;
}
.item-header {
  text-align: center;
}
.bottom-item {
  /* border-bottom: 1px solid rgba(204, 204, 204, 0.5); */
  font-size: 15px;
}
.bb {
  height: 40px;
  line-height: 40px;
}
.m {
  font-size: 20px;
  color: #e4393c;
  font-weight: 700;
}
.info-bd {
  border-top: 1px solid rgba(204, 204, 204, 0.5);
  background-color: #f4f4f4;
  padding: 5px;
  padding-left: 20px;
}
</style>