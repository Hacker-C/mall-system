<template>
  <div style="width: 70%; margin-left: 50%; transform: translate(-50%)">
    <h3 class="header">我的账号中心</h3>
    <div v-if="isLogin">
      <el-descriptions
        title="个人信息"
        direction="vertical"
        style="margin-top: 10px"
        :column="3"
        border
      >
        <el-descriptions-item label="用户名">{{
          user.username
        }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{
          user.telephone
        }}</el-descriptions-item>
        <el-descriptions-item label="住址">{{
          user.address
        }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ user.sex }}</el-descriptions-item>
        <el-descriptions-item label="年龄">{{ user.age }}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{
          user.realName
        }}</el-descriptions-item>
        <el-descriptions-item label="头像">
          <div style="position: relative">
            <el-avatar size="medium"
              ><img :src="user.avatar" alt=""
            /></el-avatar>
            <el-button
              size="mini"
              style="position: absolute; top: 5px; left: 60px"
              >修改头像</el-button
            >
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions
        title="账号安全"
        direction="vertical"
        style="margin-top: 10px; margin-bottom: 50px"
        :column="3"
        border
      >
        <el-descriptions-item label="账号注册时间" :span="1">{{
          user.createTime
        }}</el-descriptions-item>
        <el-descriptions-item label="在线状态">
          <el-tag size="medium">在线</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="账号状态">
          <el-tag size="medium" type="success">{{ statusText }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="账户余额">
          <div style="position: relative">
            ￥{{ user.money }}

            <el-button size="mini" style="position: absolute; right: 0"
              >充值金额</el-button
            >
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="密码安全" :span="1">
          <el-button size="mini">修改密码</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="身份角色">
          <el-tag size="medium">会员客户</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div v-else style="color: #909399">请先登录（注册后登录即可成为会员）</div>
  </div>
</template>

<script>
import request from '../utils/request'
export default {
  data() {
    return {
      isLogin: sessionStorage.getItem('userId'),
      user: {}
    }
  },
  created() {
    this.load()
  },
  computed: {
    statusText() {
      return this.user.status === 1 ? '正常' : '异常'
    }
  },
  methods: {
    load() {
      let userId = sessionStorage.getItem('userId')
      if (userId) {
        request
          .get('/user/' + userId)
          .then((res) => {
            if (res.code == '0') {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1000
              })
              this.user = Object.assign({}, this.user, res.data)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style scoped>
.header {
  /* background-color: pink; */
  height: 50px;
  line-height: 60px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
}
h3 {
  font-weight: 400;
}
</style>