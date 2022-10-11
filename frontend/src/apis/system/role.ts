/*
 * @Author: yifeng
 * @Date: 2022-09-20 22:15:59
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-10 20:09:38
 * @Description: 
 */
import axiosInstance from '@/utils/net/axiosInstance'

export const roleBaseUrl = '/api/system/role/'

export function getRoleList (query: any) {
  return axiosInstance({
    url: roleBaseUrl,
    method: 'get',
    params: { ...query }
  }).then(res=>{
    return res
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

export function updateRole (obj: any) {
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

// rolePermission
// export function getRoleList (query: any) {
//   return axiosInstance({
//     url: roleBaseUrl,
//     method: 'get',
//     params: { ...query }
//   }).then(res=>{
//     return res.data.data
//   })
// }
