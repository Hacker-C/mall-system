<template>
  <el-row type="flex" justify="center" class="item-box">
    <el-col :span="8" class="item">
      <div class="img-box">
        <img :src="cProduct.imgSrc" alt="" />
      </div>
    </el-col>
    <el-col :span="8" class="item">《{{ cProduct.productName }}》</el-col>
    <el-col :span="8" class="item"
      >￥{{ cProduct.productPrice }} x {{ cProduct.count }}</el-col
    >
  </el-row>
</template>

<script>
export default {
  props: {
    cProduct: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.item {
  text-align: center;
  line-height: 130px;
}
.item-box {
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
}
.img-box {
  height: 130px;
}
.img-box img {
  height: 100px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  margin-top: 15px;
}
</style>