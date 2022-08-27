/*
 * @Author: yifeng
 * @Date: 2022-07-17 17:01:36
 * @LastEditors: yifeng
 * @LastEditTime: 2022-08-24 21:46:56
 * @Description: 
 */
// appfront/src/api/api.js


import axios from 'axios';
import { AXIOS_BASE_URL } from '../configs';

const axiosInstance = axios.create({
    baseURL: AXIOS_BASE_URL, // 所有的请求地址前缀部分
    timeout: 60000, // 请求超时时间毫秒
    withCredentials: true, // 异步请求携带cookie
    // headers: {
    // 	// 设置后端需要的传参类型
    // 	'Content-Type': 'application/json',
    // 	'token': 'your token',
    // 	'X-Requested-With': 'XMLHttpRequest',
    // },
})

// 通过拦截器处理csrf问题，这里的正则和匹配下标可能需要根据实际情况小改动
axiosInstance.interceptors.request.use(
    config => {
        if (config && config.headers) { // 多一步判断
            config.headers['X-Requested-With'] = 'XMLHttpRequest'
            const regex = /.*csrftoken=([^;.]*).*$/
            const cookies = document.cookie.split('; ')
            const cookiesFilters = cookies.filter(v => {
                if (v.match(regex)) {
                    return v
                }
            })
            config.headers['X-CSRFToken'] = cookiesFilters[0].split('=')[1]
            // config.headers['X-CSRFToken'] = document.cookie.match(regex) === null ? null : document.cookie.match(regex)[1]
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default axiosInstance

// export default {
//     /**
//      * @param {String} url 
//      * @param {Object} data 
//      * @returns Promise
//      */
//     post(url, data) {
//         return new Promise((resolve, reject) => {
//             axiosInstance({
//                 method: 'post',
//                 url,
//                 data: qs.stringify(data),
//             })
//                 .then(res => {
//                     resolve(res.data)
//                 })
//                 .catch(err => {
//                     reject(err)
//                 });
//         })
//     },

//     get(url, data) {
//         return new Promise((resolve, reject) => {
//             axiosInstance({
//                 method: 'get',
//                 url,
//                 params: data,
//             })
//                 .then(res => {
//                     resolve(res.data)
//                 })
//                 .catch(err => {
//                     reject(err)
//                 })
//         })
//     }
// };
