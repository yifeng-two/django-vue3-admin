
import { App } from 'vue';
import permissionDirective from './directive/permission'

function install(app: App<Element>, options: any = {}) {
  
  const isEnabled = import.meta.env.VITE_APP_PM_ENABLED === 'true'
  // function isInited() {
  //   if (!isEnabled) {
  //     console.warn('PM is disabled')
  //     return true
  //   }
  //   return store.getters['permission/inited']
  // }

  // 开启权限模块
  if (isEnabled) {
    // 注册v-permission指令, 用于控制按钮权限
    app.use(permissionDirective)
    // console.log('PM is abled');

  }else{
    console.warn('PM is disabled')
  }
}

export default {
  install
}