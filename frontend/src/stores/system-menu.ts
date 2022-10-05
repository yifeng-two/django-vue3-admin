/*
 * @Author: yifeng
 * @Date: 2022-09-11 13:53:57
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-04 13:00:49
 * @Description: 
 */

import { defineStore } from "pinia";
import setting from "@/setting"
import useDbStore from "./system-db";

const useMenuStore = defineStore('system/menu', {
    state: () => ({
        // 顶栏菜单
        header: [] as any[],
        // 侧栏菜单
        aside: [] as any[],
        // 侧边栏收缩
        asideCollapse: setting.menu.asideCollapse,
        // 侧边栏折叠动画
        asideTransition: setting.menu.asideTransition
    }),
    actions: {
        //设置侧边栏收缩
        async asideCollapseSet(collapse: boolean) {
            const dbStore = useDbStore()
            this.asideCollapse = collapse
            // 持久化
            await dbStore.set({
                dbName: 'sys',
                path: 'menu.asideCollapse',
                value: this.asideCollapse,
                user: true
            })

        },
        //切换侧边栏收缩
        async asideCollapseToggle() {
            const dbStore = useDbStore()
            this.asideCollapse = !this.asideCollapse
            // 持久化
            await dbStore.set({
                dbName: 'sys',
                path: 'menu.asideCollapse',
                value: this.asideCollapse,
                user: true
            })
        },
        /**
        * 持久化数据加载侧边栏设置
        * @param {Object} context
        */
        async asideLoad() {
            const dbStore = useDbStore()
            // store 赋值
            const menu = await dbStore.get({
                dbName: 'sys',
                path: 'menu',
                defaultValue: setting.menu,
                user: true
            })
            this.asideCollapse = menu.asideCollapse !== undefined ? menu.asideCollapse : setting.menu.asideCollapse
            this.asideTransition = menu.asideTransition !== undefined ? menu.asideTransition : setting.menu.asideTransition
        },
        /**
        * @description 设置顶栏菜单
        * @param {Object} state state
        * @param {Array} menu menu setting
        */
        headerSet(menu: any[]) {
            // store 赋值
            this.header = menu
        },
        /**
        * @description 设置侧边栏菜单
        * @param {Object} state state
        * @param {Array} menu menu setting
        */
        asideSet(menu: any[]) {
            // store 赋值
            this.aside = menu
        },
    }
})

export default useMenuStore;