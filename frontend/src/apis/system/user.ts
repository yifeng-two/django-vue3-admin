/*
 * @Author: yifeng
 * @Date: 2022-09-14 21:09:58
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-02 10:52:49
 * @Description: 
 */
import axiosInstance from '@/utils/net/axiosInstance'

const userBaseUrl = "/api/system/user/";

export function getUserList(query: any) {
  return axiosInstance({
    url: userBaseUrl,
    method: "get",
    data: { ...query }
  });
}

export function addUser(obj: any) {
  return axiosInstance({
    url: userBaseUrl,
    method: "post",
    data: obj
  });
}

export function updateUser(obj: any) {
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

export function batchDeleteUser(keys: any) {
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
export function resetPassword(obj: { id: string; }) {
  return axiosInstance({
    url: userBaseUrl + obj.id + '/reset_password/',
    method: 'put',
    data: obj
  })
}

/**
 * 重设密码
 * @param obj
 * @returns {*}
 * @constructor
 */
export function changePassword(id: string, params: any) {
  return axiosInstance({
    url: userBaseUrl + id + '/change_password/',
    method: 'put',
    data: params
  })
}

/**
 * 更新用户信息
 * @param obj
 * @returns {*}
 * @constructor
 */
 export function updateUserInfo( params: any) {
  return axiosInstance({
    url: userBaseUrl + 'update_user_info/',
    method: 'put',
    data: params
  })
}

/**
 * 获取用户信息
 * @param obj
 * @returns {*}
 * @constructor
 */
 export function getUserInfo( ) {
  return axiosInstance({
    url: userBaseUrl + 'user_info/',
    method: 'get',
    data: {}
  })
}