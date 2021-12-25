import axios from 'axios'
// import router from '../router/index'

const request = axios.create({
  baseURL: 'http://119.23.46.102:9090',
  // baseURL: 'http://localhost:8081',
  timeout: 5000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=utf-8';

  // config.headers['token'] = user.token;  // 设置请求头

  // *取出sessionStorage中的信息
  // const userJson = sessionStorage.getItem('user')
  // 若 sessionStorage 中没有 user，则强制返回登录页面
  // *在登录页面创建（created）时，要清除  sessionStorage
  /* 
  if (!userJson) {
    router.push('/login')
  }
  */

  return config
}, error => {
  return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
  response => {
    let res = response.data;
    // 如果是返回的文件
    if (response.config.responseType === 'blob') {
      return res
    }
    // 兼容服务端返回的字符串数据
    if (typeof res === 'string') {
      res = res ? JSON.parse(res) : res
    }
    return res;
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default request
