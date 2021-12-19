<template>
  <div style="width: 70%; margin-left: 50%; transform: translate(-50%)">
    <h3 class="header">网站公告</h3>

    <el-row type="flex">
      <el-col :span="7" class="time">创建时间: {{ notice.createTime }}</el-col>
      <el-col :span="7" class="time">更新时间: {{ notice.updateTime }}</el-col>
    </el-row>
    <div class="notice-bd">
      <div class="notice-content">
        {{ notice.text }}
      </div>
    </div>
  </div>
</template>

<script>
import request from '../utils/request'
export default {
  data() {
    return {
      notice: {}
    }
  },
  created() {
    request.get('/notice').then((res) => {
      if (res.code === '0') {
        this.notice = Object.assign({}, res.data)
      }
    })
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
h3 {
  font-weight: 400;
}
.notice-bd {
  height: 300px;
  margin-top: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  border: 1px solid transparent;
}
.time {
  color: #666;
  font-size: 13px;
  margin-top: 5px;
}
.notice-content {
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
  font-style: italic;
}
</style>