/*
 * @Author: yifeng
 * @Date: 2022-09-14 21:09:58
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-20 20:08:37
 * @Description: 
 */
import axiosInstance from '@/utils/axiosInstance'

const userBaseUrl = "/api/system/user/";

export function getUserList(query: any) {
  return axiosInstance({
    url: userBaseUrl,
    method: "get",
    data:{...query}
  });
}

export function addUser(obj: any) {
  return axiosInstance({
    url: userBaseUrl,
    method: "post",
    data: obj
  });
}

export function updateUser(obj:any) {
  return axiosInstance({
    url: userBaseUrl + obj.id + '/',
    method: "put",
    data: obj
  });
}

export function deleteUser(id: string) {
  return axiosInstance({
    url: userBaseUrl + id + '/',
    method: "delete",
    params: { id }
  });
}

export function batchDeleteUser (keys: any) {
    return axiosInstance({
      url: userBaseUrl + 'multiple_delete/',
      method: 'delete',
      data: { keys }
    })
  }

export function getUser(id: string) {
  return axiosInstance({
    url: userBaseUrl + id + '/',
    method: "get",
    params: { id }
  });
}

/**
 * 重置密码
 * @param obj
 * @returns {*}
 * @constructor
 */
 export function resetPassword (obj: { id: string; }) {
    return axiosInstance({
      url: userBaseUrl + obj.id + '/reset_password/',
      method: 'put',
      data: obj
    })
  }