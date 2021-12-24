<template>
  <el-row type="flex" class="line">
    <el-col :span="4">
      <a href="/">
        <img
          src="../assets/upload/logo.svg"
          alt=""
          style="height: 40px; width: 40px; margin-left: 7px; margin-top: 7px"
        />
      </a>
      <h3
        style="
          padding-left: 10px;
          display: inline-block;
          color: #409eff;
          position: absolute;
          bottom: 20px;
          font-size: 15px;
        "
      >
        在线商城
      </h3>
    </el-col>
    <el-col flex="1">
      <el-menu
        :default-active="path"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router
      >
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/product_list">所有商品</el-menu-item>
        <el-col
          v-if="!this.$route.query.key"
          :span="10"
          style="text-align: center"
        >
          <el-input
            v-model="search"
            placeholder="请输入搜索内容"
            suffix-icon="el-icon-search"
            style="width: 300px; margin-top: 13px"
            size="medium"
          ></el-input>
          <el-button size="medium" @click="toSearch" style="margin-left: 5px"
            >搜索</el-button
          >
        </el-col>
        <el-col v-else :span="10"><span class="space">.</span></el-col>
        <el-menu-item
          index="/like"
          class="el-menu-right"
          :offset="2"
          style="line-height: 38px"
        >
          <el-badge :value="likeCount" class="item" v-if="likeCount">
            收藏夹
          </el-badge>
          <div v-else class="item2">收藏夹</div>
        </el-menu-item>
        <el-menu-item
          index="/cart"
          class="el-menu-right"
          style="line-height: 38px"
        >
          <el-badge :value="cartCount" class="item" v-if="cartCount">
            购物车
          </el-badge>
          <div v-else class="item2">购物车</div>
        </el-menu-item>
        <el-menu-item
          index="/order"
          class="el-menu-right"
          style="line-height: 38px"
        >
          <el-badge
            :value="orderCount"
            class="item"
            style="height: 20px"
            v-if="orderCount"
          >
            我的订单
          </el-badge>
          <div v-else class="item2">我的订单</div>
        </el-menu-item>
        <el-menu-item index="/profile" class="el-menu-right">我的</el-menu-item>
        <el-submenu index="">
          <template slot="title">更多</template>
          <el-menu-item index="/about">关于本网站</el-menu-item>
          <el-menu-item index="/notice">网站公告</el-menu-item>
          <el-menu-item index="/shop/register">
            <el-link>注册成为商家</el-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="2">
      <el-button
        @click="toLogin"
        v-if="!isLogin"
        size="mini"
        style="margin-top: 15px"
        type="primary"
        >登录</el-button
      >
      <el-button
        @click="logout"
        plain
        v-else
        size="mini"
        style="margin-top: 16px"
      >
        注销
      </el-button>
    </el-col>
    <el-col :span="4" style="padding-right: 0; padding-top: 18px">
      <el-row type="flex">
        <el-col>
          <a
            href="javascript:;"
            style="display: block"
            v-if="isLogin"
            @click="toProfile"
          >
            <el-avatar size="large" class="avatar" :src="avatar"></el-avatar>
          </a>
          <el-avatar
            class="avatar"
            v-else
            icon="el-icon-user-solid"
          ></el-avatar>
        </el-col>
        <el-col>
          <el-dropdown style="width: 100%; padding: 0">
            <span class="el-dropdown-link">
              {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <a href="javascript:;" style="display: block" @click="toProfile">
                <el-dropdown-item> 个人信息 </el-dropdown-item>
              </a>
              <el-dropdown-item>
                <a href="javascript:;" @click="logout"> 退出 </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import request from '../utils/request'
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      search: '',
      path: this.$route.path,
      isLogin: false,
      cartCount: 0,
      likeCount: 0,
      orderCount: 0,
      username: '游客',
      avatar: ''
    }
  },
  methods: {
    toSearch() {
      this.$router.push({
        path: '/search',
        query: {
          key: this.search
        }
      })
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
    },
    toLogin() {
      this.$router.push('/login')
    },
    logout() {
      sessionStorage.clear()
      this.$router.push('/home')
      this.$message({
        message: '退出账号成功！',
        type: 'success',
        duration: 2000
      })
      // 触发父组件 Layout的 reloadHeader事件，刷新Header组件
      this.$emit('reloadHeader')
    },
    toProfile() {
      this.$router.push('/profile')
    }
  },
  created() {
    // 搜索
    this.search = this.$route.query.key
    let userId = sessionStorage.getItem('userId')
    this.isLogin = userId ? true : false
    if (userId) {
      request
        .get('/cart/count/' + userId)
        .then((res) => {
          this.cartCount = res
        })
        .catch((err) => {
          console.log(err)
        })
      request.get('/user/' + userId).then((res) => {
        this.username = res.data.username
        this.avatar = res.data.avatar
      })
      request.get('/order/count/' + userId).then((res) => {
        this.orderCount = res.data
      })
      request.get('like/count/' + userId).then((res) => {
        this.likeCount = res.data
      })
    }
  }
}
</script>

<style scoped>
.item {
  height: 20px;
}
.item2 {
  margin-top: 11px;
}
.line {
  border-bottom: 1px solid #ccc;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 12px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-menu-right {
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 12px;
}
.badge__content {
  position: absolute;
  left: 0;
}
.avatar {
  position: relative;
  bottom: 7px;
  border: 1px solid #ccc;
}
.space {
  width: 1px;
  height: 1px;
  color: transparent;
}
</style>