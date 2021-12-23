<template>
  <div>
    <h3 class="header">畅销书籍</h3>
    <el-row type="flex" class="bd">
      <el-col :span="8" class="left-bd">
        <a href="javascript:;" style="display: block">
          <img
            class="left-img"
            src="../../../../assets/upload/leftP3.webp"
            alt=""
          />
        </a>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="6" class="right-bd">
        <div style="cursor: pointer" v-for="i in 6" :key="i" @click="a">
          <img class="item" src="../../../../assets/upload/book1.webp" alt="" />
          <p class="name">中华经典书籍</p>
          <div class="price">￥47.40</div>
        </div>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="8" class="rank-bd">
        <header>
          <img src="../../../../assets/icon/rank.png" alt="" />
          排行榜
        </header>
        <div
          v-for="(item, index) in books"
          :key="item.productId"
          class="num-bd"
        >
          <div class="num">
            <div class="rank-num">{{ index + 1 }}</div>
            <img
              style="width: 20px"
              src="../../../../assets/icon/num.png"
              alt=""
            />
          </div>
          <div class="rank-item">
            <img
              src="../../../../assets/upload/rank1.webp"
              class="rank-img"
              alt=""
            />
            <div>
              <div style="font-size: 13px">{{ item.productName }}</div>
              <div class="rank-price">￥ {{ item.productPrice }}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    a() {}
  },
  data() {
    return {
      books: [
        {
          imgSrc: '../../../../assets/upload/rank1.webp',
          productName: '郭论（郭德纲口述中国文化通史）',
          productPrice: 49.8,
          productId: 1
        },
        {
          imgSrc: import('../../../../assets/upload/rank1.webp'),
          productName: '郭论（郭德纲口述中国文化通史）',
          productPrice: 49.8,
          productId: 2
        },
        {
          imgSrc: import('../../../../assets/upload/rank1.webp'),
          productName: '郭论（郭德纲口述中国文化通史）',
          productPrice: 49.8,
          productId: 3
        },
        {
          imgSrc: import('../../../../assets/upload/rank1.webp'),
          productName: '郭论（郭德纲口述中国文化通史）',
          productPrice: 49.8,
          productId: 4
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
.left-bd,
.rank-bd {
  height: 450px;
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
.bd {
  margin-bottom: 50px;
}
.left-img {
  /* width: 100%; */
  height: 450px;
  width: 100%;
}
.right-bd {
  height: 450px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
.right-bd > div:hover img {
  opacity: 0.8;
}
.item {
  width: 80%;
  position: absolute;
  top: 10px;
}
.name,
.desc,
.price {
  position: absolute;
}
.price {
  bottom: 10px;
  color: #f12b2b;
  font-weight: 700;
}
.desc {
  bottom: 40px;
  color: #b0b0b0;
  font-size: 14px;
}
.name {
  font-weight: 100;
  bottom: 30px;
}
.rank-bd {
  padding: 10px;
}
header {
  border-bottom: 1px dotted #ccc;
  height: 30px;
  line-height: 20px;
}
header > img {
  height: 20px;
  vertical-align: middle;
}
.rank-img {
  width: 70px;
}
.rank-item {
  display: flex;
  margin-top: 10px;
}
.rank-price {
  color: #f12b2b;
  font-size: 13px;
  margin-top: 10px;
}
.num {
  position: relative;
  left: 0;
  top: 40px;
}
.num-bd {
  cursor: pointer;
}

.rank-num {
  color: #fff;
  position: absolute;
  left: 5px;
  bottom: 4px;
  font-size: 12px;
}
</style>