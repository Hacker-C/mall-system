<template>
  <div class="item">
    <img :src="cImage.src" alt="" style="width: 100%" />
    <h3 style="text-align: center">{{ cImage.name }}</h3>
    <div class="block">
      <el-rate v-model="value"></el-rate>
    </div>
    <div
      style="
        text-align: center;
        margin: 10px;
        font-size: 14px;
        height: 20px;
        line-height: 20px;
      "
    >
      <span style="margin-right: 10px; color: #ccc">{{ cImage.time }}</span>
      <el-link>商品详情>>></el-link>
    </div>
    <el-row type="flex" style="width: 60%; margin-left: 30px">
      <el-col :span="12" style="text-align: center">
        <span class="price1">{{ price }}</span>
      </el-col>
      <el-col :span="12" style="text-align: center">
        <span class="price2">{{ price }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 3
    }
  },
  props: ['cImage'],
  methods: {},
  computed: {
    price() {
      return '￥' + this.cImage.price
    }
  },
  created() {
    console.log(props)
  }
}
</script>

<style scoped>
.item {
  height: 300px;
  width: 200px;
  margin-left: 20px;
}
.block {
  text-align: center;
}
.price1,
.price2 {
  font-size: 14px;
  font-weight: 700;
}
.price2 {
  color: #ff0943;
  text-decoration: line-through;
}
</style>