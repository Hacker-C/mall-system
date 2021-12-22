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
              店铺：<el-link
                @click="toShop"
                type="primary"
                style="font-size: 15px"
                >{{ shop.shopName }}</el-link
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
            <el-row style="text-align: center; margin-top: 15px">
              <el-button style="width: 80%" @click="addToLike"
                ><i class="far fa-heart"></i> 加入收藏夹</el-button
              >
            </el-row>
            <el-row style="text-align: center; margin-top: 15px">
              <el-button style="width: 80%" @click="addToCart">
                <i class="el-icon-shopping-cart-1"></i> 加入购物车</el-button
              >
            </el-row>
            <el-row style="text-align: center; margin-top: 15px">
              <el-button style="width: 80%" @click="toCheckout">
                直接购买</el-button
              >
            </el-row>
            <el-row style="text-align: center; margin-top: 15px">
              <el-button style="width: 80%" @click="commentOut">
                评价商品</el-button
              >
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

    <!-- 弹出框评价商品 -->
    <el-dialog
      title="请对商品进行评论或评分"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
    >
      <el-form :model="commentForm" class="form-bd">
        <el-form-item
          label="请给出评分"
          :label-width="formLabelWidth"
          class="bt"
        >
          <el-rate v-model="commentForm.rate" class="rate" show-text></el-rate>
        </el-form-item>
        <el-form-item label="评论商品" :label-width="formLabelWidth" class="bt">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            class="text"
            resize="none"
            v-model="commentForm.commentText"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" type="info"
          >取 消</el-button
        >
        <el-button type="success" @click="comment">提 交</el-button>
      </div>
    </el-dialog>
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
      detailsComments: [],
      shop: {
        shopName: '哈哈'
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      commentForm: {
        productId: null,
        commentText: '',
        userId: null,
        rate: null
      }
    }
  },
  created() {
    // 商品信息 this.$route.query.id，发送ajax请求数据
    request
      .get('/product/' + this.$route.query.id)
      .then((res) => {
        this.product = JSON.parse(JSON.stringify(res))
        this.product.createTime = this.product.createTime.slice(0, 10)
        // 获取店铺信息
        request.get('/shop/shop_id/' + this.product.shopId).then((res2) => {
          this.shop = JSON.parse(JSON.stringify(res2.data))
        })
      })
      .catch((err) => {
        console.log(err)
      })
    // 获取评论信息
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
    comment() {
      this.commentForm.productId = this.product.productId
      console.log(this.commentForm)
    },
    commentOut(e) {
      e.stopPropagation()
      let uId = sessionStorage.getItem('userId')
      let pId = this.product.productId
      console.log(uId)
      console.log(pId)
      request.get('/user/check/' + uId + '/' + pId).then((res) => {
        console.log(res)
        if (res.code === '1') {
          this.$message({
            message: res.msg,
            type: 'warning',
            duration: 1000
          })
        } else {
          this.commentForm = {}
          this.commentForm.userId = uId
          this.commentForm.productId = pId
          this.dialogFormVisible = true
        }
      })
    },
    toShop() {
      console.log(this.shop.shopId)
    },
    addToCart() {
      let pId = this.product.productId
      let uId = sessionStorage.getItem('userId')
      if (uId) {
        request
          .post('/cart', {
            userId: uId,
            productId: pId,
            count: this.num
          })
          .then((res) => {
            if (res.code == '1') {
              this.$message({
                message: res.msg,
                type: 'warning',
                duration: 1000
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1000
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.$message({
          message: '请先登录！',
          type: 'warning',
          duration: 1000
        })
      }
    },
    addToLike() {
      let pId = this.product.productId
      let uId = sessionStorage.getItem('userId')
      if (uId) {
        request
          .post('/like', {
            productId: pId,
            userId: uId
          })
          .then((res) => {
            if (res.code == '1') {
              this.$message({
                message: res.msg,
                type: 'warning',
                duration: 1000
              })
              return
            }
            if (res.code == '0') {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1000
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.$message({
          message: '请先登录！',
          type: 'warning',
          duration: 1000
        })
      }
    },
    toCheckout() {
      this.product.count = 1
      let obj = {
        total: 1,
        money: this.product.productPrice * this.product.discount,
        cartProducts: [this.product]
      }
      sessionStorage.setItem('checkout', JSON.stringify(obj))
      this.$router.push('/checkout')
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
  color: #510000;
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
.text {
  width: 400px;
}
.rate {
  position: relative;
  top: 10px;
}
</style>