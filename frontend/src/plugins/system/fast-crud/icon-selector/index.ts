/*
 * @Author: yifeng
 * @Date: 2022-10-12 20:57:18
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-16 13:19:11
 * @Description: 
 */
import FsExtendsType from "./type";
export * from "./type";
import { utils } from "@fast-crud/fast-crud";
import { App } from "vue";
const asyncModules = import.meta.glob("./components/*.vue");
const asyncModules2 = import.meta.glob("./components/*.tsx");
const FsExtendsComponents = {
  install(app:App<Element>) {
    //加载异步组件，异步组件将会被懒加载，所以不用担心打包之后的体积问题
    utils.vite.installAsyncComponents(app, asyncModules, []);
    utils.vite.installAsyncComponents(app, asyncModules2, []);
  }
};

export const FsExtendsIconSelect = {
  install(app:App<Element>, options) {
    app.use(FsExtendsType, options);
    app.use(FsExtendsComponents);
  }
};