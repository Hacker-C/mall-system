<template>
  <el-row type="flex" class="cart-item-bd">
    <el-col :span="5">
      <img :src="cLikeProducts.src" alt="" class="image" />
    </el-col>
    <el-col :span="3"> 《{{ cLikeProducts.name }} 》</el-col>
    <el-col :span="6" class="desc"> {{ cLikeProducts.desc }} </el-col>
    <el-col :span="3">￥{{ cLikeProducts.price }}</el-col>
    <el-col :span="3">{{ cLikeProducts.counts }}</el-col>
    <el-col :span="2"
      >￥{{ (cLikeProducts.price * cLikeProducts.counts).toFixed(2) }}</el-col
    >
    <el-col :span="2">
      <el-button class="move-out">删除</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    cLikeProducts: {
      type: Object
    }
  },
  created() {}
}
</script>

<style scoped>
.cart-item-bd {
  padding: 10px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  line-height: 100%;
}
.image {
  width: 70%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
}
.desc {
  padding: 10px;
  line-height: 120%;
}
.move-out {
  margin-top: 100%;
}
</style>