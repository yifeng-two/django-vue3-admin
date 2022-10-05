/*
 * @Author: yifeng
 * @Date: 2022-10-04 14:14:17
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-04 16:26:16
 * @Description: 
 */
import axiosInstance from '@/utils/net/axiosInstance'

export const sysConfigBaseUrl = '/api/system/system_config/'

export const sysSettingBaseUrl = '/api/init/settings/'

export function getSysSettingInitInfo() {
    return axiosInstance({
        url: sysSettingBaseUrl,
        method: 'get'
    })
}

export function getSysConfigList(query) {
    return axiosInstance({
        url: sysConfigBaseUrl,
        method: 'get',
        params: query
    })
}

export function saveContent( data) {
    return axiosInstance({
        url: sysConfigBaseUrl + 'save_content/',
        method: 'put',
        data: data
    })
}

export function createConfig(obj) {
    return axiosInstance({
        url: sysConfigBaseUrl,
        method: 'post',
        data: obj
    })
}

export function updateConfig(obj) {
    return axiosInstance({
        url: sysConfigBaseUrl + obj.id + '/',
        method: 'put',
        data: obj
    })
}

export function deleteConfig(id) {
    return axiosInstance({
        url: sysConfigBaseUrl + id + '/',
        method: 'delete',
        data: { id }
    })
}

/*
获取所有的model及字段信息
 */
export function getAssociationTable() {
    return axiosInstance({
        url: sysConfigBaseUrl + 'get_association_table/',
        method: 'get',
        params: {}
    })
}
