/*
 * @Author: yifeng
 * @Date: 2022-10-05 14:57:00
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-05 15:22:46
 * @Description: 
 */
import axiosInstance from '@/utils/net/axiosInstance'

export const sysLoginLogBaseUrl = '/api/system/login_log/'

export function getSystemLogList (query) {
  return axiosInstance({
    url: sysLoginLogBaseUrl,
    method: 'get',
    params: query
  })
}


// 系统操作日志
export const sysOperationLogBaseUrl = '/api/system/operation_log/'

export function getOperationLogList (query) {
  return axiosInstance({
    url: sysOperationLogBaseUrl,
    method: 'get',
    params: query
  })
}
export function addOperationLog (obj) {
  return axiosInstance({
    url: sysOperationLogBaseUrl,
    method: 'post',
    data: obj
  })
}

export function updateOperationLog (obj) {
  return axiosInstance({
    url: sysOperationLogBaseUrl + obj.id + '/',
    method: 'put',
    data: obj
  })
}
export function deleteOperationLog (id) {
  return axiosInstance({
    url: sysOperationLogBaseUrl + id + '/',
    method: 'delete',
    data: { id }
  })
}