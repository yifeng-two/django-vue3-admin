/*
 * @Author: yifeng
 * @Date: 2022-09-18 11:50:27
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-30 20:25:58
 * @Description: 
 */
import axiosInstance from '@/utils/net/axiosInstance'
import XEUtils from 'xe-utils';

const dictBaseUrl = "/api/system/dictionary/";

const dictInitUrl = "/api/init/dictionary/";

export function getInitDicts(query: any) {
    return axiosInstance({
        url: dictInitUrl,
        method: "get",
        params: query,
    })
}

export function getDictList(query:any) {
    return axiosInstance({
        url: dictBaseUrl,
        method: "get",
        params: query,
    }).then(res => {
        // 将列表数据转换为树形数据
        res.data.data = XEUtils.toArrayTree(res.data.data, {  parentKey: 'parent' })
        return res
    })
}

export function addDict(obj: any) {
    return axiosInstance({
        url: dictBaseUrl,
        method: "post",
        data: obj
    });
}

export function updateDict(obj: { id: string; }) {
    return axiosInstance({
        url: dictBaseUrl + obj.id + '/',
        method: "put",
        data: obj
    });
}

export function deleteDict(id: string) {
    return axiosInstance({
        url: dictBaseUrl + id + '/',
        method: "delete",
        params: { id }
    });
}

export function batchDeleteDict(keys: any) {
    return axiosInstance({
        url: dictBaseUrl + 'multiple_delete/',
        method: 'delete',
        data: { keys }
    })
}

export function getDict(id: string) {
    return axiosInstance({
        url: dictBaseUrl + id + '/',
        method: "get",
        params: { id }
    });
}