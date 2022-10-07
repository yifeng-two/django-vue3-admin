/*
 * @Author: yifeng
 * @Date: 2022-09-17 16:44:14
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-07 16:52:48
 * @Description: 
 */
import useLogStore from '@/stores/system-log'
import { ElMessage } from 'element-plus'
import Log from '../common/log.print'


/**
 * @description 安全地解析 json 字符串
 * @param {String} jsonString 需要解析的 json 字符串
 * @param {String} defaultValue 默认值
 */
export function parse (jsonString = '{}', defaultValue = {}) {
  let result = defaultValue
  try {
    result = JSON.parse(jsonString)
  } catch (error) {
    console.log(error)
  }
  return result
}

/**
 * @description 接口请求返回
 * @param {Any} data 返回值
 * @param {String} msg 状态信息
 * @param {Number} code 状态码
 */
export function response (data = {}, msg = '', code = 0) {
  return [
    200,
    { code, msg, data }
  ]
}

/**
 * @description 接口请求返回 正确返回
 * @param {Any} data 返回值
 * @param {String} msg 状态信息
 */
export function responseSuccess (data = {}, msg = '成功') {
  return response(data, msg)
}

/**
 * @description 接口请求返回 错误返回
 * @param {Any} data 返回值
 * @param {String} msg 状态信息
 * @param {Number} code 状态码
 */
export function responseError (data = {}, msg = '请求失败', code = 500) {
  return response(data, msg, code)
}

/**
 * @description 记录和显示错误
 * @param {Error} error 错误对象
 */
export function errorLog (error) {
  // 添加到日志
  const logStore = useLogStore()
  logStore.push( {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    Log.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }
  // 显示提示
  ElMessage.error({
    message: error.message,
    duration: 5 * 1000
  })
}

/**
 * @description 创建一个错误
 * @param {String} msg 错误信息
 */
export function errorCreate (msg) {
  const error = new Error(msg)
  errorLog(error)
  throw error
}

/**
 * @description 数据404消息提示
 * @param {String} msg 错误信息
 */
export function dataNotFound (msg) {
  // 显示提示
  ElMessage.info({
    message: msg,
    duration: 5 * 1000
  })
}

/**
 * @description 数据请求成功
 * @param {String} msg 成功信息
 */
export function successMsg (msg) {
    ElMessage.success({
    message: msg,
    duration: 5 * 1000
  })
}
