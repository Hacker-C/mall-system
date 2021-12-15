<template>
  <div style="width: 80%; margin-left: 50%; transform: translate(-50%)">
    <h3 class="head">
      <i class="fas fa-star" style="color: #909399"></i> 我的收藏夹
    </h3>
    <div v-if="isLogin && likeProducts.length > 0">
      <div class="like-bd">
        <div v-for="(item, index) in likeProducts" :key="index">
          <LikeItem :likeProduct="item" @reload="load" />
        </div>
      </div>
    </div>
    <div v-else-if="likeProducts.length == 0 && isLogin" style="color: #909399">
      您还没有添加任何商品到购物车，先去逛逛吧~
    </div>
    <div v-else style="color: #909399">请先登录（注册后登录即可成为会员）</div>
  </div>
</template>

<script>
import request from '../../utils/request'
const LikeItem = () => import('./LikeItem.vue')
export default {
  data() {
    return {
      isLogin: false,
      likeProducts: [],
      i: 0
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      let userId = sessionStorage.getItem('userId')
      this.isLogin = userId ? true : false
      if (userId) {
        request.get('/like/' + userId).then((res) => {
          this.likeProducts = []
          res.data.forEach((e) => {
            this.likeProducts.push(e)
          })
        })
      }
    }
  },
  components: {
    LikeItem
  }
}
</script>

<style scoped>
.head {
  /* background-color: pink; */
  height: 50px;
  line-height: 60px;
  font-weight: 400;
  border-bottom: 1px dotted rgba(204, 204, 204, 0.5);
}
.like-bd {
  padding: 15px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
}
</style>