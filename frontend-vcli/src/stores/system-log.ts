/*
 * @Author: yifeng
 * @Date: 2022-09-17 16:42:22
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-17 17:34:05
 * @Description: 
 */
import { defineStore } from "pinia";
import dayjs from 'dayjs'
import { get } from "lodash";
import cookies from "@/utils/common/cookies";
import useUserStore from "./system-user";


const useLogStore = defineStore('system/log', {
    state: () => ({
        // 错误日志
        // + 日志条目的属性
        //   - message 必须 日志信息
        //   - type 非必须 类型 success | warning | info(默认) | danger
        //   - time 必须 日志记录时间
        //   - meta 非必须 其它携带信息
        log: [] as any
    }),
    getters: {
        // doubleCount: (state) => state.counter * 2,
        /**
         * @description 返回现存 log (all) 的条数
         */
        length: (state) => {
            return state.log.length
        },
        /**
         * @description 返回现存 log (error) 的条数
         */
        lengthError: (state) => {
            return state.log.filter(log => log.type === 'danger').length
        }
    },
    actions: {
        /**
         * @description 添加一个日志
         * @param {Object} context
         * @param {String} param message {String} 信息
         * @param {String} param type {String} 类型
         * @param {Object} payload meta {Object} 附带的信息
         */
        push({ message, type = 'info', meta }) {
            const userStore = useUserStore()
            this.log.push({
                message,
                type,
                time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                meta: {
                    // 当前用户信息
                    user: userStore.info,
                    // 当前用户的 uuid
                    uuid: cookies.get('uuid'),
                    // 当前的 token
                    token: cookies.get('token'),
                    // 当前地址
                    url: get(window, 'location.href', ''),
                    // 用户设置
                    ...meta
                }
            })
        },
        /**
         * @description 清空日志
         * @param {Object} state state
         */
        clean() {
            // store 赋值
            this.log = []
        }
    }
})
export default useLogStore