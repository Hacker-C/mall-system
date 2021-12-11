<template>
  <div>
    <div class="container">
      <img class="left" src="../assets/upload/left.svg" alt="" />
      <img class="right" src="../assets/upload/right.svg" alt="" />
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
    login() {}
  }
}
</script>

<style scoped>
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
  top: 15%;
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
  background: #409eff;
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