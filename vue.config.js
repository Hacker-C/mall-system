// 跨域配置
module.exports = {
  devServer: {      //记住，别写错了devServer
    // 设置本地默认端口  选填
    // port: 8080,
    // 设置代理，必须填
    proxy: {
      // 设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
      '/api': {
        // 代理的目标地址
        target: 'http://localhost:8081',
        // target: 'http://119.23.46.102:9090',
        // 是否设置同源，输入是的
        changeOrigin: true,
        // 路径重写
        pathRewrite: {
          // 选择忽略拦截器里面的单词
          '/api': ''
        }
      }
    }
  }
}


