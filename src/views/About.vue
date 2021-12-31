<template>
  <div class="container">
    <h3 class="header">关于</h3>
    <p>这是一个在线商城项目</p>
    <el-descriptions title="信工网巨差小组" style="padding: 10px" :column="1">
      <el-descriptions-item label="小组成员"
        >唐承 陈桂 李志贤 胡少伟 王福源</el-descriptions-item
      >
    </el-descriptions>
    <el-descriptions title="Github 地址" style="padding: 10px" :column="1">
      <el-descriptions-item label="前端">
        <el-link
          target="blank"
          type="primary"
          href="https://github.com/Hacker-C/Mall-FrontEnd"
          >Mall-FrontEnd</el-link
        >
      </el-descriptions-item>
      <el-descriptions-item label="后端">
        <el-link
          target="blank"
          type="primary"
          href="https://github.com/Hacker-C/Mall-BackEnd"
          >Mall-BackEnd</el-link
        >
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.container {
  width: 70%;
  margin-left: 50%;
  transform: translate(-50%);
}
.header {
  height: 50px;
  line-height: 60px;
  font-weight: 400;
  border-bottom: 1px dotted rgba(204, 204, 204, 0.5);
}
p {
  font-style: italic;
  padding: 10px;
  color: #666;
}
</style>