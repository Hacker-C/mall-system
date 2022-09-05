<template>
  <div class="container">
    <div style="display: flex">
      <a href="/" class="logo=l">
        <img src="../assets/upload/logo.svg" alt="" class="logo" />
      </a>
      <span class="head">在线商城</span>
    </div>
    <div>
      <el-menu
        :default-active="path"
        class="mmm"
        mode="horizontal"
        @select="handleSelect"
        router
      >
        <el-menu-item style="flex: 1" index="/home">首页</el-menu-item>
        <el-menu-item index="/product_list">所有商品</el-menu-item>

        <el-menu-item
          index="/like"
          :offset="2"
          style="line-height: 38px; flex: 1"
        >
          <el-badge :value="likeCount" class="item" v-if="likeCount">
            收藏夹
          </el-badge>
          <div v-else class="item2">收藏夹</div>
        </el-menu-item>
        <el-menu-item index="/cart" style="line-height: 38px; flex: 1">
          <el-badge :value="cartCount" class="item" v-if="cartCount">
            购物车
          </el-badge>
          <div v-else class="item2">购物车</div>
        </el-menu-item>
        <el-menu-item index="/order" style="line-height: 38px; flex: 1">
          <el-badge :value="orderCount" class="item" v-if="orderCount">
            我的订单
          </el-badge>
          <div v-else class="item2">我的订单</div>
        </el-menu-item>
        <el-menu-item index="/profile" style="flex: 1">我的</el-menu-item>
        <el-submenu index="" style="flex: 1">
          <template slot="title">更多</template>
          <el-menu-item index="/about">关于本网站</el-menu-item>
          <el-menu-item index="/notice">网站公告</el-menu-item>
          <el-menu-item index="/shop/register">
            <el-link>注册成为商家</el-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div>
      <div
        v-if="!this.$route.query.key"
        style="text-align: center; display: flex"
      >
        <el-input
          v-model="search"
          placeholder="请输入搜索内容"
          suffix-icon="el-icon-search"
          style="margin-top: 13px; width: 80%"
          size="small"
        ></el-input>
        <div style="margin-left: 5px; width: 18%">
          <el-button class="search-btn" size="small" @click="toSearch"
            >搜索</el-button
          >
        </div>
      </div>
    </div>
    <div>
      <el-button
        @click="toLogin"
        v-if="!isLogin"
        size="small"
        style="margin-top: 13px"
        type="primary"
        >登录</el-button
      >
      <el-button
        @click="logout"
        plain
        v-else
        size="small"
        style="margin-top: 13px"
      >
        注销
      </el-button>
    </div>
    <div style="display: flex; align-items: center; justify-content: end">
      <a
        href="javascript:;"
        style="display: block"
        v-if="isLogin"
        @click="toProfile"
      >
        <el-avatar size="large" class="avatar" :src="avatar"></el-avatar>
      </a>
      <div v-else>
        <el-avatar class="avatar" icon="el-icon-user-solid"></el-avatar>
      </div>
      <el-dropdown style="width: 100%; padding: 0">
        <span class="el-dropdown-link">
          {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="down">
          <a href="javascript:;" style="display: block" @click="toProfile">
            <el-dropdown-item> 个人信息 </el-dropdown-item>
          </a>
          <el-dropdown-item>
            <a href="javascript:;" @click="logout"> 退出 </a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
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
      this.search = ''
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
.container {
  display: grid;
  grid-template-columns: 2fr 5fr 5fr 1fr 2fr;
  grid-template-rows: 1fr;
  grid-column-gap: 5px;
  grid-row-gap: px;
  border-bottom: 1px solid #ccc;
}
.mmm {
  display: flex;
  width: 100%;
}

.el-dropdown-link {
  position: absolute;
  right: 20px;
  top: -10px;
  cursor: pointer;
  color: #409eff;
  font-size: 12px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.badge__content {
  position: absolute;
  left: 0;
}
.avatar {
  border: 1px solid #666;
  position: relative;
  left: 0px;
}
.space {
  width: 1px;
  height: 1px;
  color: transparent;
}
.logo {
  width: 40px;
  margin-left: 7px;
  margin-top: 10px;
  float: left;
  vertical-align: middle;
}
.head {
  position: relative;
  top: 20px;
  left: 8px;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
}
.search-btn {
  margin-top: 13px;
}
.down {
  position: relative;
  top: 10px;
}
</style>