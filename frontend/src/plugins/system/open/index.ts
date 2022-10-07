import open from '@/utils/system/open'


function install(app, options: any = {}) {
  app.config.globalProperties.$open = open;

}

export default {
  install
}