/*
 * @Author: yifeng
 * @Date: 2022-10-18 19:52:39
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-20 21:08:57
 * @Description: 
 */
import { axiosInstance } from "@/utils"

export const areaBaseUrl = "/api/system/area/";

export async function getAreaList(query: any) {
    if (query.pcode === undefined || query.pcode === null || query.pcode.length === 0) {
        query.level = 1
    }
    const res = await axiosInstance({
        url: areaBaseUrl,
        method: 'get',
        params: { ...query, limit: 100 }
    });
    // 将列表数据转换为树形数据
    res.data.data.map(value => {
        value.hasChildren = value.pcode_count !== 0;
    });
    return await res;
}

export function createArea(obj: any) {
    return axiosInstance({
        url: areaBaseUrl,
        method: 'post',
        data: obj
    })
}

export function updateArea(obj: any) {
    return axiosInstance({
        url: areaBaseUrl + obj.id + '/',
        method: 'put',
        data: obj
    })
}

export function deleteArea(id: string) {
    return axiosInstance({
        url: areaBaseUrl + id + '/',
        method: 'delete',
        data: { id }
    })
}

// lazy load
export async function getAreaListByLazy(query: any) {
    const ret = await axiosInstance({
        url: areaBaseUrl,
        method: 'get',
        params: query
    });
    return ret;

}