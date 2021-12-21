<template>
  <div class="container">
    <h3 class="head">
      <i class="fas fa-clipboard-list" style="color: #909399"></i> 我的订单
    </h3>
    <el-tabs
      class="eltabs"
      v-model="activeName"
      @tab-click="handleClick"
      v-if="orders.length"
    >
      <el-row type="flex" style="text-align: center">
        <el-col :span="3">序号</el-col>
        <el-col :span="5">订单编号</el-col>
        <el-col :span="4">下单时间</el-col>
        <el-col :span="4">应付款</el-col>
        <el-col :span="3">当前状态</el-col>
        <el-col :span="5">操作</el-col>
      </el-row>
      <el-tab-pane label="全部订单" name="first">
        <OrderItem :cOrders="orders" />
      </el-tab-pane>
      <el-tab-pane label="待付款" name="second">
        <!-- filter 过滤 -->
        <OrderItem :cOrders="orders.filter((o) => o.orderStatus === 0)" />
      </el-tab-pane>
      <el-tab-pane label="待收货" name="third">
        <OrderItem :cOrders="orders.filter((o) => o.orderStatus === 1)" />
      </el-tab-pane>
      <el-tab-pane label="已完成" name="fourth">
        <OrderItem :cOrders="orders.filter((o) => o.orderStatus === 3)" />
      </el-tab-pane>
      <el-tab-pane label="已取消" name="fifth">
        <OrderItem :cOrders="orders.filter((o) => o.orderStatus === 2)" />
      </el-tab-pane>
    </el-tabs>
    <!--  -->
    <div v-else-if="isLogin" style="color: #909399">暂时没有订单信息</div>
    <div v-else style="color: #909399">请先登录（注册后登录即可成为会员）</div>
  </div>
</template>

<script>
import request from '../../utils/request'
import OrderItem from './OrderItem.vue'

export default {
  data() {
    return {
      activeName: 'first',
      activeNames: ['1'],
      orders: [],
      isLogin: false,
      index1: 0
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    handleChange(val) {
      // console.log(val)
    },
    currentStatus(n) {
      if (n === 0) {
        return '待付款'
      }
      if (n === 1) {
        return '待收货'
      }
      if (n == 2) {
        return '已取消'
      }
      if (n == 3) {
        return '已完成'
      }
    }
  },
  created() {
    let uId = sessionStorage.getItem('userId')
    if (uId) {
      this.isLogin = true
    }
    if (uId) {
      request.get('/order/' + uId).then((res) => {
        if (res.code === '0') {
          this.orders = []
          res.data.forEach((e) => {
            this.orders.push(e)
          })
        }
      })
    }
  },
  components: {
    OrderItem
  }
}
</script>

<style scoped>
.container {
  width: 80%;
  margin-left: 50%;
  transform: translate(-50%);
}
.head {
  /* background-color: pink; */
  height: 50px;
  line-height: 60px;
  font-weight: 400;
  border-bottom: 1px dotted rgba(204, 204, 204, 0.7);
}
.detail-bd {
  background-color: #f5f9fa;
  margin: 20px;
}
</style>