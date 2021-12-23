<template>
  <div>
    <h3 class="header">电子数码</h3>
    <el-row type="flex" class="bd">
      <el-col :span="5" class="left-bd">
        <a href="javascript:;" style="display: block">
          <img
            class="left-img"
            src="../../../../assets/upload/leftP1.webp"
            alt=""
          />
        </a>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="18" class="right-bd">
        <div style="cursor: pointer" v-for="i in 8" :key="i" @click="a">
          <img
            class="item"
            src="../../../../assets/upload/phone1.webp"
            alt=""
          />
          <h4 class="name">Xiaomi 11 青春活力版</h4>
          <p class="desc">轻薄5G，内外皆出彩</p>
          <div class="price">1999元起</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    a() {}
  }
}
</script>

<style scoped>
.header {
  font-weight: 400;
  height: 60px;
  line-height: 80px;
}
.left-bd {
  height: 500px;
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

.left-img {
  width: 100%;
}
/*
.right-bd {
  height: 500px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(2, 25%);
}
*/
.right-bd {
  height: 500px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
  color: #ff6700;
  font-weight: 100;
}
.desc {
  bottom: 40px;
  color: #b0b0b0;
  font-size: 14px;
}
.name {
  font-weight: 100;
  bottom: 60px;
}
</style>