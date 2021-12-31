<template>
  <div class="discount-item">
    <a href="javascript:;" @click="toDetail(cProduct.productId)">
      <img :src="cProduct.imgSrc" alt="" class="item-img" />
    </a>
    <p>{{ cProduct.productName }}</p>
    <div class="cp">
      <el-row class="row">
        <el-col :span="12" class="price1">
          ￥{{ cProduct.productPrice * cProduct.discount }}
        </el-col>
        <el-col :span="12" class="price2">
          ￥{{ cProduct.productPrice }}
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cProduct: {
      type: Object
    }
  },
  methods: {
    toDetail(pId) {
      this.$router.push({
        path: '/details',
        query: {
          id: pId
        }
      })
    }
  }
}
</script>

<style scoped>
.discount-item {
  padding: 10px;
  transition: all 0.3s;
}
.discount-item:hover img {
  transform: scale(1.05);
}
.discount-item img {
  width: 100%;
}
.discount-item p {
  font-weight: lighter;
  font-size: 15px;
  position: absolute;
  bottom: 40px;
  width: 15%;
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
.cp {
  position: absolute;
  width: 15%;
  bottom: 20px;
}
.item-img {
  height: 150px;
  width: 100px;
}
</style>