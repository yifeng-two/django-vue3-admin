/*
 * @Author: yifeng
 * @Date: 2022-09-11 13:54:12
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-04 12:59:44
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
      const dbStore = useDbStore()
      // store 赋值
      this.info = info
      // 持久化
      await dbStore.set({
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
      const dbStore = useDbStore()
      // store 赋值
      this.info = await dbStore.get({
        dbName: 'sys',
        path: 'user.info',
        defaultValue: {},
        user: true
      })
    }
  }
})

export default useUserStore;

