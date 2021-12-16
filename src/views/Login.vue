<template>
  <div>
    <div class="container">
      <img class="left" src="../assets/upload/left.svg" alt="" />
      <img class="right" src="../assets/upload/right.svg" alt="" />
      <button
        class="button-29 logo"
        role="button"
        @click="toHome"
        title="去往首页"
      >
        <img src="../assets/upload/logo.svg" alt="" />在线商城
      </button>
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
      },
      timer: null
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
                duration: 1000
              })
              sessionStorage.setItem('role', res.data.role)
              sessionStorage.setItem('userId', JSON.stringify(res.data.userId))
              clearTimeout(this.timer)
              this.timer = setTimeout(() => {
                if (res.data.role == 'user') {
                  // 普通用户
                  this.$router.push('/home')
                } else if (res.data.role == 'admin') {
                  // 管理员
                  this.$router.push('/admin')
                } else if (res.data.role == 'shop') {
                  // 商家
                  this.$router.push('/shop')
                }
              }, 1000)
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
  top: 10px;
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

/* CSS */
.button-29 {
  align-items: center;
  appearance: none;
  background-image: radial-gradient(
    100% 100% at 100% 0,
    #5adaff 0,
    #00c6ff 100%
  );
  border: 0;
  border-radius: 20px;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, rgba(58, 65, 111, 0.5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: 'JetBrains Mono', monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;
}

.button-29:focus {
  box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
}

.button-29:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #409eff 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-29:active {
  box-shadow: #3c4fe0 0 3px 7px inset;
  transform: translateY(2px);
}
</style>