/*
 * @Author: yifeng
 * @Date: 2022-08-06 21:18:11
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-07 13:41:18
 * @Description: 
 */
import { createPinia } from "pinia";
import useAccountStore from "./system-account";
import useDictStore from "./system-dict";
import useMenuStore from "./system-menu";
import usePageStore from "./system-page";
import useSettingStore from "./system-setting";
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
// export default appStore;
function install(app, options: any = {}) {
  app.use(createPinia());
  const settingStore =useSettingStore()
  const accountStore = useAccountStore()
  console.log('store load dict,setting,and account start1111111111111111111111111111');
  settingStore.load()
  accountStore.load()
  console.log('store load dict,setting,and account1111111111111111111111111111');
}

export default {
  install
}


