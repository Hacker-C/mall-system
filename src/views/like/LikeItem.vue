<template>
  <div class="item">
    <div class="imgbox">
      <img :src="likeProduct.imgSrc" alt="" />
      <div class="add">加入购物车</div>
      <div class="buy">直接购买</div>
      <div class="del">
        <i class="fas fa-trash-alt" style="color: #fff"></i>
      </div>
    </div>
    <div>
      <div class="p-name">{{ likeProduct.productName }}</div>
      <div class="p-time">
        收藏时间：<span>{{ likeProduct.likeTime }}</span>
      </div>
      <div class="p-price">
        <span class="price1">
          ￥{{ (likeProduct.productPrice * likeProduct.discount).toFixed(2) }}
        </span>
        <span v-if="likeProduct.discount < 1" class="price2"
          >￥{{ likeProduct.productPrice }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    likeProduct: {
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
  height: 240px;
  width: 180px;
  margin-left: 10px;
  margin-bottom: 10px;
  background-color: #f4f4f5;
}
.imgbox {
  height: 180px;
  width: 180px;
  background-color: lightblue;
  position: relative;
}
.imgbox img {
  height: 90%;
  margin-left: 19%;
  margin-top: 5%;
  transition: all 0.5s;
}
.add,
.buy,
.del {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  height: 25px;
  width: 80px;
  line-height: 25px;
  text-align: center;
  font-size: 13px;
  display: none;
  cursor: pointer;
}
.add {
  bottom: 0;
  left: 0;
}
.buy {
  right: 0;
  bottom: 0;
}
.del {
  top: 0;
  right: 0;
  width: 25px;
}
.imgbox:hover .add,
.imgbox:hover .buy,
.imgbox:hover .del {
  display: block;
}
.imgbox:hover img {
  transform: scale(1.1);
}

.p-name {
  font-weight: 400;
  text-align: center;
}
.p-time {
  font-size: 13px;
  padding-left: 10px;
}
.p-price {
  display: flex;
  justify-content: center;
}
.price1,
.price2 {
  font-weight: 700;
}
.price1 {
  color: #ff4400;
  font-size: 14px;
}
.price2 {
  color: #9c9c9c;
  font-size: 13px;
  text-decoration: line-through;
  margin-left: 5px;
}
</style>