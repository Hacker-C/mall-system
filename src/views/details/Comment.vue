<template>
  <div class="com-header">
    <el-avatar
      :size="50"
      :src="cDetailsComment.avatar"
      class="avatar"
    ></el-avatar>
    <span class="uname">{{ cDetailsComment.username }}</span>
    <span class="text">{{ cDetailsComment.commentText }}</span>
    <el-popconfirm
      title="确定删除订单吗？"
      @confirm="confirm"
      @cancel="cancel"
      placement="top"
    >
      <el-button
        v-show="username === cDetailsComment.username"
        size="mini"
        slot="reference"
        plain
        type="danger"
        >删 除</el-button
      >
    </el-popconfirm>
  </div>
</template>

<script>
import request from '../../utils/request'

export default {
  props: {
    cDetailsComment: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      username: ''
    }
  },
  created() {
    let uId = sessionStorage.getItem('userId')
    request.get('/user/' + uId).then((res) => {
      if (res.code === '0') {
        this.username = res.data.username
      }
    })
  },
  methods: {
    confirm() {
      let commentId = this.cDetailsComment.commentId
      request.delete('/comment/' + commentId).then((res) => {
        if (res.code === '0') {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
          this.$emit('reload', commentId)
        }
      })
    },
    cancel() {}
  }
}
</script>

<style scoped>
.com-header {
  height: 90px;
  border-bottom: 1px solid #ccc;
}
.avatar {
  position: relative;
  left: 10px;
  top: 20px;
  border: 1px solid #ccc;
}
.uname {
  position: relative;
  left: 20px;
  bottom: 20px;
}
.text {
  position: relative;
  right: 10px;
  top: 5px;
  color: #787a89;
  font-size: 13px;
}
</style>