<template>
  <div style="width: 100%" class="comment-bd">
    <h3 class="header">商品评论</h3>
    <div class="com-header" v-for="i in 3" :key="i">
      <el-avatar :size="60" :src="circleUrl" class="avatar"></el-avatar>
      <span class="uname">李华</span>
      <span class="text">非常好看的一本书，值得推荐！</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.comment-bd {
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
}
.header {
  height: 50px;
  line-height: 50px;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  font-weight: 400;
  border-bottom: 3px solid #f30213;
}
.com-header {
  height: 90px;
}
.avatar {
  position: relative;
  left: 10px;
  top: 20px;
}
.uname {
  position: relative;
  left: 20px;
  bottom: 20px;
}
.text {
  position: relative;
  right: 10px;
  top: 5px;
  color: #787a89;
  font-size: 13px;
}
</style>