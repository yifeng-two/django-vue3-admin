/*
 * @Author: yifeng
 * @Date: 2022-10-16 21:30:53
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-16 21:34:34
 * @Description: 
 */
import axiosInstance from '@/utils/net/axiosInstance'

export const apiWhiteListBaseUrl = '/api/system/api_white_list/'

export function getApiWhiteList (query) {
  return axiosInstance({
    url: apiWhiteListBaseUrl,
    method: 'get',
    params: query
  })
}

export function createApiWhite (obj, id) {
  const data = { ...obj, menu: id }
  return axiosInstance({
    url: apiWhiteListBaseUrl,
    method: 'post',
    data: data
  })
}

export function updateApiWhite (obj) {
  return axiosInstance({
    url: apiWhiteListBaseUrl + obj.id + '/',
    method: 'put',
    data: obj
  })
}

export function deleteApiWhite (id) {
  return axiosInstance({
    url: apiWhiteListBaseUrl + id + '/',
    method: 'delete',
    data: { id }
  })
}