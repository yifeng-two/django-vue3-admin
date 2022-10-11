import useLogStore from '@/stores/system-log'
import Log from '@/utils/common/log.print'
import { App } from 'vue'


function install(app:App<Element>, options: any = {}) {

  const logStore = useLogStore()
  // 快速打印 log
  app.config.globalProperties.$log = {
    ...Log,
    push(data: any) {
      if (typeof data === 'string') {
        // 如果传递来的数据是字符串
        // 赋值给 message 字段
        // 为了方便使用
        // eg: this.$log.push('foo text')
          logStore.push({
            message: data
          })
      } else if (typeof data === 'object') {
        // 如果传递来的数据是对象
        logStore.push(data)
      }
    }
  }

}

export default {
  install
}