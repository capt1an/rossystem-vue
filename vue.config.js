//const { defineConfig } = require('@vue/cli-service')
//module.exports = defineConfig({
//  transpileDependencies: true,
//  lintOnSave:false//关闭eslint校验
//})
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint
  lintOnSave: false,
  // 配置代理跨域
  devServer: {
    proxy: {
      "/api/ros":{
        target: "http://localhost:8023",
      },
      "/api": {
        target: "http://localhost:8022",
      }
    },
    port: '8080',
    host: '0.0.0.0'
  }
})
