/*
 * @Author: yifeng
 * @Date: 2022-09-14 20:39:31
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-15 20:41:14
 * @Description: 
 */
import { defineStore } from "pinia";
import { get } from "lodash";
import setting from "@/setting"
import useDbStore from "./system-db";

const usePageStore = defineStore('system/page', {
    state: () => ({
        // 可以在多页 tab 模式下显示的页面
        pool: []as any[],
        // 当前显示的多页面列表
        opened: get(setting, 'page.opened', []),
        // 已经加载多标签页数据
        openedLoaded: false,
        // 当前页面
        current: '',
        // 需要缓存的页面 name
        keepAlive: []
    }),
    actions: {
        /**
         * @class pool
         * @description 保存 pool (候选池)
         * @param {Array} routes routes
         */
        init(routes) {
            const pool = [] as any[]
            const push = function (routes) {
                routes.forEach(route => {
                    if (route.children && route.children.length > 0) {
                        push(route.children)
                    } else {
                        if (!route.hidden) {
                            const { meta, name, path } = route
                            pool.push({ meta, name, path })
                        }
                    }
                })
            }
            push(routes)
            this.pool = pool
        }


    }
})

export default usePageStore;