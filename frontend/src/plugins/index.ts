/*
 * @Author: yifeng
 * @Date: 2022-09-18 10:16:27
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-07 18:23:43
 * @Description: 
 */
import "@/plugins/system/iconify";
// import "@/plugins/iconfont";
import FastCrud from "@/plugins/system/fast-crud";

// 功能插件
import pluginApi from '@/plugins/system/api'
import pluginError from '@/plugins/system/error'
import pluginLog from '@/plugins/system/log'
// import pluginOpen from '@/plugins/system/open'

function install(app, options: any = {}) {

    // app.use(pluginApi)
    // app.use(pluginOpen)
    app.use(pluginError)
    app.use(pluginLog)
    app.use(FastCrud,options);
  
}

export default {
    install
}