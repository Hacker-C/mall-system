<template>
  <el-row type="flex" class="row-bg" justify="space-around">
    <el-col :span="4" class="item">
      <h3>后台管理</h3>
    </el-col>
    <el-col class="item" flex="1"></el-col>
    <el-col :span="3" class="item">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <a @click="toProfile" style="display: block">
            <el-dropdown-item icon="el-icon-user"> 个人信息 </el-dropdown-item>
          </a>
          <a @click="quit" style="display: block">
            <el-dropdown-item icon="el-icon-warning-outline">
              退出系统
            </el-dropdown-item>
          </a>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  computed: {
    username() {
      if (sessionStorage.getItem('user')) {
        return JSON.parse(sessionStorage.getItem('user'))['username']
      }
    }
  },
  methods: {
    quit() {
      this.$router.push('/login')
    },
    toProfile() {
      this.$router.push('/profile')
    }
  }
}
</script>

<style>
.row-bg {
  box-shadow: 0 1px 1px 1px rgba(204, 204, 204, 0.5);
}
.item {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
}
.item h3 {
  color: #409eff;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>