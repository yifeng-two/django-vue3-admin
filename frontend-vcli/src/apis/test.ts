/*
 * @Author: yifeng
 * @Date: 2022-09-06 22:55:03
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-14 23:18:09
 * @Description: 
 */
import axiosInstance from '@/utils/axiosInstance'

export const getImages = () => {
    // return axiosInstance.get(`/api/showImage`)
    return axiosInstance({
        url: "/api/showImage",
        method: 'get',
    })
}
