<template>
  <div style="height: 500px">
    <el-carousel :interval="5000" arrow="hover" style="height: 500px">
      <el-carousel-item v-for="item in images" :key="item.id">
        <img :src="item.src" alt="" style="width: 100%" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        {
          id: 1,
          src: require('../assets/upload/bg1.jpg')
        },
        {
          id: 2,
          src: require('../assets/upload/bg2.jpg')
        },
        {
          id: 3,
          src: require('../assets/upload/bg3.jpg')
        }
      ]
    }
  }
}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__container {
  height: 500px;
}
</style>