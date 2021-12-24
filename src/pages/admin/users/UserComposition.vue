<template>
  <Container>
    <template slot>
      <SubHeader>
        <template v-slot>用户组成</template>
      </SubHeader>
      <div
        id="myChart1"
        ref="myChart1"
        style="width: 700px; height: 400px; margin-top: 20px"
      ></div>
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
      data: [
        { value: 1, name: '管理员' },
        { value: 5, name: '商家' },
        { value: 8, name: '客户' }
      ]
    }
  },
  created() {
    request.get('/user/role/count').then((res) => {
      this.data[0].value = res.admin
      this.data[1].value = res.shop
      this.data[2].value = res.user
    })
    this.getNode()
  },
  methods: {
    getNode() {
      setTimeout(() => {
        let res = document.getElementById('myChart1')
        this.drawChart(res)
      }, 100)
    },
    drawChart(value) {
      //然后异步执行echarts的初始化函数
      let myChart1 = this.$echarts.init(value)
      // let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      // 指定图表的配置项和数据
      let option1 = {
        title: {
          text: '用户角色组成',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: this.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option1)
      // myChart2.setOption(option2)
    }
  }
}
</script>

<style scoped>
</style>