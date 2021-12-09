<template>
  <div>
    <el-row>
      <h3 class="header">商品分类</h3>
    </el-row>
    <el-row class="classify-container">
      <el-tabs :tab-position="tabPosition" :lazy="true">
        <el-tab-pane label="零食蔬菜" class="tab-pane">
          <div class="card-bd">
            <div v-for="(item, index) in foods" :key="index">
              <Card :product="item" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="图书教育" class="tab-pane">
          <div class="card-bd">
            <div v-for="(item, index) in books" :key="index">
              <Card :product="item" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="家用电器">
          <div class="card-bd">123</div>
        </el-tab-pane>
        <el-tab-pane label="个护清洁">个护清洁</el-tab-pane>
        <el-tab-pane label="电子数码">电子数码</el-tab-pane>
        <el-tab-pane label="医药保健">医药保健</el-tab-pane>
        <el-tab-pane label="玩具乐器">玩具乐器</el-tab-pane>
        <el-tab-pane label="玩具乐器">玩具乐器</el-tab-pane>
        <el-tab-pane label="玩具乐器">玩具乐器</el-tab-pane>
        <el-tab-pane label="玩具乐器">玩具乐器</el-tab-pane>
        <el-tab-pane label="玩具乐器">玩具乐器</el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
const Card = () => import('./CategoryCard.vue')

export default {
  data() {
    return {
      tabPosition: 'left',
      currentDate: new Date(),
      books: [
        {
          id: 1,
          name: '活着',
          price: 59.9,
          src: require('../../../assets/upload/book1.png'),
          desc: '《活着》是当代作家余华的代表作，讲述了一个人历尽世间沧桑和磨难的一生，亦将中国大半个世纪的社会变迁凝缩其间。《活着》还讲述了眼泪的宽广和丰富；讲述了绝望的不存在；讲述了人是为了活着本身而活着的，而不是为了活着之外的任何事物而活着。'
        },
        {
          id: 2,
          name: '活着',
          price: 59.9,
          src: require('../../../assets/upload/book1.png'),
          desc: '《活着》是当代作家余华的代表作，讲述了一个人历尽世间沧桑和磨难的一生，亦将中国大半个世纪的社会变迁凝缩其间。《活着》还讲述了眼泪的宽广和丰富；讲述了绝望的不存在；讲述了人是为了活着本身而活着的，而不是为了活着之外的任何事物而活着。'
        },
        {
          id: 3,
          name: '活着',
          price: 59.9,
          src: require('../../../assets/upload/book1.png'),
          desc: '《活着》是当代作家余华的代表作，讲述了一个人历尽世间沧桑和磨难的一生，亦将中国大半个世纪的社会变迁凝缩其间。《活着》还讲述了眼泪的宽广和丰富；讲述了绝望的不存在；讲述了人是为了活着本身而活着的，而不是为了活着之外的任何事物而活着。'
        },
        {
          id: 4,
          name: '活着',
          price: 59.9,
          src: require('../../../assets/upload/book1.png'),
          desc: '《活着》是当代作家余华的代表作，讲述了一个人历尽世间沧桑和磨难的一生，亦将中国大半个世纪的社会变迁凝缩其间。《活着》还讲述了眼泪的宽广和丰富；讲述了绝望的不存在；讲述了人是为了活着本身而活着的，而不是为了活着之外的任何事物而活着。'
        }
      ],
      foods: [
        {
          id: 5,
          name: '汉堡',
          src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          price: 19.9,
          desc: '现在可以特价购买'
        },
        {
          id: 6,
          name: '汉堡',
          src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          price: 19.9,
          desc: '现在可以特价购买'
        },
        {
          id: 7,
          name: '汉堡',
          src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          price: 19.9,
          desc: '现在可以特价购买'
        },
        {
          id: 8,
          name: '汉堡',
          src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          price: 19.9,
          desc: '现在可以特价购买'
        }
      ]
    }
  },
  components: {
    Card
  }
}
</script>

<style scoped>
.header {
  height: 40px;
  line-height: 40px;
  margin-top: 15px;
}
h3 {
  font-weight: 400;
}
.right {
  background-color: #b3d8ff;
}
.classify-container {
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
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

.card-bd {
  width: 100%;
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

.tab-pane {
  padding-right: 0;
}
</style>