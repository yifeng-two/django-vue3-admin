/*
 * @Author: yifeng
 * @Date: 2022-09-25 21:33:19
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-28 22:34:05
 * @Description: 
 */
import axiosInstance from '@/utils/net/axiosInstance'
import XEUtils from 'xe-utils';

const deptBaseUrl = "/api/system/dept/";

/**
 * 列表查询
 */
export function getDeptList (query: any) {
  // query.limit = 999;
  return axiosInstance({
    url: deptBaseUrl,
    method: 'get',
    params: query
  }).then(res => {
    // 将列表数据转换为树形数据
    res.data.data = XEUtils.toArrayTree(res.data.data, { parentKey: 'parent' })
    return res
})
}

/**
 * 新增
 */
export function createDept (obj: any) {
  return axiosInstance({
    url: deptBaseUrl,
    method: 'post',
    data: obj
  })
}

/**
 * 修改
 */
export function updateDept (obj: any) {
  return axiosInstance({
    url: deptBaseUrl + obj.id + '/',
    method: 'put',
    data: obj
  })
}

/**
 * 删除
 */
export function deleteDept (id: string) {
  return axiosInstance({
    url: deptBaseUrl + id + '/',
    method: 'delete',
    data: { id }
  })
}

/**
 * 部门懒加载
 */
export function deptLazyLoad (query: any) {
  return axiosInstance({
    url: '/api/system/dept_lazy_tree/',
    method: 'get',
    params: query
  })
}
