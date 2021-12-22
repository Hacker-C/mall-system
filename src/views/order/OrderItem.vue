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
      isLogin: false,
      index2: 0
    }
  },
  props: {
    cOrders: {
      type: Array,
      default: []
    }
  },
  created() {
    // console.log(this.cOrders)
  },
  methods: {
    deleteItem(index) {
      this.cOrders.splice(index, 1)
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    handleChange(val) {
      // console.log(val)
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