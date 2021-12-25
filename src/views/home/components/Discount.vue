<template>
  <div>
    <h3 class="header">限时折扣</h3>
    <el-row type="flex" class="discount-bd">
      <el-col :span="4" class="seckill">
        <h3>限时秒杀</h3>
        <img src="../../../assets/upload/seckill.png" alt="" />
        <p>距离本场结束还剩</p>
        <div class="time">
          <div>{{ hour }}</div>
          <div>{{ minute }}</div>
          <div>{{ second }}</div>
        </div>
      </el-col>
      <el-col :span="4">
        <DiscountItem />
      </el-col>
      <el-col :span="4">
        <DiscountItem />
      </el-col>
      <el-col :span="4">
        <DiscountItem />
      </el-col>
      <el-col :span="4">
        <DiscountItem />
      </el-col>
      <el-col :span="4">
        <DiscountItem />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from '../../../utils/request'
const DiscountItem = () => import('./DiscountItem.vue')
export default {
  data() {
    return {
      inputTime: +new Date('2021-12-24 23:00:00'),
      hour: '',
      minute: '',
      second: '',
      timer: null
    }
  },
  created() {
    //调用定时器
    request.get('/countdown').then((res) => {
      this.inputTime = +new Date(res.data)
    })
    this.timer = setInterval(() => {
      this.countDown()
    }, 1000)
  },
  methods: {
    countDown() {
      var nowTime = +new Date() // 返回的是当前时间总的毫秒数
      var times = (this.inputTime - nowTime) / 1000 // times是剩余时间总的秒数
      var h = parseInt((times / 60 / 60) % 24) //时
      h = h < 10 ? '0' + h : h
      this.hour = h // 把剩余的小时给 小时黑色盒子
      var m = parseInt((times / 60) % 60) // 分
      m = m < 10 ? '0' + m : m
      this.minute = m
      var s = parseInt(times % 60) // 当前的秒
      s = s < 10 ? '0' + s : s
      this.second = s
    }
  },
  components: {
    DiscountItem
  }
}
</script>

<style scoped>
.discount-bd {
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
  height: 240px;
}
.header {
  font-weight: 400;
  height: 60px;
  line-height: 80px;
  color: 333;
}
.seckill {
  height: 240px;
  padding-top: 25px;
  text-align: center;
  background-color: #f02b2b;
}
.seckill img {
  margin-top: 20px;
  width: 30px;
}
.seckill h3 {
  font-weight: 400;
  color: #fff;
  font-size: 25px;
  margin-top: 10px;
}
.seckill p {
  font-size: 10px;
  color: #fff;
  margin-top: 10px;
}
.time {
  display: flex;
  margin-left: 50%;
  transform: translate(-50%);
  margin-top: 5px;
  width: 100px;
}
.time div {
  height: 30px;
  width: 30px;
  margin-left: 3px;
  background-color: #000;
  color: #fff;
  font-weight: 700;
  text-align: center;
  line-height: 30px;
}
.time::after {
  display: block;
  content: '';
  width: 100px;
  height: 1px;
  background-color: #f02b2b;
  position: absolute;
  top: 15px;
}
</style>