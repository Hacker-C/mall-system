<template>
  <div class="container">
    <h4>编辑公告:</h4>
    <el-input
      type="textarea"
      :rows="6"
      style="width: 500px"
      placeholder="请输入内容"
      v-model="textarea"
    >
    </el-input>
    <el-row style="margin-top: 10px">
      <el-button style="width: 100px" @click="cancel">取消</el-button>
      <el-button style="width: 100px" type="primary" @click="save"
        >保存</el-button
      >
    </el-row>
  </div>
</template>

<script>
import request from '../../../utils/request'
export default {
  data() {
    return {
      textarea: ''
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      request
        .get('/notice')
        .then((res) => {
          if (res.code === '0') {
            this.textarea = res.data.text
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    cancel() {
      this.load()
    },
    save() {
      let notice = {}
      notice.text = this.textarea
      request.patch('/notice', notice).then((res) => {
        if (res.code === '0') {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
        }
      })
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 10px;
}
.container {
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>