/*
 * @Author: yifeng
 * @Date: 2022-09-30 20:21:20
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-30 20:26:26
 * @Description: 
 */
import axiosInstance from '@/utils/net/axiosInstance'

const menuButtonBaseUrl = "/api/system/menu_button/"


export function getMenuButtonList (query: any) {
  return axiosInstance({
    url: menuButtonBaseUrl,
    method: 'get',
    params: query
  })
}

export function addMenuButton (obj: any, id:string) {
  const data = { ...obj, menu: id }
  return axiosInstance({
    url: menuButtonBaseUrl,
    method: 'post',
    data: data
  })
}

export function updateMenuButton (obj: any) {
  return axiosInstance({
    url: menuButtonBaseUrl + obj.id + '/',
    method: 'put',
    data: obj
  })
}

export function deleteMenuButton (id: string) {
  return axiosInstance({
    url: menuButtonBaseUrl + id + '/',
    method: 'delete',
    data: { id }
  })
}