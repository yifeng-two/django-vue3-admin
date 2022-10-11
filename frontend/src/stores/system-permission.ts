/*
 * @Author: yifeng
 * @Date: 2022-10-09 20:10:32
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-09 20:36:22
 * @Description: 
 */
import { defineStore } from "pinia";
import useDbStore from "./system-db";

const usePermissionStore = defineStore('system/permission', {
  state: () => ({
    // 用户信息
    info: {}
  }),
  getters: {
    doubleCount: (state) => state.info,
  },

})

export default usePermissionStore;
