<template>
  <div class="item">
    <a href="javascript:;" @click="toDetails">
      <div class="imgbox">
        <img :src="likeProduct.imgSrc" alt="" />
        <div class="add" @click="addToCart">加入购物车</div>
        <div class="buy" @click="buy">直接购买</div>
        <div class="del" @click="deleteItem">
          <el-popover placement="top" width="160" v-model="visible">
            <p>确定从收藏夹移出该商品吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false"
                >取消</el-button
              >
              <el-button type="primary" size="mini" @click="visible = false"
                >确定</el-button
              >
            </div>
            <i
              slot="reference"
              class="fas fa-trash-alt"
              style="color: #fff"
            ></i>
          </el-popover>
        </div>
      </div>
    </a>

    <div style="background-color: #f4f4f5">
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
  data() {
    return {
      visible: false
    }
  },
  props: {
    likeProduct: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    toDetails() {
      this.$router.push({
        path: '/details',
        query: {
          id: this.likeProduct.productId
        }
      })
    },
    addToCart(e) {
      e.stopPropagation()
    },
    deleteItem(e) {
      e.stopPropagation()
    },
    buy() {
      e.stopPropagation()
    }
  }
}
</script>

<style scoped>
.item {
  height: 235px;
  width: 180px;
  margin-left: 10px;
  margin-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
}
.imgbox {
  height: 180px;
  width: 180px;
  position: relative;
  overflow: hidden;
  text-align: center;
}
.imgbox img {
  height: 120px;
  margin-top: 30px;
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