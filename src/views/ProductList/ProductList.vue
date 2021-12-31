<template>
  <div class="container">
    <el-row type="flex" class="header">
      <el-col :span="10" style="line-height: 50px">
        <span class="nav-item"
          ><a @click="showAll" :class="{ active: isActive === 1 }"
            >所有商品</a
          ></span
        >
        <span class="nav-item"
          ><a @click="showNew" :class="{ active: isActive === 2 }"
            >最新上架</a
          ></span
        >
        <span class="nav-item"
          ><a @click="showHot" :class="{ active: isActive === 3 }"
            >热销</a
          ></span
        >
      </el-col>
      <el-col flex="1" style="line-height: 50px"></el-col>
      <el-col :span="10" style="line-height: 50px">
        <span>排序方式：</span>
        <el-dropdown>
          <span class="el-dropdown-link" style="cursor: pointer">
            {{ order }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <a
              href="javascript:;"
              @click="change('上架时间', 0)"
              style="text-decoration: none; color: #333"
            >
              <el-dropdown-item>上架时间</el-dropdown-item>
            </a>
            <a
              href="javascript:;"
              @click="change('价格', 1)"
              style="text-decoration: none; color: #333"
            >
              <el-dropdown-item>价格</el-dropdown-item>
            </a>
            <a
              href="javascript:;"
              @click="change('已售量', 2)"
              style="text-decoration: none; color: #333"
            >
              <el-dropdown-item>已售量</el-dropdown-item>
            </a>
            <a
              href="javascript:;"
              @click="change('评价数', 3)"
              style="text-decoration: none; color: #333"
            >
              <el-dropdown-item>评价数</el-dropdown-item>
            </a>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button size="small" class="order-btn" @click="reverse">{{
          rev
        }}</el-button>
      </el-col>
    </el-row>
    <el-row style="display: flex; flex-wrap: wrap; justify-content: center">
      <div v-for="(item, index) in products" :key="index">
        <ProductItem :product="item" :key="componentKey" />
      </div>
    </el-row>
  </div>
</template>

<script>
import request from '../../utils/request'
const ProductItem = () => import('./ProductItem.vue')

export default {
  data() {
    return {
      componentKey: 0,
      order: '上架时间',
      orderNum: 0,
      rev: '升序',
      products: [],
      tempProducts: [],
      isActive: 1
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      request
        .get('/product/all')
        .then((res) => {
          this.products = []
          res.forEach((e) => {
            this.products.push(e)
          })
          this.sortBy()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    showAll() {
      this.load()
      this.isActive = 1
    },
    showNew() {
      // 最新上架是指时间早于或等于 2021-12-10的时间
      this.isActive = 2
      request
        .get('product/new')
        .then((res) => {
          this.products = []
          res.forEach((e) => {
            this.products.push(e)
          })
        })
        .catch((err) => {})
    },
    showHot() {
      // 热销是指售货量大于或等于 500 的商品
      this.isActive = 3
      request
        .get('product/hot')
        .then((res) => {
          this.products = []
          res.forEach((e) => {
            this.products.push(e)
          })
        })
        .catch((err) => {})
    },
    change(s, num) {
      this.order = s
      this.orderNum = num
      this.sortBy()
    },
    reverse() {
      this.rev = this.rev == '升序' ? '逆序' : '升序'
      this.sortBy()
    },
    forceRerender() {
      this.componentKey += 1
    },
    cmp(c1, c2) {
      // 按照时间排序
      if (this.orderNum == 0) {
        return this.rev == '升序'
          ? new Date(c1.createTime) - new Date(c2.createTime)
          : new Date(c2.createTime) - new Date(c1.createTime)
      }
      // 按照价格排序
      else if (this.orderNum == 1) {
        return this.rev == '升序'
          ? c1.productPrice - c2.productPrice
          : c2.productPrice - c1.productPrice
        // 按照售货量时间
      } else if (this.orderNum == 2) {
        return this.rev == '升序' ? c1.sold - c2.sold : c2.sold - c1.sold
      }
    },
    sortBy() {
      this.products.sort(this.cmp)
      this.forceRerender()
    }
  },
  components: {
    ProductItem
  }
}
</script>

<style scoped>
.container {
  width: 80%;
  margin-left: 50%;
  transform: translate(-50%);
  margin-bottom: 40px;
  margin-top: 30px;
}
.active {
  color: red;
}
.test {
  height: 200px;
  width: 200px;
  background-color: pink;
}
.header {
  height: 50px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
}
.nav-item {
  color: #8f8f96;
  margin-left: 10px;
  cursor: pointer;
}
.nav-item:hover {
  color: #ff143c;
}
.order-btn {
  height: 20px;
  width: 40px;
  line-height: 0;
  padding-left: 8px;
  margin-left: 5px;
}
</style>