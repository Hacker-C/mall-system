<template>
  <div class="discount-item">
    <img src="../../../assets/upload/seckill-item1.webp" alt="" />
    <p>惠普(HP)暗影精灵7 游戏本</p>
    <el-row class="row">
      <el-col :span="12" class="price1"> ￥4999.00 </el-col>
      <el-col :span="12" class="price2"> ￥5999.00 </el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.discount-item {
  padding: 10px;
}
.discount-item img {
  width: 100%;
}
.discount-item p {
  font-weight: lighter;
  font-size: 15px;
}
.price1 {
  background-color: #f02b2b;
}
.price1,
.price2 {
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  border: 1px solid #f02b2b;
}
.price1 {
  background-color: #f02b2b;
}
.price2 {
  color: #cccccc;
  text-decoration: line-through;
  border: 1px solid #f02b2b;
}
</style>