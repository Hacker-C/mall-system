<template>
  <div>
    <h3 class="header">电子数码</h3>
    <el-row type="flex">
      <el-col :span="6" class="left-bd">123</el-col>
      <el-col :span="1" class="left-bd"></el-col>
      <el-col :span="17" class="right-bd">abc</el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.header {
  font-weight: 400;
  line-height: 40px;
  margin-top: 15px;
}
.left-bd {
  height: 500px;
  background-color: pink;
}
</style>