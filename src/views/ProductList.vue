<template>
  <div style="width: 80%; margin-left: 50%; transform: translate(-50%)">
    <el-row type="flex" class="header">
      <el-col :span="8" style="line-height: 50px">
        <span class="nav-item">所有商品</span>
        <span class="nav-item">最新上架</span>
        <span class="nav-item">热销</span>
      </el-col>
      <el-col flex="1" style="line-height: 50px"></el-col>
      <el-col :span="10" style="line-height: 50px">
        <span>排序方式：</span>
        <el-dropdown>
          <span class="el-dropdown-link" style="cursor: pointer">
            {{ order }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <a
              href="javascript:;"
              @click="change('上架时间')"
              style="text-decoration: none; color: #333"
            >
              <el-dropdown-item>上架时间</el-dropdown-item>
            </a>
            <a
              href="javascript:;"
              @click="change('价格')"
              style="text-decoration: none; color: #333"
            >
              <el-dropdown-item>价格</el-dropdown-item>
            </a>
            <a
              href="javascript:;"
              @click="change('已售量')"
              style="text-decoration: none; color: #333"
            >
              <el-dropdown-item>已售量</el-dropdown-item>
            </a>
            <a
              href="javascript:;"
              @click="change('评价数')"
              style="text-decoration: none; color: #333"
            >
              <el-dropdown-item>评价数</el-dropdown-item>
            </a>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button size="small" class="order-btn" @click="reverse">{{
          rev
        }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: '上架时间',
      rev: '升序'
    }
  },
  methods: {
    change(s) {
      this.order = s
    },
    reverse() {
      this.rev = this.rev == '升序' ? '逆序' : '升序'
    }
  }
}
</script>

<style scoped>
.header {
  height: 50px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  margin-top: 50px;
}
.nav-item {
  color: #8f8f96;
  margin-left: 10px;
  cursor: pointer;
}
.nav-item:hover {
  color: #ff143c;
}
.order-btn {
  height: 20px;
  width: 40px;
  line-height: 0;
  padding-left: 8px;
  margin-left: 5px;
}
</style>