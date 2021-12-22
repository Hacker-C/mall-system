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
              v-show="cOrder.orderStatus === 0"
              plain
              @click="payOut"
              >付 款</el-button
            >
            <el-popconfirm
              title="确定取消订单吗？"
              @confirm="cancelOrder"
              @cancel="cancel"
              v-show="isCancel"
              placement="top"
            >
              <el-button
                type="warning"
                size="mini"
                slot="reference"
                @click="deleteOut"
                style="margin-left: 8px"
                plain
                >取 消</el-button
              >
            </el-popconfirm>
            <el-popconfirm
              title="确定删除订单吗？"
              @confirm="confirm"
              @cancel="cancel"
              placement="top"
            >
              <el-button
                style="margin-left: 8px"
                size="mini"
                slot="reference"
                type="danger"
                @click="deleteOut"
                >删 除</el-button
              >
            </el-popconfirm>
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
          <a
            href="javascript:;"
            style="diaplay: block"
            @click="toDetail(item.productId)"
            title="查看商品详情"
          >
            <el-image
              style="height: 100px; margin-top: 10px"
              :src="item.imgSrc"
            >
            </el-image>
          </a>
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

    <!-- 弹出框确认支付 -->
    <el-dialog
      title="请确认支付"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
    >
      <el-dialog
        width="30%"
        title="警告"
        :visible.sync="innerVisible"
        append-to-body
      >
        账户余额不足，请充值！
        <div slot="footer" class="dialog-footer">
          <el-button type="success" size="mini" @click="toProfile"
            >前往充值</el-button
          >
          <el-button type="primary" size="mini" @click="innerConfirm"
            >确认</el-button
          >
        </div>
      </el-dialog>
      <p class="tip">请您在 23时45分03秒 内完成支付，否则订单会被自动取消</p>
      <el-form :model="form" class="form-bd">
        <el-form-item label="订单编号" :label-width="formLabelWidth" class="bt">
          <div class="item">{{ form.orderNumber }}</div>
        </el-form-item>
        <el-form-item label="应付金额" :label-width="formLabelWidth" class="bt">
          <div class="money-bd">
            <span class="payMoney">{{ form.payMoney }}</span>
            <span class="yuan"> 元</span>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" type="info"
          >取 消</el-button
        >
        <el-button type="success" @click="pay">确认支付</el-button>
      </div>
    </el-dialog>
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
      orderProducts: [],
      isCancel: this.cOrder.orderStatus < 2,
      dialogFormVisible: false,
      innerVisible: false,
      form: {
        userId: sessionStorage.getItem('userId'),
        payMoney: this.cOrder.orderAmount,
        orderNumber: this.cOrder.orderNumber
      },
      formLabelWidth: '120px',
      timer: null
    }
  },
  methods: {
    toDetail(pId) {
      // console.log(pId)
      this.$router.push({
        path: '/details',
        query: {
          id: pId
        }
      })
    },
    innerConfirm() {
      this.innerVisible = false
      this.dialogFormVisible = false
    },
    toProfile() {
      this.$router.push({
        path: '/profile',
        query: {
          from: 'order'
        }
      })
    },
    payOut(e) {
      e.stopPropagation()
      this.dialogFormVisible = true
    },
    pay() {
      request.post('/order/pay', this.form).then((res) => {
        if (res.code === '1') {
          this.innerVisible = true
        } else if (res.code === '0') {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.dialogFormVisible = false
            this.cOrder.orderStatus = 1
          }, 1000)
        }
      })
    },
    deleteOut(e) {
      e.stopPropagation()
    },
    cancelOrder() {
      let oNumber = this.cOrder.orderNumber
      request.patch('/order/cancel/' + oNumber).then((res) => {
        if (res.code === '0') {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
          this.isCancel = false
          this.cOrder.orderStatus = 2
        }
      })
    },
    confirm() {
      let oNumber = this.cOrder.orderNumber
      request.delete('/order/' + oNumber).then((res) => {
        if (res.code === '0') {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
          this.$emit('cDelete', this.cIndex)
        } else {
          this.$message.error('删除失败！请联系服务器管理员！')
        }
      })
    },
    cancel() {},
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
.money-bd {
  margin-top: 5px;
  height: 30px;
  line-height: 30px;
}
.payMoney {
  color: #e31613;
  font-size: 20px;
}
.yuan {
  position: relative;
  bottom: 2px;
}
.bt {
  margin-bottom: 0;
}
.item {
  font-size: 16px;
}
.tip {
  font-size: 14px;
  color: #666666;
  margin-bottom: 10px;
  padding-left: 20px;
}
.form-bd {
  border: 1px solid rgba(27, 31, 35, 0.15);
}
</style>