/*
 * @Author: yifeng
 * @Date: 2022-09-11 13:54:05
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-07 17:31:53
 * @Description: 
 */
import { getSysSettingInitInfo } from '@/apis/system'
import { defineStore } from 'pinia'
import useDbStore from './system-db'

const useSettingStore = defineStore('system/setting', {
    state: () => ({
        systemInfo: {} as any
    }),
    actions: {
        /**
         * @description 获取配置
         * @param {Object} state state
         * @param {String} key active
         * @param {Object} value active
         */
        async get(key: string | number) {
            return this.systemInfo[key]
        },
        /**
         * @description 赋值系统配置
         * @param {Object} state state
         * @param {Object} value active
         */
        async set(value: any) {
            this.systemInfo = value
            // this.keepRecord = value['login.keep_record']
            return this.systemInfo
        },
        /**
         * @description 请求最新配置
         * @param {Object} context
         */
        async init() {
            const dbStore = useDbStore()
            // 请求配置
            getSysSettingInitInfo().then((res) => {
                // 赋值
                dbStore.set({
                    dbName: 'sys',
                    path: 'settings.init',
                    value: res.data,
                    user: true
                })
                this.load()
            })
        },
        /**
         * @description 本地加载配置
         * @param {Object} context
         */
        async load() {
            const dbStore = useDbStore()
            // store 赋值
            const data = await dbStore.get({
                dbName: 'sys',
                path: 'settings.init',
                defaultValue: {},
                user: true
            })
            this.set(data)
        }
    },

})

export default useSettingStore;