// 跨域配置
module.exports = {
  devServer: {},
  configureWebpack: {
    resolve: {
      alias: {
        '@': '/src',
        assets: '@/assets',
        components: '@/components',
        views: '@/views'
      }
    }
  }
}
