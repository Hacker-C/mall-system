<template>
  <div>
    <el-result icon="success" title="成功提示">
      <template slot="extra">
        <el-row class="tip"
          >您的订单已成功提交, <span class="time">{{ time }}</span
          >s 后将自动跳转到订单页面</el-row
        >
        <el-button type="info" size="medium" @click="cancel"
          >取消跳转</el-button
        >
        <el-button type="primary" size="medium" @click="backToCart"
          >返回购物车</el-button
        >
        <el-button type="success" size="medium" @click="toOrder"
          >直接跳转</el-button
        >
      </template>
    </el-result>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 5,
      timer: null
    }
  },
  created() {
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      if (this.time === 0) {
        clearInterval(this.timer)
        this.$router.push('/order')
      }
      this.time--
    }, 1000)
  },
  methods: {
    cancel() {
      clearInterval(this.timer)
    },
    backToCart() {
      this.$router.push('/cart')
    },
    toOrder() {
      this.$router.push('/order')
    }
  }
}
</script>

<style scoped>
.tip {
  color: #606266;
  margin-bottom: 15px;
}
.time {
  font-size: 18px;
  color: red;
}
</style>