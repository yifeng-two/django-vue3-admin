/*
 * @Author: yifeng
 * @Date: 2022-09-18 11:50:27
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-18 22:50:59
 * @Description: 
 */
import axiosInstance from '@/utils/axiosInstance'
import XEUtils from 'xe-utils';

const dictBaseUrl = "/api/system/dictionary/";

const dictInitUrl = "/api/init/dictionary/";

export function getInitDicts(query) {
    return axiosInstance({
        url: dictInitUrl,
        method: "get",
        data: { ...query }
    })
}

export function getDictList(query) {
    return axiosInstance({
        url: dictBaseUrl,
        method: "get",
        data: { ...query }
    }).then(res => {
        // 将列表数据转换为树形数据
        res.data.data = XEUtils.toArrayTree(res.data.data, { parentKey: 'parent' })
        return res
    })
}

export function addDict(obj) {
    return axiosInstance({
        url: dictBaseUrl,
        method: "post",
        data: obj
    });
}

export function updateDict(obj) {
    return axiosInstance({
        url: dictBaseUrl + obj.id + '/',
        method: "put",
        data: obj
    });
}

export function deleteDict(id) {
    return axiosInstance({
        url: dictBaseUrl + id + '/',
        method: "delete",
        params: { id }
    });
}

export function batchDeleteDict(keys) {
    return axiosInstance({
        url: dictBaseUrl + 'multiple_delete/',
        method: 'delete',
        data: { keys }
    })
}

export function getDict(id) {
    return axiosInstance({
        url: dictBaseUrl + id + '/',
        method: "get",
        params: { id }
    });
}