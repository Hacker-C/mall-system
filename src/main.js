import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/base.css'
import './assets/css/all.css'
import 'default-passive-events'
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
