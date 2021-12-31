<template>
  <div>
    <h3 class="header">热销产品</h3>
    <el-row type="flex" class="bd">
      <el-col :span="5" class="left-bd">
        <a href="javascript:;" style="display: block">
          <img
            class="left-img"
            src="../../../../assets/upload/leftP1.webp"
            alt=""
          />
        </a>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="18" class="right-bd">
        <div
          style="cursor: pointer"
          v-for="product in products"
          :key="product.productId"
          @click="toDetail(product.productId)"
        >
          <img class="item" :src="product.imgSrc" alt="" />
          <div class="items">
            <h4 class="name">{{ product.productName }}</h4>
            <p class="desc">{{ product.productDesc }}</p>
            <div class="price">{{ product.productPrice }}元起</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    a() {},
    toDetail(pId) {
      this.$router.push({
        path: '/details',
        query: {
          id: pId
        }
      })
    }
  },
  data() {
    return {
      products: [
        {
          productId: 20,
          productName: '美的空调',
          productPrice: 2700,
          productDesc: '变频冷暖壁挂式空调',
          imgSrc:
            'http://119.23.46.102:9090/files/07f711c3df204da7a93d25712369aec5'
        },
        {
          productId: 17,
          productName: '小米电视',
          productPrice: 2199,
          productDesc: '4K高清HDR蓝牙语音遥控',
          imgSrc:
            'http://119.23.46.102:9090/files/4fa856f37b86466d9f57bc781bef4d99'
        },
        {
          productId: 16,
          productName: '家用榨汁机',
          productPrice: 129,
          productDesc: '榨汁机家用多功能料理机',
          imgSrc:
            'http://119.23.46.102:9090/files/a5e278c8a27844728ae73fa501d3a2ec'
        },
        {
          productId: 24,
          productName: '999感冒灵',
          productPrice: 30,
          productDesc: '三九999感冒灵颗粒9袋',
          imgSrc:
            'http://119.23.46.102:9090/files/b5e0e958a02947e8bc37ce1723e81ed0'
        },
        {
          productId: 11,
          productName: 'HUAWEI P50',
          productPrice: 8888,
          productDesc: '创新双屏操作体验',
          imgSrc:
            'http://119.23.46.102:9090/files/541dac7c289f4cfcb4c72db17b339c49'
        },
        {
          productId: 25,
          productName: '三体全集',
          productPrice: 50,
          productDesc: '中国科幻基石丛书',
          imgSrc:
            'http://119.23.46.102:9090/files/b814af27129a4bee9a9bfa8f33da01cd'
        },
        {
          productId: 26,
          productName: '水壶',
          productPrice: 97,
          productDesc: '1800W大功率开水壶双层',
          imgSrc:
            'http://119.23.46.102:9090/files/049dcd04a9534528a7643b9361caf0bd'
        },
        // 23
        {
          productId: 23,
          productName: '洗手液',
          productPrice: 97,
          productDesc: '健康抑菌洗手液滋润',
          imgSrc:
            'http://119.23.46.102:9090/files/9b7d6561772d4c5988cee14b1681c496'
        }
      ]
    }
  }
}
</script>

<style scoped>
.header {
  font-weight: 400;
  height: 60px;
  line-height: 80px;
}
.left-bd {
  height: 500px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  transition: all 0.4s;
  overflow: hidden;
}
.left-bd:hover {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transform: translateY(-3px);
}

.left-img {
  width: 100%;
}
/*
.right-bd {
  height: 500px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(2, 25%);
}
*/
.right-bd {
  height: 500px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}
.right-bd > div {
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  transition: all 0.4s;
  position: relative;
}
.right-bd > div:hover {
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  transform: translateY(-3px);
}
.item {
  width: 80%;
  height: 150px;
  position: absolute;
  top: 10px;
}
.name,
.desc,
.price {
  /* position: absolute; */
}
.price {
  /* bottom: 8px; */
  color: #ff6700;
  font-weight: 100;
}
.desc {
  /* bottom: 30px; */
  color: #b0b0b0;
  font-size: 14px;
}
.name {
  font-weight: 100;
  /* bottom: 50px; */
}
.items {
  position: absolute;
  bottom: 10px;
}
</style>