/*
 * @Author: yifeng
 * @Date: 2022-09-18 10:16:27
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-18 10:28:03
 * @Description: 
 */

import FastCrud from "@/plugins/fast-crud";

function install(app, options: any = {}) {
    app.use(FastCrud,options);
}

export default {
    install
}