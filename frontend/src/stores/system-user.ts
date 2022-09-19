/*
 * @Author: yifeng
 * @Date: 2022-09-11 13:54:12
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-19 22:18:34
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

// export default {
//     namespaced: true,
//     state: {
//       // 用户信息
//       info: {}
//     },
//     actions: {
//       /**
//        * @description 设置用户数据
//        * @param {Object} context
//        * @param {*} info info
//        */
//       async set ({ state, dispatch }, info) {
//         // store 赋值
//         state.info = info
//         // 持久化
//         await dispatch('system/db/set', {
//           dbName: 'sys',
//           path: 'user.info',
//           value: info,
//           user: true
//         }, { root: true })
//       },
//       /**
//        * @description 从数据库取用户数据
//        * @param {Object} context
//        */
//       async load ({ state, dispatch }) {
//         // store 赋值
//         state.info = await dispatch('system/db/get', {
//           dbName: 'sys',
//           path: 'user.info',
//           defaultValue: {},
//           user: true
//         }, { root: true })
//       }
//     }
//   }