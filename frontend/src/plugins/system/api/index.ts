import api from '@/apis'

// export default {
//   install (Vue) {
//     Vue.prototype.$api = api
//   }
// }

function install(app, options: any = {}) {
  app.config.globalProperties.$api = api;

}

export default {
  install
}