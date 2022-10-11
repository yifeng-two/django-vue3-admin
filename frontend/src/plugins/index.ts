/*
 * @Author: yifeng
 * @Date: 2022-09-18 10:16:27
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-09 21:23:04
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

import pluginPermission from '@/plugins/permission'
import { App } from "vue";

function install(app: App<Element>, options: any = {}) {

    app.use(pluginPermission,options)
    // app.use(pluginApi)
    // app.use(pluginOpen)
    app.use(pluginError,options)
    app.use(pluginLog,options)
    app.use(FastCrud,options);
  
}

export default {
    install
}