<template>
  <div class="container">
    <el-descriptions
      title="所有角色以及权限说明"
      :column="1"
      :size="size"
      border
    >
      <template slot="extra">
        <el-button type="primary" size="small">操作</el-button>
      </template>
      <el-descriptions-item
        :labelStyle="{ color: '#409eff', background: '#ecf5ff' }"
      >
        <template slot="label">
          <i class="fas fa-user-cog"></i>
          管理员
        </template>
        管理商家和客户,
        添加新用户(包含商家和客户),维护系统,设置平台公告,设置首页轮播图,可删除商品列表
      </el-descriptions-item>
      <el-descriptions-item
        :labelStyle="{ color: '#e6a23c', background: '#fdf6ec' }"
      >
        <template slot="label">
          <i class="el-icon-food"></i>
          商家
        </template>
        管理自己的商品
      </el-descriptions-item>
      <el-descriptions-item
        :labelStyle="{ color: '#67c23a', background: '#f0f9eb' }"
      >
        <template slot="label">
          <i class="far fa-user-circle"></i>
          客户
        </template>
        浏览网页,注册网站,登录网站,加入收藏,加入购物车,进行购买,进行重置
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      title="账号状态说明"
      :column="1"
      :size="size"
      border
      style="margin-top: 20px"
    >
      <el-descriptions-item
        :labelStyle="{ color: '#13ce66', background: '#ecf5ff', width: '80px' }"
      >
        <template slot="label">
          <i class="fas fa-toggle-on"></i> 开启
        </template>
        用户可正常登录
      </el-descriptions-item>
      <el-descriptions-item
        :labelStyle="{ color: '#ff4949', background: '#ecf5ff', width: '80px' }"
      >
        <template slot="label">
          <i class="fas fa-toggle-off"></i> 关闭
        </template>
        用户无法登录
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: ''
    }
  }
}
</script>

<style scoped>
.container {
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
h4 {
  font-weight: 400;
}
p {
  color: #606266;
  text-indent: 2rem;
  margin: 5px 0 20px 0;
  font-size: 14px;
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