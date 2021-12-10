<template>
  <div class="item">
    <img :src="cImage.imgSrc" alt="" style="height: 150px" />
    <h3 style="text-align: center">{{ cImage.productName }}</h3>
    <div class="block">
      <el-rate
        v-model="cImage.rate"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}"
      >
      </el-rate>
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
      <span style="margin-right: 10px; color: #ccc">{{
        cImage.createTime.slice(0, 10)
      }}</span>
      <el-link>商品详情>>></el-link>
    </div>
    <el-row type="flex" style="width: 60%; margin-left: 30px">
      <el-col :span="12" style="text-align: center">
        <span class="price1"
          >￥{{ (cImage.productPrice * cImage.discount).toFixed(2) }}</span
        >
      </el-col>
      <el-col :span="12" style="text-align: center">
        <span class="price2">￥{{ cImage.productPrice }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 4.5
    }
  },
  props: {
    cImage: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {},
  computed: {},
  created() {}
}
</script>

<style scoped>
.item {
  height: 280px;
  width: 200px;
  margin-left: 20px;
  margin-top: 10px;
  padding-top: 5px;
  text-align: center;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  transition: all 0.3s;
}
.item:hover {
  transform: scale(1.03);
}
.block {
  text-align: center;
}
.price1 {
  color: #ff0943;
  font-size: 16px;
}
.price1,
.price2 {
  font-weight: 700;
}
.price2 {
  font-size: 14px;
  text-decoration: line-through;
  color: #787a89;
}
</style>