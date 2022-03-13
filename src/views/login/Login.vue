<template>
  <div class="container1">
    <div class="form-warp">
      <form class="sign-in-form">
        <h2 class="logo">在线商城系统</h2>
        <h2 class="form-title">登录</h2>
        <input v-model="form.username" placeholder="用户名" />
        <input
          v-model="form.password"
          type="password"
          placeholder="密码"
          autocomplete
        />
        <div class="submit-btn" @click="login">立即登录</div>
      </form>
      <form class="sign-up-form">
        <h2 class="logo">在线商城系统</h2>
        <h2 class="form-title">注册</h2>
        <input v-model="form.username" placeholder="用户名" />
        <input
          v-model="form.password"
          type="password"
          placeholder="请设置密码"
          autocomplete
        />
        <input
          v-model="form.repeatPassword"
          type="password"
          placeholder="请再次密码"
          autocomplete
        />
        <div class="submit-btn" @click="register">立即注册</div>
      </form>
    </div>
    <div class="desc-warp">
      <div class="desc-warp-item sign-up-desc">
        <div class="content">
          <button id="sign-up-btn">注册</button>
        </div>
        <!-- <img src="./img/log.svg" alt="" /> -->
        <img src="../../assets/upload/left.svg" alt="" />
      </div>
      <div class="desc-warp-item sign-in-desc">
        <div class="content">
          <button id="sign-in-btn">登录</button>
        </div>
        <img style="width: 80%" src="../../assets/upload/right.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'

export default {
  data() {
    return {
      form: {}
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
        console.log(this.form)
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
    },
    register() {
      if (
        typeof this.form.username == 'undefined' ||
        typeof this.form.password == 'undefined' ||
        typeof this.form.repeatPassword == 'undefined'
      ) {
        this.$message({
          message: '相关信息不能为空',
          type: 'warning'
        })
        return
      }
      if (
        this.form.username.length == 0 ||
        this.form.password.length == 0 ||
        this.form.repeatPassword.length == 0
      ) {
        this.$message({
          message: '相关信息不能为空',
          type: 'warning'
        })
        return
      }
      if (this.form.password != this.form.repeatPassword) {
        this.$message({
          message: '两次输入密码不一致！',
          type: 'warning'
        })
      } else {
        request
          .post('/user/register', this.form)
          .then((res) => {
            // 用户名重复
            if (res.code == '1') {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            } else if (res.code == '0') {
              this.$message({
                message: res.msg + '请前往登录！',
                type: 'success'
              })
              this.$router.push('/login')
            } else {
              this.$message.error('注册失败！错误原因：服务器出现问题。')
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  },
  mounted() {
    const singUpBtn = document.querySelector('#sign-up-btn')
    const singInBtn = document.querySelector('#sign-in-btn')
    const container1 = document.querySelector('.container1')

    singUpBtn.addEventListener('click', () => {
      container1.classList.add('sign-up-mode')
    })
    singInBtn.addEventListener('click', () => {
      container1.classList.remove('sign-up-mode')
    })
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: #333;
}

.container1 {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
}
.container1::before {
  content: ' ';
  position: absolute;
  width: 2000px;
  height: 2000px;
  border-radius: 50%;
  background-image: linear-gradient(-45deg, #6266f5 0%, #04befe 100%);
  transition: 1.8s ease-in-out;
  z-index: 6;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
}
.container1.sign-up-mode::before {
  transform: translate(100%, -50%);
}

.form-warp {
  width: 50%;
  position: absolute;
  z-index: 5;
  left: 75%;
  top: 50%;
  z-index: 5;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: 1fr;
  transition: 1s 0.7s ease-in-out;
}
.form-warp form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  /* 将两个 form 布局在 grid 同一位置 */
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  transition: all 0.2s 0.7s;
  opacity: 1;
  z-index: 4;
}
.form-title {
  color: #6266f5;
}
.form-warp .sign-up-form {
  opacity: 0;
  z-index: 3;
}
.container1.sign-up-mode .form-warp {
  left: 25%;
}
.container1.sign-up-mode .sign-in-form {
  opacity: 0;
  z-index: 3;
}
.container1.sign-up-mode .sign-up-form {
  opacity: 1;
  z-index: 4;
}
input,
.submit-btn {
  min-width: 300px;
  outline: none;
  padding: 12px 30px;
  line-height: 1;
  font-size: 16px;
  border-radius: 60px;
  color: #333;
  background-color: #6267f513;
  border: none;
  transition: all 0.2s;
}
input::placeholder {
  color: #cccc;
}

.submit-btn:hover {
  box-shadow: rgba(0, 0, 0, 0.15) 0 3px 9px 0;
  transform: translateY(-2px);
}

.submit-btn {
  background-color: #6266f5;
  color: #fff;
  text-align: center;
  min-width: 150px;
  font-size: initial;
  font-weight: bold;
  letter-spacing: 1.5px;
  cursor: pointer;
}

.desc-warp {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.desc-warp-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  text-align: center;
  padding: 3rem 17% 2rem 12%;
  z-index: 6;
}
/* 事件穿透 BEGIN */
.sign-in-desc {
  pointer-events: none;
}
.sign-up-mode .sign-in-desc {
  pointer-events: all;
}
.sign-up-mode .sign-up-desc {
  pointer-events: none;
}
/* 事件穿透 END */
.content {
  width: 100%;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}
.sign-in-desc img,
.sign-in-desc .content {
  transform: translateX(800px);
}
.sign-up-mode .sign-in-desc img,
.sign-up-mode .sign-in-desc .content {
  transform: translateX(0);
}

.sign-up-mode .sign-up-desc img,
.sign-up-mode .sign-up-desc .content {
  transform: translateX(-800px);
}

button {
  outline: none;
  padding: 6px 8px;
  min-width: 100px;
  text-align: center;
  border-radius: 30px;
  border: 2px solid #fff;
  background: none;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}
button:active {
  background: rgba(255, 255, 255, 0.1);
}
img {
  width: 100%;
  display: block;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.5s;
}

/* 响应式 */
@media screen and (max-width: 870px) {
  .container1::before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }
  .container1.sign-up-mode::before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }
  .form-warp {
    width: 100%;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }
  .container1.sign-up-mode .form-warp {
    top: 25%;
    left: 50%;
    transform: translate(-50%, 0);
  }
  img {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.7s;
  }
  .desc-warp {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }
  .desc-warp-item {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }
  .sign-in-desc {
    grid-row: 3 / 4;
  }

  .sign-in-desc img,
  .sign-in-desc .content {
    transform: translateY(800px);
  }

  .sign-up-mode .sign-in-desc img,
  .sign-up-mode .sign-in-desc .content {
    transform: translateY(0);
  }

  .sign-up-mode .sign-up-desc img,
  .sign-up-mode .sign-up-desc .content {
    transform: translateY(-800px);
  }
}

@media screen and (max-width: 570px) {
  .container1::before {
    bottom: 72%;
    left: 50%;
  }
  img {
    display: none;
  }
}
.logo {
  border-bottom: 2px solid #fff;
  cursor: pointer;
  color: #6266f5;
}
.logo:hover {
  border-bottom: 2px solid #6266f5;
}
</style>