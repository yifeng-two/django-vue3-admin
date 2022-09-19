/*
 * @Author: yifeng
 * @Date: 2022-09-14 21:09:58
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-19 19:53:12
 * @Description: 
 */
import axiosInstance from '@/utils/axiosInstance'

const menuBaseUrl = "/api/system/menu"

// 获取路由接口 
export function getWebRouter() {
    // return axiosInstance.get("/api/system/menu/web_router/")
    return axiosInstance({
        url: menuBaseUrl + '/web_router/',
        method: 'get',
    })
}
