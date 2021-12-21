<template>
  <div class="container">
    <div class="head">
      <h3>销售总体情况</h3>
      <el-button class="btn" type="primary" size="mini">刷新</el-button>
    </div>
    <el-descriptions class="margin-top" :column="1" style="width: 200px" border>
      <el-descriptions-item>
        <template slot="label"> 销售总额（元） </template>
        {{ 9998 }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 已售商品（件） </template>
        1000
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
</script>

<style scoped>
.container {
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 5px;
  /* background-color: #fff; */
}
.head {
  display: flex;
  margin-bottom: 10px;
}
.head h3 {
  font-weight: 400;
  color: #333;
}
.btn {
  margin-left: 30px;
}
</style>