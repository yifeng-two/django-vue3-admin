/*
 * @Author: yifeng
 * @Date: 2022-10-18 19:34:29
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-18 19:41:50
 * @Description: 
 */
import FsExtendsType from "./type";
import { App } from "vue";

export const FsExtendsAreaSelect = {
  install(app:App<Element>, options) {
    app.use(FsExtendsType, options);
  }
};