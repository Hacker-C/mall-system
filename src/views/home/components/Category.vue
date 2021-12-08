<template>
  <div>
    <el-row>
      <h3 class="header">商品分类</h3>
    </el-row>
    <el-row class="classify-container">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="零食蔬菜" style="display: block; padding-right: 0">
          <div class="card-bd">
            <el-card class="card" v-for="i in 7" :key="i">
              <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
              />
              <p style="margin-left: 10%">汉堡</p>
              <p style="font-size: 10px; color: #333; margin-left: 10%">
                现在可以特价购买...
              </p>
              <span style="color: red; margin-left: 10%; font-size: 15px"
                >￥19.9</span
              >
              <div>
                <el-button size="small">加入购物车</el-button>
                <el-button size="small">购买</el-button>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="图书教育" style="display: block; padding-right: 0">
          <div class="card-bd">
            <el-card class="card" v-for="item in books" :key="item.id">
              <img :src="item.src" class="image" />
              <p style="margin-left: 10%">{{ item.name }}</p>
              <p style="font-size: 10px; color: #333; margin-left: 10%">
                现在可以特价购买...
              </p>
              <span style="color: red; margin-left: 10%; font-size: 15px"
                >￥19.9</span
              >
              <div>
                <el-button size="small">加入购物车</el-button>
                <el-button size="small">购买</el-button>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="家用电器">家用电器</el-tab-pane>
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
export default {
  data() {
    return {
      tabPosition: 'left',
      currentDate: new Date()
    }
  },
  computed: {
    books() {
      return [
        {
          id: 1,
          name: '活着',
          src: require('../../../assets/upload/book1.png'),
          desc: '《活着》是当代作家余华的代表作，讲述了一个人历尽世间沧桑和磨难的一生，亦将中国大半个世纪的社会变迁凝缩其间。《活着》还讲述了眼泪的宽广和丰富；讲述了绝望的不存在；讲述了人是为了活着本身而活着的，而不是为了活着之外的任何事物而活着。'
        },
        {
          id: 1,
          name: '活着',
          src: require('../../../assets/upload/book1.png'),
          desc: '《活着》是当代作家余华的代表作，讲述了一个人历尽世间沧桑和磨难的一生，亦将中国大半个世纪的社会变迁凝缩其间。《活着》还讲述了眼泪的宽广和丰富；讲述了绝望的不存在；讲述了人是为了活着本身而活着的，而不是为了活着之外的任何事物而活着。'
        },
        {
          id: 1,
          name: '活着',
          src: require('../../../assets/upload/book1.png'),
          desc: '《活着》是当代作家余华的代表作，讲述了一个人历尽世间沧桑和磨难的一生，亦将中国大半个世纪的社会变迁凝缩其间。《活着》还讲述了眼泪的宽广和丰富；讲述了绝望的不存在；讲述了人是为了活着本身而活着的，而不是为了活着之外的任何事物而活着。'
        }
      ]
    }
  }
}
</script>

<style scoped>
.header {
  height: 40px;
  line-height: 40px;
  margin-top: 15px;
}
.right {
  background-color: #b3d8ff;
}
.classify-container {
  margin-bottom: 100px;
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
</style>