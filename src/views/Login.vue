<template>
  <div>
    <div class="container">
      <img class="left" src="../assets/upload/left.svg" alt="" />
      <img class="right" src="../assets/upload/right.svg" alt="" />
      <div class="logo" @click="toHome" title="去往首页">
        <div>
          <img src="../assets/upload/logo.svg" alt="" style="margin-top: 2px" />
        </div>
        <div style="margin-left: 3px">在线商城</div>
      </div>
      <div class="login">
        <el-form
          :rules="rules"
          :model="form"
          ref="form"
          style="width: 80%"
          @submit.native.prevent
        >
          <h2 class="wel">欢迎登录</h2>
          <h3 style="margin-top: 20px">请输入登录名</h3>
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              prefix-icon="el-icon-user"
              clearable
            ></el-input>
          </el-form-item>
          <h3>请输入密码</h3>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              show-password
              prefix-icon="el-icon-key"
            ></el-input>
          </el-form-item>
          <el-button
            style="width: 100%; margin-top: 20px"
            type="primary"
            @click="login"
            >登录</el-button
          >
          <el-row type="flex" justify="end">
            <el-link type="primary" style="margin-top: 5px" @click="toRegister"
              >没有账号？点我注册</el-link
            >
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../utils/request'

export default {
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    toRegister() {
      this.$router.push('/register')
    },
    toHome() {
      this.$router.push('/home')
    },
    login() {
      if (
        typeof this.form.username === 'undefined' ||
        typeof this.form.password == 'undefined' ||
        this.form.username.length === 0 ||
        this.form.password.length === 0
      ) {
        this.$message({
          message: '请输入用户名和密码！',
          type: 'warning',
          duration: 2000
        })
      } else {
        request
          .post('/user/login', this.form)
          .then((res) => {
            if (res.code === '0') {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 2000
              })
              if (res.data.role === 0) {
                // 普通用户
                this.$router.push('/home')
                sessionStorage.setItem(
                  'userId',
                  JSON.stringify(res.data.userId)
                )
              } else {
                // 管理员和店家
              }
            } else {
              this.$message.error('登录失败！错误原因：' + res.msg)
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
.logo {
  position: relative;
  left: 10px;
  top: 5px;
  height: 40px;
  width: 120px;
  border-radius: 40px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
}

.logo:hover div {
  text-decoration: underline;
}

.wel {
  text-align: center;
  font-weight: normal;
  height: 60px;
  line-height: 60px;
}
.login {
  height: 400px;
  width: 330px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  /* opacity: 0.8; */
  margin-left: 50%;
  transform: translate(-50%);
  position: relative;
  top: 10%;
  display: flex;
  justify-content: center;
}
.login h3 {
  margin-bottom: 5px;
  font-weight: 400;
  font-size: 14px;
  color: #333;
}
.container {
  height: 100vh;
  background: #00c6ff; /* fallback for old browsers */
  /* background: #409eff; */
}
.left {
  position: absolute;
  left: 10px;
  top: 50px;
}
.right {
  position: absolute;
  right: 10px;
}
</style>