<template>
  <div style="width: 80%; margin-left: 50%; transform: translate(-50%)">
    <el-row type="flex" class="header">
      <el-col class="nav" :span="5"> 商品图片 </el-col>
      <el-col class="nav" :span="3"> 商品名称 </el-col>
      <el-col class="nav" :span="6"> 描述 </el-col>
      <el-col class="nav" :span="3">单价</el-col>
      <el-col class="nav" :span="3">数量</el-col>
      <el-col class="nav" :span="2">总计</el-col>
      <el-col class="nav" :span="2"> </el-col>
    </el-row>
    <div v-for="(item, index) in likeProducts" :key="index">
      <CartItem :cLikeProducts="item" />
    </div>
  </div>
</template>

<script>
const CartItem = () => import('./CartItem.vue')

export default {
  data() {
    return {
      likeProducts: [
        {
          id: 10,
          name: '活着',
          price: 59.9,
          time: '2021-10-12',
          discount: 0.9,
          left: 999,
          saled: 100,
          rate: 4.5,
          counts: 3,
          comments: 99,
          src: require('../../assets/upload/book1.png'),
          desc: '《活着》是当代作家余华的代表作，讲述了一个人历尽世间沧桑和磨难的一生，亦将中国大半个世纪的社会变迁凝缩其间。还讲述了眼泪的宽广和丰富；讲述了绝望的不存在；讲述了人是为了活着本身而活着的，而不是为了活着之外的任何事物而活着。'
        },
        {
          id: 11,
          name: '活着',
          price: 59.9,
          time: '2021-10-12',
          discount: 0.9,
          left: 999,
          saled: 100,
          rate: 4.5,
          counts: 3,
          comments: 99,
          src: require('../../assets/upload/book1.png'),
          desc: '《活着》是当代作家余华的代表作，讲述了一个人历尽世间沧桑和磨难的一生，亦将中国大半个世纪的社会变迁凝缩其间。还讲述了眼泪的宽广和丰富；讲述了绝望的不存在；讲述了人是为了活着本身而活着的，而不是为了活着之外的任何事物而活着。'
        },
        {
          id: 12,
          name: '活着',
          price: 59.9,
          time: '2021-10-12',
          discount: 0.9,
          left: 999,
          saled: 100,
          rate: 4.5,
          counts: 3,
          comments: 99,
          src: require('../../assets/upload/book1.png'),
          desc: '《活着》是当代作家余华的代表作，讲述了一个人历尽世间沧桑和磨难的一生，亦将中国大半个世纪的社会变迁凝缩其间。还讲述了眼泪的宽广和丰富；讲述了绝望的不存在；讲述了人是为了活着本身而活着的，而不是为了活着之外的任何事物而活着。'
        }
      ]
    }
  },
  components: {
    CartItem
  }
}
</script>

<style scoped>
.header {
  height: 50px;
  line-height: 70px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
}
.nav {
  color: #828bb2;
}
</style>