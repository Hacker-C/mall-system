<template>
  <div>
    <el-row>
      <h3 class="header">限时折扣</h3>
    </el-row>
    <el-row type="flex" class="discount-bd">
      <el-col :span="4" class="seckill">
        <h3>限时秒杀</h3>
        <img src="../../../assets/upload/seckill.png" alt="" />
        <p>距离本场结束还剩</p>
        <div class="time">
          <div>{{ hours }}</div>
          <div>{{ minutes }}</div>
          <div>{{ seconds }}</div>
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
const DiscountItem = () => import('./DiscountItem.vue')
export default {
  data() {
    return {
      count: '', //倒计时
      leftSeconds: 36000, // 10天的秒数
      hours: '',
      minutes: '',
      seconds: ''
    }
  },
  mounted() {
    this.Time() //调用定时器
  },
  methods: {
    // 天 时 分 秒 格式化函数
    countDown() {
      let h = parseInt((this.seconds / (60 * 60)) % 24)
      h = h < 10 ? '0' + h : h
      let m = parseInt((this.leftSeconds / 60) % 60)
      this.hours = h
      m = m < 10 ? '0' + m : m
      this.minutes = m
      let s = parseInt(this.leftSeconds % 60)
      s = s < 10 ? '0' + s : s
      this.seconds = s
      // this.count = d + '天' + h + '时' + m + '分' + s + '秒'
    },
    //定时器没过1秒参数减1
    Time() {
      setInterval(() => {
        this.leftSeconds -= 1
        this.countDown()
      }, 1000)
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
  margin-bottom: 100px;
  height: 240px;
}
.header {
  font-weight: 400;
  line-height: 40px;
  margin-top: 15px;
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
  text-align: calc();
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