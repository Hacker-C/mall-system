<template>
  <div class="com-header">
    <el-avatar
      :size="60"
      :src="cDetailsComment.avatar"
      class="avatar"
    ></el-avatar>
    <span class="uname">{{ cDetailsComment.username }}</span>
    <span class="text">{{ cDetailsComment.commentText }}</span>
  </div>
</template>

<script>
export default {
  props: {
    cDetailsComment: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.com-header {
  height: 90px;
}
.avatar {
  position: relative;
  left: 10px;
  top: 20px;
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