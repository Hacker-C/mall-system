<template>
  <Container>
    <template slot>
      <SubHeader>
        <template v-slot>编辑公告</template>
      </SubHeader>
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
    </template>
  </Container>
</template>

<script>
import request from '../../../utils/request'
const SubHeader = () => import('../../components/SubHeader.vue')
const Container = () => import('../../components/Container.vue')

export default {
  components: {
    SubHeader,
    Container
  },
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
