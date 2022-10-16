/*
 * @Author: yifeng
 * @Date: 2022-10-13 21:20:04
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-13 21:20:04
 * @Description: 
 */
import { useTypes } from "@fast-crud/fast-crud";
import { App } from "vue";
import types from "./types";

//兼容旧版本
export default {
  install(app:App<Element>, options) {
    const newTypes = types();
    const { addTypes } = useTypes();
    addTypes(newTypes);
  }
};