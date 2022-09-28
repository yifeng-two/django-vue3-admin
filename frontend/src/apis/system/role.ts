/*
 * @Author: yifeng
 * @Date: 2022-09-20 22:15:59
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-20 22:18:25
 * @Description: 
 */
import axiosInstance from '@/utils/axiosInstance'

export const roleBaseUrl = '/api/system/role/'

export function getRoleList (query: any) {
  return axiosInstance({
    url: roleBaseUrl,
    method: 'get',
    params: { ...query }
  })
}

export function getRole (obj: { id: string }) {
  return axiosInstance({
    url: roleBaseUrl + obj.id + '/',
    method: 'get'
  })
}

export function createRole (obj: any) {
  return axiosInstance({
    url: roleBaseUrl,
    method: 'post',
    data: obj
  })
}

export function updateRole (obj: { id: string }) {
  return axiosInstance({
    url: roleBaseUrl + obj.id + '/',
    method: 'put',
    data: obj
  })
}

export function deleteRole (id: string) {
  return axiosInstance({
    url: roleBaseUrl + id + '/',
    method: 'delete',
    data: { id }
  })
}
