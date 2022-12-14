/*
 * @Author: yifeng
 * @Date: 2022-09-14 21:09:58
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-10 19:27:04
 * @Description: 
 */

import axiosInstance from "@/utils/net/axiosInstance"
import { roleBaseUrl } from "./role"
const menuBaseUrl = "/api/system/menu/"

// 获取路由接口 
export function getWebRouter() {
  // return axiosInstance.get("/api/system/menu/web_router/")
  return axiosInstance({
    url: menuBaseUrl + 'web_router/',
    method: 'get',
  })
}

/**
 * 列表查询
 */
export function getMenuList(query: any) {
  query.limit = 999
  return axiosInstance({
    url: menuBaseUrl,
    method: 'get',
    params: { ...query, limit: 999 }
  }).then(res => {
    // 将列表数据转换为树形数据
    // res.data.data = XEUtils.toArrayTree(res.data.data, { parentKey: 'parent', strict: false })
    return res
  })
}

/**
 * 新增
 */
export function createMenu(obj: any) {
  return axiosInstance({
    url: menuBaseUrl,
    method: 'post',
    data: obj
  })
}

/**
 * 修改
 */
export function updateMenu(obj: any) {
  return axiosInstance({
    url: menuBaseUrl + obj.id + '/',
    method: 'put',
    data: obj
  })
}

/**
 * 删除
 */
export function deleteMenu(id: string) {
  return axiosInstance({
    url: menuBaseUrl + id + '/',
    method: 'delete',
    data: { id }
  })
}

// 通过角色id,获取菜单数据
export async function getMenuDataByRoleId(obj) {
  const res = await axiosInstance({
    url: roleBaseUrl + obj.id + '/roleId_get_menu/',
    method: 'get',
    params: {}
  })
  return res.data.data
}