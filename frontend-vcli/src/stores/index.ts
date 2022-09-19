/*
 * @Author: yifeng
 * @Date: 2022-08-06 21:18:11
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-18 22:10:43
 * @Description: 
 */
import { createPinia } from "pinia";
import useAccountStore from "./system-account";
import useDictStore from "./system-dict";
import useMenuStore from "./system-menu";
import usePageStore from "./system-page";
import useUserStore from "./system-user";

interface IAppStore {
  userStore: ReturnType<typeof useUserStore>;
  menuStore: ReturnType<typeof useMenuStore>;
  accountStore: ReturnType<typeof useAccountStore>;
  pageStore: ReturnType<typeof usePageStore>;
}

const appStore: IAppStore = {} as IAppStore;

/**
 * 注册app状态库
 */
export const registerStore = () => {
  appStore.userStore = useUserStore();
  appStore.menuStore = useMenuStore();
  appStore.accountStore = useAccountStore();
  appStore.pageStore = usePageStore();

};

// function install(app, options: any = {}) {
//   app.use(createPinia());
//   const dictStore =useDictStore()
//   dictStore.load()
// }

// export default {
//   install
// }

// export default appStore;
