<template>
  <el-collapse-item :name="cIndex">
    <template slot="title">
      <div style="width: 100%">
        <el-row type="flex" style="text-align: center">
          <el-col :span="3">{{ cIndex + 1 }}</el-col>
          <el-col :span="5">{{ cOrder.orderNumber }}</el-col>
          <el-col :span="4">{{ cOrder.createTime }}</el-col>
          <el-col :span="4">{{ cOrder.orderAmount }}</el-col>
          <el-col :span="3">
            <el-tag
              size="mini"
              :type="
                cOrder.orderStatus === 0
                  ? 'danger'
                  : cOrder.orderStatus === 1
                  ? 'primary'
                  : cOrder.orderStatus === 2
                  ? 'info'
                  : 'success'
              "
            >
              {{ currentStatus(cOrder.orderStatus) }}
            </el-tag>
          </el-col>
          <el-col :span="5">
            <el-button
              type="success"
              size="mini"
              v-show="cOrder.orderStatus == 0"
              plain
              >付款</el-button
            >
            <el-button
              type="warning"
              size="mini"
              v-show="cOrder.orderStatus < 3"
              plain
              >取消</el-button
            >
            <el-button type="danger" size="mini">删除</el-button>
          </el-col>
        </el-row>
      </div>
    </template>
    <div class="detail-bd">
      <el-row
        type="flex"
        class="el-row-item"
        v-for="(item, index) in orderProducts"
        :key="index"
      >
        <el-col :span="6">
          <el-image
            style="height: 100px; margin-top: 10px"
            :src="item.imgSrc"
            :preview-src-list="[item.imgSrc]"
          >
          </el-image>
        </el-col>
        <el-col :span="6" style="line-height: 120px; font-size: 15px">{{
          item.productName
        }}</el-col>
        <el-col :span="6" style="line-height: 120px; font-size: 15px"
          >￥{{ item.productPrice }} x {{ item.count }}</el-col
        >
        <el-col :span="6" style="line-height: 120px; font-size: 15px"
          >￥{{ item.orderProductPrice }}</el-col
        >
      </el-row>
    </div>
  </el-collapse-item>
</template>

<script>
import request from '../../utils/request'
export default {
  props: {
    cOrder: {
      type: Object
    },
    cIndex: {
      type: Number
    }
  },
  data() {
    return {
      orderProducts: []
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleChange(val) {
      console.log(val)
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
    let oNumber = this.cOrder.orderNumber
    request.get('product/order/' + oNumber).then((res) => {
      if (res.code === '0') {
        this.orderProducts = []
        res.data.forEach((e) => {
          this.orderProducts.push(e)
        })
      }
    })
  }
}
</script>

<style scoped>
.detail-bd {
  background-color: #f5f9fa;
}
.el-row-item:nth-child(1) {
  border-top: 1px solid #ccc;
}
.el-row-item {
  height: 120px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
</style>