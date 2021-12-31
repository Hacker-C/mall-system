<template>
  <div>
    <el-carousel
      :interval="3000"
      arrow="hover"
      height="500px"
      style="width: 100%"
    >
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
          src: require('../../../assets/upload/bg1.png')
        },
        {
          id: 2,
          src: require('../../../assets/upload/bg2.png')
        },
        {
          id: 3,
          src: require('../../../assets/upload/bg3.png')
        },
        {
          id: 4,
          src: require('../../../assets/upload/bg4.png')
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
.el-carousel__container {
  height: 500px;
}
</style>