<template>
  <div
    style="
      width: 80%;
      margin-left: 50%;
      transform: translate(-50%);
      margin-top: 20px;
      padding-bottom: 0;
    "
  >
    <el-row type="flex">
      <el-col :span="10" style="box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px">
        <div
          style="
            background-color: #f7f8fa;
            height: 300px;
            padding: 30px 0;
            text-align: center;
          "
        >
          <img :src="product.imgSrc" alt="" style="width: 180px" />
        </div>

        <div class="desc">{{ product.productDesc }}</div>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="13" style="box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px">
        <h3 class="header">《{{ product.productName }}》</h3>
        <el-row type="flex">
          <el-col :span="12" style="color: #787a89; padding-left: 15px">
            <div class="common" style="padding-top: 20px">
              上架时间：{{ product.createTime }}
            </div>
            <div class="common">
              折扣价：
              <span class="new-price"
                >￥{{
                  (product.productPrice * product.discount).toFixed(2)
                }}</span
              >
            </div>
            <div v-if="product.discount < 1" class="common">
              原价：<span class="old-price">￥{{ product.productPrice }}</span>
            </div>
            <div class="common">
              剩余库存：<span style="color: #409eff">{{ product.left }}</span>
              件
            </div>
            <div class="common">
              预计到件时间：<span style="color: #409eff">三天后</span>
            </div>
            <div class="common">
              收货地址：<span style="color: #409eff">湖南省衡阳市</span>
            </div>
            <div class="common">
              货物重量：<span style="color: #409eff"
                >{{ product.weight }}kg</span
              >
            </div>
            <div class="common">
              服务：<span style="color: #409eff; font-size: 14px"
                >上门换新 | 破损包退换 | 闪电退款</span
              >
            </div>
            <div>
              <el-input-number
                size="small"
                v-model="num"
                :min="1"
                :max="100"
              ></el-input-number>
            </div>
          </el-col>
          <el-col :span="12" class="right">
            <h3 class="header" style="text-align: center; border-bottom: none">
              商品综合信息
            </h3>
            <el-row class="nav">
              <el-col :span="8" class="nav-item"> 月销量 </el-col>
              <el-col :span="8" class="nav-item"> 累计评价 </el-col>
              <el-col :span="8" class="nav-item">评分</el-col>
            </el-row>
            <el-row class="nav" style="border-top: none; margin-top: 0">
              <el-col
                :span="8"
                class="nav-item"
                style="border-right: none; color: #ff3036; font-size: 16px"
              >
                {{ product.sold }}
              </el-col>
              <el-col
                :span="8"
                class="nav-item"
                style="border-right: none; color: #ff3036; font-size: 16px"
              >
                <!-- product.comments -->
                {{ this.detailsComments.length }}
              </el-col>
              <el-col
                :span="8"
                class="nav-item"
                style="font-size: 16px; color: #228800"
                >{{ product.rate }}</el-col
              >
            </el-row>
            <el-row style="text-align: center; margin-top: 20px">
              <el-button style="width: 80%"
                ><i class="far fa-heart"></i> 加入收藏夹</el-button
              >
            </el-row>
            <el-row style="text-align: center; margin-top: 20px">
              <el-button style="width: 80%">
                <i class="el-icon-shopping-cart-1"></i> 加入购物车</el-button
              >
            </el-row>
            <el-row style="text-align: center; margin-top: 20px">
              <el-button style="width: 80%"> 直接购买</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div style="width: 100%" class="comment-bd">
      <h3 class="header1">商品评论</h3>
      <div v-for="(detailsComment, index) in detailsComments" :key="index">
        <Comment :cDetailsComment="detailsComment" />
      </div>
    </div>
  </div>
</template>

<script>
const Comment = () => import('./Comment.vue')
import request from '../../utils/request'

export default {
  data() {
    return {
      num: 1,
      product: {},
      count: 0,
      detailsComments: []
    }
  },
  created() {
    // 商品信息 this.$route.query.id，发送ajax请求数据
    request
      .get('/product/' + this.$route.query.id)
      .then((res) => {
        this.product = JSON.parse(JSON.stringify(res))
        this.product.createTime = this.product.createTime.slice(0, 10)
      })
      .catch((err) => {
        console.log(err)
      })
    request
      .get('/comment/' + this.$route.query.id)
      .then((res) => {
        this.detailsComments = []
        res.forEach((e) => {
          this.detailsComments.push(e)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    decrease() {
      this.count && this.count--
    },
    increase() {
      this.count++
    }
  },
  components: {
    Comment
  }
}
</script>

<style scoped>
.comment-bd {
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
}
.header1 {
  height: 50px;
  line-height: 50px;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  font-weight: 400;
  border-bottom: 2px solid #f30213;
}
.nav {
  text-align: center;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px dotted #000;
  border-top: 1px dotted #000;
}
.nav-item {
  font-size: 12px;
}
.nav-item:nth-child(1),
.nav-item:nth-child(2) {
  border-right: 1px solid #ccc;
  height: 40px;
  margin-top: 5px;
  line-height: 40px;
}
.right {
  border-left: 1.4px solid #ccc;
}
.counts {
  height: 40px;
  width: 143px;
  /* border: 1px solid #ccc; */
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  margin-left: 20px;
}
.counts div {
  float: left;
  height: 40px;
  width: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 25px;
}
.counts div:nth-child(2),
.counts div:nth-child(3) {
  border-left: 1px solid #ccc;
}

.counts div:nth-child(2) {
  color: #409eff;
  width: 60px;
}

.counts div:nth-child(1),
.counts div:nth-child(3) {
  cursor: pointer;
  user-select: none;
  font-size: 30px !important;
}

.counts div:nth-child(1):active,
.counts div:nth-child(3):active {
  color: #4fa9fd;
}

.header {
  border-bottom: 1px solid #ccc;
  padding: 15px;
  font-weight: 400;
  color: #520000;
}
.desc {
  text-indent: 2rem;
  padding: 15px;
  color: #787a89;
  height: 140px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}
.new-price {
  font-weight: 700;
  /* color: #e01222; */
  color: #409eff;
  font-size: 20px;
}
.old-price {
  color: #787a89;
  text-decoration: line-through;
}
.common {
  padding-bottom: 20px;
  line-height: 20px;
}
</style>