import { get, isObject } from 'lodash'
import Log from '@/utils/common/log.print'
import useLogStore from '@/stores/system-log'
import { nextTick } from 'vue'

function install(app, options: any = {}) {
  const logStore = useLogStore()
  function writeLog (logType: string) {
    return (error, vm, info = '') => {
      nextTick(() => {
        logStore.push({
          message: `${info}: ${isObject(error) ? error.message : error}`,
          type: logType,
          meta: {
            error,
            vm
          }
        })
        if (import.meta.env.NODE_ENV !== 'development') return
        Log.capsule('D2Admin', 'ErrorHandler', logType)
        Log.danger('>>>>>> 错误信息 >>>>>>')
        console.log(info)
        Log.danger('>>>>>> Vue 实例 >>>>>>')
        console.log(vm)
        Log.danger('>>>>>> Error >>>>>>')
        console.log(error)
      })
    }
  }
  if (import.meta.env.NODE_ENV === 'development') {
    app.config.warnHandler = writeLog('warning')
  }
  app.config.errorHandler = writeLog('danger')
  window.onunhandledrejection = error => {
    logStore.push({
      message: get(error, 'reason.message', 'Unknown error'),
      type: 'danger',
      meta: {
        error: get(error, 'reason'),
        trace: get(error, 'reason.stack')
      }
    })
  }
  window.onerror = (event, source, lineno, colno, error) => {
    logStore.push({
      message: get(error, 'message', 'Unknown error'),
      type: 'danger',
      meta: {
        error,
        trace: get(error, 'stack'),
        source: `${source}@${lineno}:${colno}`,
        event: event
      }
    })
  }
}


export default {
  install
}