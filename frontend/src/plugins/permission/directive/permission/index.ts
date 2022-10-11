import { App } from 'vue'
import {permission} from './permission'
import permissionUtil from './util.permission'

const install = function (app: App<Element>, options: any = {}) {

  app.directive('permission', permission)
  app.config.globalProperties.hasPermissions = permissionUtil.hasPermissions
  //   if (window.Vue) {
  //   window.permission = permission
  //   app.use(install); // eslint-disable-line
  // }
}

export default {
  install
}

