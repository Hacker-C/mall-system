<template>
  <div class="container">
    <footer>
      <div class="item">
        <h4>购物指南</h4>
        <ul>
          <li>购物流程</li>
          <li>会员介绍</li>
          <li>常见问题</li>
          <li>联系客服</li>
        </ul>
      </div>
      <div class="item">
        <h4>配送方式</h4>
        <ul>
          <li>送货到门</li>
          <li>配送服务</li>
          <li>收费标准</li>
          <li>海外配送</li>
        </ul>
      </div>
      <div class="item">
        <h4>支付方式</h4>
        <ul>
          <li>货到付款</li>
          <li>在线支付</li>
          <li>分期付款</li>
          <li>公司转账</li>
        </ul>
      </div>
      <div class="item">
        <h4>售后服务</h4>
        <ul>
          <li>售后政策</li>
          <li>退款说明</li>
          <li>价格保护</li>
          <li>取消订单</li>
        </ul>
      </div>
      <div class="item">
        <h4>关于本站</h4>
        <ul>
          <li>
            <el-link
              target="blank"
              href="https://github.com/Hacker-C/Mall-FrontEnd"
              >Github项目地址</el-link
            >
          </li>
          <li>
            <h4>小组成员</h4>
          </li>
          <li>组长：陈桂</li>
          <li>组员：唐承 李志贤</li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.container {
  border-top: 1px solid #ccc;
  background-color: #f4f4f4;
}
footer {
  height: 200px;
  width: 80%;
  margin-left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: space-around;
}
.item {
  margin-top: 30px;
}
h4 {
  color: #777777;
  margin-bottom: 10px;
}
li {
  list-style: none;
  font-size: 13px;
  color: #666666;
  margin: 8px;
}
</style>