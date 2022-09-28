/*
 * @Author: yifeng
 * @Date: 2022-09-11 13:54:12
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-20 19:43:37
 * @Description: 
 */
import { defineStore } from "pinia";
import useDbStore from "./system-db";

const useUserStore = defineStore('system/user', {
  state: () => ({
    // 用户信息
    info: {}
  }),
  actions: {

    /**
     * @description 设置用户数据
     * @param {Object} context
     * @param {*} info info
     */
    async set(info: any) {
      // store 赋值
      this.info = info
      // 持久化
      await useDbStore().set({
        dbName: 'sys',
        path: 'user.info',
        value: info,
        user: true
      })
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} context
     */
    async load() {
      // store 赋值
      this.info = await useDbStore().get({
        dbName: 'sys',
        path: 'user.info',
        defaultValue: {},
        user: true
      })
    }
  }
})

export default useUserStore;

