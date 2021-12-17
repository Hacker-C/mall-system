<template>
  <div>
    <h4>所有角色以及权限说明</h4>
    <div class="item">
      <el-tag>管理员</el-tag>
      <p>
        管理商家和客户,
        添加新用户(包含商家和客户),维护系统,设置平台公告,设置首页轮播图,可删除商品列表
      </p>
    </div>
    <div class="item">
      <el-tag type="warning">商家</el-tag>
      <p>管理自己的商品</p>
    </div>
    <div class="item">
      <el-tag type="success">客户</el-tag>
      <p>浏览网页,注册网站,登录网站,加入收藏,加入购物车,进行购买,进行重置</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
h4 {
  font-weight: 400;
}
p {
  color: #606266;
  text-indent: 2rem;
  margin: 5px 0 10px 0;
}
.item {
  margin: 10px;
}
.my-label {
  background: #e1f3d8;
}

.my-content {
  background: #fde2e2;
}
</style>