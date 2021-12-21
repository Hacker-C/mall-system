<template>
  <div>
    <el-collapse
      v-model="activeNames"
      @change="handleChange"
      v-for="(order, index) in cOrders"
      :key="index"
    >
      <OrderSubItem :cOrder="order" :cIndex="index" @cDelete="deleteItem" />
    </el-collapse>
  </div>
</template>

<script>
import OrderSubItem from './OrderSubItem.vue'

export default {
  data() {
    return {
      activeName: 'first',
      activeNames: ['1'],
      isLogin: false
    }
  },
  props: {
    cOrders: {
      type: Array,
      default: []
    }
  },
  created() {},
  methods: {
    deleteItem(index) {
      this.cOrders.splice(index, 1)
    },
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
  components: {
    OrderSubItem
  }
}
</script>

<style scoped>
.detail-bd {
  background-color: #f5f9fa;
  margin: 20px;
}
</style>