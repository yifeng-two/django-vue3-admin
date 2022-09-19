const { defineConfig } = require('@vue/cli-service')

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack: {
    resolve: {
      fallback: { 
        path: require.resolve("path-browserify") ,
        fs: false
      },
    },
  },

})
