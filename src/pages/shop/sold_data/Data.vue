<template>
  <Container>
    <template v-slot>
      <SubHeader>
        <template v-slot>商品销售情况数据统计</template>
      </SubHeader>

      <!-- <el-button
      type="primary"
      style="margin-left: 10px"
      size="small"
      @click="refresh"
      >刷新</el-button
    > -->
      <div id="myChart1" style="width: 700px; height: 400px"></div>
      <div id="myChart2" style="width: 700px; height: 400px"></div>
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
  methods: {
    drawChart() {
      let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      // 指定图表的配置项和数据
      let option1 = {
        color: '#61a0a8',
        title: {
          show: true,
          text: '销售量统计',
          textStyle: {
            //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
            fontSize: 18,
            fontStyle: 'normal',
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '6%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            name: '商品',
            data: this.xAxisData,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '数量（件）'
          }
        ],
        series: [
          {
            name: '商品已售量',
            type: 'bar',
            barWidth: '60%',
            data: this.seriesData
          }
        ]
      }
      let option2 = {
        color: '#d48265',
        title: {
          show: true,
          text: '销售额统计',
          textStyle: {
            //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
            fontSize: 18,
            fontStyle: 'normal',
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '6%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            name: '商品',
            data: this.xAxisData2,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '营业额（元）'
          }
        ],
        series: [
          {
            name: '商品营业额',
            type: 'bar',
            barWidth: '60%',
            data: this.seriesData2
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option1)
      myChart2.setOption(option2)
    },
    async getShopId() {
      let uId = sessionStorage.getItem('userId')
      const res = await request.get('/user/shop_id/' + uId)
      return res
    },
    refresh() {
      this.load()
      this.$message({
        message: '刷新成功！',
        type: 'success',
        duration: 1000
      })
    },
    load() {
      this.getShopId().then((res) => {
        request
          .get('/product/shop_id/' + res)
          .then((res2) => {
            this.xAxisData = []
            this.seriesDta = []
            res2.data.forEach((p) => {
              this.xAxisData.push(p.productName)
              this.seriesData.push(p.sold)
              this.xAxisData2.push(p.productName)
              this.seriesData2.push(
                (p.sold * p.productPrice * p.discount).toFixed(2)
              )
            })
          })
          .then(() => {
            this.drawChart()
          })
      })
    }
  },
  data() {
    return {
      shopId: null,
      xAxisData: [],
      seriesData: [],
      xAxisData2: [],
      seriesData2: []
    }
  },
  created() {},
  mounted() {
    this.load()
  }
}
</script>

<style scoped>
#myChart1 {
  margin-bottom: 20px;
}
</style>