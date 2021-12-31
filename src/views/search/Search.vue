<template>
  <div class="container">
    <h3><i class="fas fa-info-circle" style="color: #909399"></i> 搜索结果</h3>
    <el-row class="search" type="flex">
      <el-input
        v-model="search"
        placeholder="请输入搜索内容"
        style="margin-top: 13px"
      ></el-input>
      <div>
        <el-button
          @click="searchBtn"
          icon="el-icon-search"
          class="btn"
          circle
        ></el-button>
      </div>
    </el-row>
    <div class="parent">
      <div
        v-for="(item, index) in products"
        :key="index"
        @click="toDetails(item.productId)"
      >
        <el-image :src="item.imgSrc" class="img"></el-image>
        <div class="name">{{ item.productName }}</div>
        <div class="price">￥{{ item.productPrice }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  data() {
    return {
      search: '',
      products: []
    }
  },
  mounted() {
    let key = this.$route.query.key
    this.search = key
    this.sendSearch(key)
  },
  methods: {
    sendSearch(key) {
      request
        .get('/product/search', {
          params: {
            key: key
          }
        })
        .then((res) => {
          this.products = res.data
        })
    },
    searchBtn() {
      this.sendSearch(this.search)
      this.$router.push({
        path: '/search',
        query: {
          key: this.search
        }
      })
    },
    toDetails(id) {
      // 点击 ProductItem 组件，通过路由传递商品id给Dtails组件，期间发起请求。
      this.$router.push({
        path: '/details',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 80%;
  margin-left: 50%;
  transform: translate(-50%);
}
.container h3 {
  height: 50px;
  line-height: 60px;
  font-weight: 400;
  border-bottom: 1px dotted rgba(204, 204, 204, 0.5);
}
.search {
  margin-left: 50%;
  transform: translate(-50%);
}
.btn {
  margin-top: 12px;
  margin-left: 10px;
}
.parent {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* grid-template-rows: repeat(5, 1fr); */
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  margin-top: 20px;
}
.parent > div {
  height: 220px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  text-align: center;
  cursor: pointer;
}
.img {
  height: 60%;
  margin-top: 15px;
}
.name {
  color: #666;
}
.price {
  color: #e4393c;
}
</style>