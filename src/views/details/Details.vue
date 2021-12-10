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
          style="background-color: #f7f8fa; padding: 30px 0; text-align: center"
        >
          <img :src="item.src" alt="" style="width: 180px" />
        </div>

        <div class="desc">{{ item.desc }}</div>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="13" style="box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px">
        <h3 class="header">《{{ item.name }}》</h3>
        <el-row type="flex">
          <el-col :span="12" style="color: #787a89; padding-left: 15px">
            <div class="common" style="padding-top: 20px">
              上架时间：{{ item.time }}
            </div>
            <div class="common">
              折扣价：
              <span class="new-price"
                >￥{{ (item.price * item.discount).toFixed(2) }}</span
              >
            </div>
            <div v-if="item.discount < 1" class="common">
              原价：<span class="old-price">￥{{ item.price }}</span>
            </div>
            <div class="common">
              剩余库存：<span style="color: #409eff">{{ item.left }}</span> 件
            </div>
            <div class="common">
              预计到件时间：<span style="color: #409eff">三天后</span>
            </div>
            <div class="common">
              收货地址：<span style="color: #409eff">湖南省衡阳市</span>
            </div>
            <div class="common">
              货物重量：<span style="color: #409eff">0.3kg</span>
            </div>
            <div class="common">
              服务：<span style="color: #409eff; font-size: 14px"
                >上门换新 | 破损包退换 | 闪电退款</span
              >
            </div>
            <div class="counts">
              <div @click="decrease">-</div>
              <div>{{ count }}</div>
              <div @click="increase">+</div>
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
                {{ item.saled }}
              </el-col>
              <el-col
                :span="8"
                class="nav-item"
                style="border-right: none; color: #ff3036; font-size: 16px"
              >
                {{ item.comments }}
              </el-col>
              <el-col
                :span="8"
                class="nav-item"
                style="font-size: 16px; color: #228800"
                >{{ item.rate }}</el-col
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
    <Comment :cUser="user" />
  </div>
</template>

<script>
const Comment = () => import('./Comment.vue')

export default {
  data() {
    return {
      item: {
        id: 4,
        name: '活着',
        price: 59.9,
        time: '2021-10-12',
        discount: 0.9,
        left: 999,
        saled: 100,
        rate: 4.5,
        comments: 99,
        src: require('../../assets/upload/book1.png'),
        desc: '《活着》是当代作家余华的代表作，讲述了一个人历尽世间沧桑和磨难的一生，亦将中国大半个世纪的社会变迁凝缩其间。《活着》还讲述了眼泪的宽广和丰富；讲述了绝望的不存在；讲述了人是为了活着本身而活着的，而不是为了活着之外的任何事物而活着。'
      },
      count: 0,
      user: {
        avatarUrl:
          'https://cdn.jsdelivr.net/gh/Hacker-C/Picture-Bed@main/javaweb/avatar.4biaa36wslg0.jpg',
        username: '李华'
      }
    }
  },
  mounted() {
    // 商品信息 this.$route.query.id，发送ajax请求数据
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