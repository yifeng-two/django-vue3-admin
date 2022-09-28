/*
 * @Author: yifeng
 * @Date: 2022-09-13 21:52:00
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-25 13:41:33
 * @Description: 
 */
import { defineStore } from "pinia";
import { getDictList, getInitDicts } from '@/apis'
import useDbStore from "./system-db";

export const BUTTON_VALUE_TO_COLOR_MAPPING = {
    1: 'success',
    true: 'success',
    0: 'danger',
    false: 'danger',
    Search: 'warning', // 查询
    Update: 'primary', // 编辑
    Create: 'success', // 新增
    Retrieve: 'info', // 单例
    Delete: 'danger' // 删除
}

export function getButtonSettings(objectSettings: any[]) {
    return objectSettings.map(item => {
        return {
            label: item.label,
            value: item.value,
            color: item.color || BUTTON_VALUE_TO_COLOR_MAPPING[item.value]
        }
    })
}

const useDictStore = defineStore('system/dictionary', {
    state: () => ({
        dicts: {} as any// 字典值集合
    }),
    actions: {
        /**
         * @description 本地加载配置
         * @param {Object} context
         * @param {String} key
         */
        async init(key: string = 'all') {
            const query = { dictionary_key: key }
            // await getInitDicts(query).then((res: { data: { data: any[]; }; }) => {
            //     // store 赋值
            //     const newData: any = {}
            //     if (key === 'all') {
            //         res.data.data.map(data => {
            //             data.children.map((children: any) => {
            //                 switch (children.type) {
            //                     case 1:
            //                         children.value = Number(children.value)
            //                         break
            //                     case 6:
            //                         children.value = children.value === 'true'
            //                         break
            //                 }
            //             })
            //             newData[data.value] = getButtonSettings(data.children)
            //         })
            //         this.dicts = newData
            //         // 持久化
            //          useDbStore().set({
            //             dbName: 'sys',
            //             path: 'dicts',
            //             value: this.dicts,
            //             user: true
            //         })
            //     } else {
            //         this.dicts = res.data.data[key]
            //     }
            // })
            const res = await getInitDicts(query)
            // store 赋值
            const newData: any = {}
            if (key === 'all') {
                res.data.data.map(data => {
                    data.children.map((children: any) => {
                        switch (children.type) {
                            case 1:
                                children.value = Number(children.value)
                                break
                            case 6:
                                children.value = children.value === 'true'
                                break
                        }
                    })
                    newData[data.value] = getButtonSettings(data.children)
                })
                this.dicts = newData
                // 持久化
                 useDbStore().set({
                    dbName: 'sys',
                    path: 'dicts',
                    value: this.dicts,
                    user: false
                })
            } else {
                this.dicts = res.data.data[key]
            }
        },
        /**
         * @description 从数据库取用户数据
         * @param {Object} context
         */
        async load() {
            // store 赋值
            this.dicts = await useDbStore().get({
                dbName: 'sys',
                path: 'dicts',
                defaultValue: {},
                user: false
            })
        },
        /**
         * @description 设置配置
         * @param {Boolean} key active
         * @param {Boolean} value active
         */
        async set(key: string | number, value: any) {
            this.dicts[key] = value
        },
        /**
         * @description 获取配置
         * @param {Boolean} key active
         */
        async get(key: string | number) {
            return this.dicts[key]
        }
    }
})
export default useDictStore