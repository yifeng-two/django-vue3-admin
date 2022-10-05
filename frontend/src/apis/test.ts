/*
 * @Author: yifeng
 * @Date: 2022-09-06 22:55:03
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-28 22:34:01
 * @Description: 
 */
import axiosInstance from '@/utils/net/axiosInstance'

export const getImages = () => {
    // return axiosInstance.get(`/api/showImage`)
    return axiosInstance({
        url: "/api/showImage",
        method: 'get',
    })
}
