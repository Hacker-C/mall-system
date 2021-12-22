<template>
  <div style="width: 70%; margin-left: 50%; transform: translate(-50%)">
    <h3 class="header">我的账号中心</h3>
    <div v-if="isLogin">
      <div class="sub-header">
        <h4><i class="far fa-id-card"></i> 个人基本信息</h4>
        <div>
          <el-button size="mini" style="margin-left: 10px" @click="addUser"
            >修改信息</el-button
          >
        </div>
      </div>
      <el-descriptions
        direction="vertical"
        style="margin-top: 10px"
        :column="3"
        border
      >
        <el-descriptions-item>
          <template slot="label">
            <i class="far fa-user-circle"></i> 用户名
          </template>
          {{ user.username }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="fas fa-mobile-alt"></i>
            手机号
          </template>
          {{ user.telephone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="fas fa-map-marker-alt"></i>
            住址
          </template>
          {{ user.address }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 性别 </template>
          {{ user.sex }}
        </el-descriptions-item>
        <el-descriptions-item label="年龄">{{ user.age }}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{
          user.realName
        }}</el-descriptions-item>
        <el-descriptions-item label="电子邮件">{{
          user.email
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
      <div class="sub-header">
        <h4><i class="fas fa-user-shield"></i> 账户安全</h4>
      </div>
      <el-descriptions
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

            <el-button
              size="mini"
              style="position: absolute; right: 0"
              @click="toRecharge"
              >充值金额</el-button
            >
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="密码安全" :span="1">
          <el-button size="mini">修改密码</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="身份角色">
          <el-tag size="medium">{{ roleText }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <div v-else style="color: #909399">请先登录（注册后登录即可成为会员）</div>

    <!-- 添加信息弹出 -->
    <el-dialog
      title="填入个人信息"
      :visible.sync="dialogFormVisible"
      append-to-body
    >
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="用户名" style="margin-bottom: 7px">
          <el-input v-model="form.username" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="手机号" style="margin-bottom: 7px">
          <el-input v-model="form.telephone" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="住址" style="margin-bottom: 7px">
          <el-input v-model="form.address" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="性别" style="margin-bottom: 7px">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" style="margin-bottom: 7px">
          <el-input v-model="form.age" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="姓名" style="margin-bottom: 7px">
          <el-input v-model="form.realName" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="电子邮件" style="margin-bottom: 7px">
          <el-input v-model="form.email" style="width: 200px"></el-input>
        </el-form-item>
      </el-form>
      <el-button size="medium" @click="dialogFormVisible = false"
        >取 消</el-button
      >
      <el-button size="medium" type="primary" @click="save">确 定</el-button>
    </el-dialog>

    <!-- 客户充值 -->
    <el-dialog
      title="请输入充值金额"
      :visible.sync="dialogFormVisible2"
      append-to-body
    >
      <div class="money">账户当前余额: ￥{{ user.money }}</div>
      <el-form ref="form" :model="rechargeForm">
        <h4>请输入充值金额</h4>
        <el-form-item style="margin-bottom: 7px">
          <el-input
            v-model="rechargeForm.money"
            style="width: 100px"
            size="small"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button size="medium" @click="dialogFormVisible2 = false"
        >取 消</el-button
      >
      <el-button size="medium" type="primary" @click="recharge"
        >确 定</el-button
      >
    </el-dialog>
  </div>
</template>

<script>
import request from '../utils/request'
export default {
  data() {
    return {
      isLogin: sessionStorage.getItem('userId'),
      user: {},
      form: {},
      rechargeForm: {},
      dialogFormVisible: false,
      dialogFormVisible2: false,
      timer: null
    }
  },
  created() {
    this.load()
    if (this.$route.query.from == 'order') {
      this.dialogFormVisible2 = true
    }
    console.log()
  },
  methods: {
    toRecharge() {
      this.dialogFormVisible2 = true
      this.rechargeForm = {}
    },
    recharge() {
      this.rechargeForm.userId = this.user.userId
      console.log(this.rechargeForm)
      request.patch('/user/recharge', this.rechargeForm).then((res) => {
        if (res.code === '0') {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
          this.dialogFormVisible2 = false
          this.load()
        }
      })
    },
    addUser() {
      this.dialogFormVisible = true
    },
    save() {
      let userId = sessionStorage.getItem('userId')
      request
        .put('/user/' + userId, this.form)
        .then((res) => {
          if (res.code == '0') {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1000
            })
            clearTimeout(this.timer) //清除延迟执行
            this.timer = setTimeout(() => {
              //设置延迟执行
              this.load()
            }, 1000)
            this.dialogFormVisible = false
          } else {
            this.$message.error('登录失败！服务器出错！')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
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
              this.form = Object.assign({}, this.form, res.data)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  },
  computed: {
    statusText() {
      return this.user.status === 1 ? '正常' : '异常'
    },
    roleText() {
      if (this.user.role === 'admin') {
        return '管理员'
      }
      if (this.user.role === 'shop') {
        return '商家'
      }
      return '客户'
    }
  }
}
</script>

<style scoped>
.header {
  /* background-color: pink; */
  height: 50px;
  line-height: 60px;
  border-bottom: 1px dotted rgba(204, 204, 204, 0.5);
}
.sub-header {
  margin-top: 20px;
  display: flex;
}
h3,
h4 {
  font-weight: 400;
}
.money {
  margin-bottom: 20px;
}
</style>