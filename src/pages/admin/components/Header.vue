<template>
  <el-row type="flex" class="row-bg" justify="space-around">
    <el-col :span="7" class="item">
      <a href="/home" class="home-link">商城系统</a>
      <div class="header">后台管理</div>
      <span class="sub-header">[管理员]</span>
    </el-col>
    <el-col class="item" flex="1"></el-col>
    <el-col :span="3" class="item">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link fc">
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
import request from '../../../utils/request'

export default {
  data() {
    return {
      username: ''
    }
  },
  created() {
    let userId = sessionStorage.getItem('userId')
    request
      .get('/user/' + userId)
      .then((res) => {
        if (res.code == '0') {
          this.username = res.data.username
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    quit() {
      this.$router.push('/login')
      sessionStorage.clear()
    },
    toProfile() {
      this.$router.push('/admin/profile')
    }
  }
}
</script>

<style scoped>
.row-bg {
  box-shadow: 0 1px 1px 1px rgba(204, 204, 204, 0.5);
  /* background-color: #459efd; */
}

.home-link {
  margin-right: 5px;
  font-size: 18px;
}
.item {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
}
.item .header {
  font-weight: 700;
  font-size: 20px;
  color: #409eff;
}
.sub-header {
  font-weight: 700;
  margin-left: 5px;
  font-size: 16px;
  color: #333;
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