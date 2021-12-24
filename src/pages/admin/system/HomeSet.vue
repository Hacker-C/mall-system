<template>
  <Container>
    <template slot>
      <SubHeader>
        <template v-slot>管理首页相关信息</template>
      </SubHeader>
      <h4 class="head">管理首页限时折扣模块</h4>
      <el-time-select
        v-model="value"
        :picker-options="{
          start: start,
          step: '00:15',
          end: end
        }"
        placeholder="选择时间"
      >
      </el-time-select>
      <el-button type="primary" style="margin-left: 10px" @click="submitTime"
        >提交</el-button
      >
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
      value: '',
      start: null,
      end: null
    }
  },
  created() {
    let timeArea = this.getTime()
    this.start = timeArea.start
    this.end = timeArea.end
    request.get('/countdown').then((res) => {
      this.value = res.data
    })
  },
  methods: {
    submitTime() {
      // console.log(this.value)
      let date = new Date()
      let [y, m, d] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
      if (y < 10) y = '0' + y
      if (m < 10) m = '0' + m
      if (d < 10) d = '0' + d
      let req = `${y}-${m}-${d} ` + this.value + ':00'
      // console.log(req)
      request.patch('/countdown/' + req).then((res) => {
        if (res.code === '0') {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
        }
      })
    },
    getTime() {
      let date = new Date()
      let h = date.getHours()
      let m = date.getMinutes()
      if (h < 10) {
        h = '0' + h
      }
      if (m <= 30) {
        m = 30
      }
      if (m > 30) {
        h = Number(h) + 1
        m = 0
      }
      if (m < 10) {
        m = '0' + m
      }
      let res = {}
      res.start = h + ':' + m
      res.end = '23:59'
      return res
    }
  }
}
</script>

<style scoped>
.head {
  font-weight: 400;
  height: 40px;
  line-height: 40px;
}
</style>