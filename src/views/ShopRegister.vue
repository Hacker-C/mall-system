<template>
  <div>
    <header class="hd">
      <img
        src="../assets/upload/logo.svg"
        width="30px"
        style="margin-left: 10px"
        alt=""
      />
      <h3 class="hd-item">
        <a href="javascript:;" @click="toHome"> 在线商城 </a>
      </h3>
      <div class="bb"></div>
      <h3 class="hd-item h2">欢迎注册成为商家</h3>
    </header>
    <div class="bd">
      <h3 class="bd-hd">店家账号注册</h3>
      <el-row type="flex">
        <el-col :span="8" :push="8">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="手机号">
              <el-input
                v-model="form.telephone"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input
                v-model="form.username"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
              <el-input
                v-model="form.realName"
                placeholder="请输入姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="店铺名称">
              <el-input
                v-model="form.shopName"
                placeholder="请输入店铺名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="设置密码">
              <el-input
                v-model="form.password"
                type="password"
                auto-complete="new-password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div style="text-align: center">
        <el-checkbox v-model="checked">我已阅读并同意 </el-checkbox>
        <el-link type="primary"> 《在线商城店家注册协议》 </el-link>
      </div>
      <div style="text-align: center; margin-top: 20px">
        <el-button type="success" @click="register">注册账号并开店</el-button>
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
      checked: false,
      timer: null
    }
  },
  methods: {
    toHome() {
      this.$router.push('/home')
    },
    warn(msg) {
      this.$message({
        message: msg,
        type: 'warning',
        duration: 2000
      })
    },
    register() {
      let shop = this.form
      if (typeof shop.telephone == 'undefined') {
        this.warn('请填写手机号!')
        return
      }
      if (typeof shop.username == 'undefined') {
        this.warn('用户名不能为空!')
        return
      }
      if (typeof shop.realName == 'undefined') {
        this.warn('请填写真实姓名!')
        return
      }
      if (typeof shop.shopName == 'undefined') {
        this.warn('请填写店铺名称!')
        return
      }
      if (typeof shop.password == 'undefined') {
        this.warn('请设置密码!')
        return
      }
      if (!/^[a-zA-Z0-9_]{4,16}$/.test(shop.username)) {
        this.warn('用户名4-16位, 且只能包含字母、数字、下划线!')
        return
      }
      if (!/^[\u4e00-\u9fa5]{2,6}$/.test(shop.realName)) {
        this.warn('姓名格式错误')
        return
      }
      if (!this.checked) {
        this.warn('请先勾选同意协议!')
        return
      }
      request
        .post('/user/shop/register', shop)
        .then((res) => {
          if (res.code === '0') {
            request.post('/shop', shop).then((res) => {
              if (res.code === '0') {
                this.$message({
                  message: res.msg,
                  type: 'success',
                  duration: 1000
                })
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                  this.$router.push('/login')
                }, 1000)
              } else {
                this.$message.error('注册失败！错误原因：服务器错误!')
              }
            })
          } else if (res.code === '1') {
            this.$message.error('登录失败！错误原因：' + res.msg)
          } else {
            this.$message.error('注册失败！错误原因：服务器错误!')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.hd {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 1px 1px rgba(204, 204, 204, 0.5);
  display: flex;
}

.hd-item {
  width: 100px;
  text-align: center;
  color: #262626;
}
.bb {
  height: 20px;
  width: 1px;
  background-color: #bfbfbf;
  position: relative;
  top: 15px;
}
.bd {
  width: 90%;
  margin-left: 50%;
  transform: translate(-50%);
  margin-top: 20px;
  height: 500px;
  margin-bottom: 50px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 20px;
}
.h2 {
  width: 180px;
}
.bd-hd {
  text-align: center;
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  color: #520000;
  font-weight: 400;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}
</style>