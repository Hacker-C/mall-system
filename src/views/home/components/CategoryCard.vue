<template>
  <a
    href="void:;"
    style="display: block; text-decoration: none"
    @click="getProductDetails"
  >
    <el-card class="card">
      <img :src="product.src" class="image" />
      <p style="margin-left: 10%">{{ product.name }}</p>
      <p class="desc">
        {{ product.desc }}
      </p>
      <span style="color: red; margin-left: 10%; font-size: 15px"
        >￥{{ product.price }}</span
      >
      <div>
        <el-button size="small">加入购物车</el-button>
        <el-button size="small">购买</el-button>
      </div>
    </el-card>
  </a>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default() {
        return {
          id: 1,
          name: '汉堡',
          src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          price: 19.9,
          desc: '现在可以特价购买'
        }
      }
    }
  }
}
</script>

<style scoped>
.image {
  margin-left: 50%;
  width: 65%;
  transform: translate(-50%);
  display: block;
}
.card {
  width: 200px;
  height: 220px;
  transition: all 0.2s;
  margin-top: 10px;
  margin-left: 20px;
  padding-top: 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.card:hover {
  transform: scale(1.05);
}

.desc {
  font-size: 10px;
  color: #333;
  margin-left: 10%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>