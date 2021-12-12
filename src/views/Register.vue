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
          :model="form"
          :rules="rules"
          ref="form"
          style="width: 80%"
          @submit.native.prevent
        >
          <h2 class="wel">Welcome to Register</h2>
          <h3 style="margin-top: 10px">请输入注册用户名</h3>
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
          <h3>请再次输入密码</h3>
          <el-form-item prop="repeatPassword">
            <el-input
              v-model="form.repeatPassword"
              type="password"
              show-password
              prefix-icon="el-icon-key"
            ></el-input>
          </el-form-item>
          <el-button style="width: 100%" type="primary" @click="register"
            >注册</el-button
          >
          <el-row type="flex" justify="end">
            <el-link type="primary" style="margin-top: 5px" @click="toRegister"
              >已有账号？点我登录</el-link
            >
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        repeatPassword: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        repeatPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    toRegister() {
      this.$router.push('/login')
    },
    register() {
      if (this.form.password != this.form.repeatPassword) {
        this.$message({
          message: '两次输入密码不一致！',
          type: 'warning'
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
.wel {
  text-align: center;
  font-weight: normal;
  height: 50px;
  line-height: 50px;
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