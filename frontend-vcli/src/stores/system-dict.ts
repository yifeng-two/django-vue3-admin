/*
 * @Author: yifeng
 * @Date: 2022-09-13 21:52:00
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-18 22:56:11
 * @Description: 
 */
import { defineStore } from "pinia";
import { getDictList, getInitDicts } from '@/apis'

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

export function getButtonSettings(objectSettings) {
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
        dicts: {} // 字典值集合
    }),
    actions: {
        /**
     * @description 本地加载配置
     * @param {Object} context
     * @param {String} key
     */
        async load(key: string = 'all') {
            const query = { dictionary_key: key }
            getDictList(query).then(async(res: { data: { data: any[]; }; }) => {
                // store 赋值
                const newData = {}
                if (key === 'all') {
                    res.data.data.map(data => {
                        data.children.map((children, index) => {
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
                } else {
                    this.dicts = res.data.data[key]
                }
            })
        },
        /**
         * @description 设置配置
         * @param {Boolean} key active
         * @param {Boolean} value active
         */
        async set(key, value) {
            this.dicts[key] = value
        },
        /**
         * @description 获取配置
         * @param {Boolean} key active
         */
        async get(key) {
            return this.dicts[key]
        }
    }
})
export default useDictStore