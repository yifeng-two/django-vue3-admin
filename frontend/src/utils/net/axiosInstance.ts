/*
 * @Author: yifeng
 * @Date: 2022-07-17 17:01:36
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-07 17:43:07
 * @Description: 
 */
// appfront/src/api/api.js


import { get } from 'lodash'
import axios, { AxiosInstance } from 'axios';
import qs from 'qs'
import { AXIOS_BASE_URL } from '../../configs';
// import Adapter from 'axios-mock-adapter'
import cookies from '../common/cookies';
import router from '@/router';
import { dataNotFound, errorCreate } from '../system/tools';


function getErrorMessage(msg: any) {
    if (typeof msg === 'string') {
        return msg
      }
      if (typeof msg === 'object') {
        if (msg.code === 'token_not_valid') {
          cookies.remove('token')
          cookies.remove('uuid')
          router.push({ path: '/login' })
          router.go(0)
          return '登录超时，请重新登录！'
        }
        if (msg.code === 'user_not_found') {
          cookies.remove('token')
         cookies.remove('uuid')
          router.push({ path: '/login' })
          router.go(0)
          return '用户无效，请重新登录！'
        }
        return Object.values(msg)
      }
      if (Object.prototype.toString.call(msg).slice(8, -1) === 'Array') {
        return msg
      }
      return msg
}

// export interface AxiosResponse<T = any> {
//   data: T; // 服务端返回的数据
//   status: number; // HTTP 状态码
//   statusText: string; // 状态消息
//   headers: any; // 响应头
//   config: AxiosRequestConfig; // 请求配置对象
//   request: any; // 请求的 XMLHttpRequest 对象实例
// }

// declare module 'axios' {
//     interface AxiosInstance {
//         (config: AxiosRequestConfig): Promise<any>
//     }
// }

function createAxiosService() {
    const axiosService = axios.create({
        baseURL: AXIOS_BASE_URL, // 所有的请求地址前缀部分
        timeout: 60000, // 请求超时时间毫秒
        withCredentials: true, // 异步请求携带cookie
        paramsSerializer: (params) => qs.stringify(params, { indices: false })
        // headers: {
        // 	// 设置后端需要的传参类型
        // 	'Content-Type': 'application/json',
        // 	'token': 'your token',
        // 	'X-Requested-With': 'XMLHttpRequest',
        // },
    })

    // 通过拦截器处理csrf问题，这里的正则和匹配下标可能需要根据实际情况小改动
    axiosService.interceptors.request.use(
        config => config,
        // config => {
        //     if (config && config.headers) { // 多一步判断
        //         config.headers['X-Requested-With'] = 'XMLHttpRequest'
        //         const regex = /.*csrftoken=([^;.]*).*$/
        //         const cookies = document.cookie.split('; ')
        //         const cookiesFilters = cookies.filter(v => {
        //             if (v.match(regex)) {
        //                 return v
        //             }
        //         })
        //         config.headers['X-CSRFToken'] = cookiesFilters[0].split('=')[1]
        //         // config.headers['X-CSRFToken'] = document.cookie.match(regex) === null ? null : document.cookie.match(regex)[1]
        //     }
        //     return config
        // },
        error => {
            return Promise.reject(error)
        }
    )

    axiosService.interceptors.response.use(
        response => {
            // return response.data
            // dataAxios 是 axios 返回数据中的 data
            let dataAxios = response.data
            if (response.headers['content-disposition']) {
                dataAxios = response
            }
            // 这个状态码是和后端约定的
            const { code } = dataAxios
            // 根据 code 进行判断
            if (code === undefined) {
                // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
                return dataAxios
            } else {
                // 有 code 代表这是一个后端接口 可以进行进一步的判断
                switch (code) {
                    case 2000:
                        // [ 示例 ] code === 2000 代表没有错误
                        // TODO 可能结果还需要code和msg进行后续处理，所以去掉.data返回全部结果
                        // return dataAxios.data
                        return dataAxios
                    case 401:
                        // TODO 置换token 未完善
                        cookies.remove('token')
                        cookies.remove('uuid')
                        cookies.remove('refresh')
                        router.push({ path: '/login' })
                        errorCreate(`${getErrorMessage(dataAxios.msg)}`)
                        break
                    case 404:
                        dataNotFound(`${dataAxios.msg}`)
                        break
                    case 4000:
                        // 删除cookie
                        errorCreate(`${getErrorMessage(dataAxios.msg)}`)
                        break
                    case 400:
                        errorCreate(`${dataAxios.msg}`)
                        break
                    default:
                        // 不是正确的 code
                        errorCreate(`${dataAxios.msg}: ${response.config.url}`)
                        break
                }
            }
        },
        error => {
            const status = get(error, 'response.status')
            switch (status) {
                case 400:
                    error.message = '请求错误'
                    break
                case 401:
                    refreshToken().then((res) => {
                        cookies.set('token', res.access)
                    }).catch((e: any) => {
                        router.push({ name: 'login' })
                        router.go(0)
                        error.message = '未认证，请登录'
                    })
                    break
                case 403:
                    error.message = '拒绝访问'
                    break
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`
                    break
                case 408:
                    error.message = '请求超时'
                    break
                case 500:
                    error.message = '服务器内部错误'
                    break
                case 501:
                    error.message = '服务未实现'
                    break
                case 502:
                    error.message = '网关错误'
                    break
                case 503:
                    error.message = '服务不可用'
                    break
                case 504:
                    error.message = '网关超时'
                    break
                case 505:
                    error.message = 'HTTP版本不受支持'
                    break
                default:
                    break
            }
            // errorLog(error)
            return Promise.reject(error)
        }
    )
    return axiosService
}

/**
 * @description 创建请求方法
 * @param {Object} axiosInstance axios 实例
 */
function createRequestFunction(axiosService: AxiosInstance) {
    // 校验是否为租户模式。租户模式把域名替换成 域名 加端口
    return function (config: any) {
        const token = cookies.get('token')
        // 进行布尔值兼容
        const params = get(config, 'params', {})
        for (const key of Object.keys(params)) {
            if (String(params[key]) === 'true') {
                params[key] = 1
            }
            if (String(params[key]) === 'false') {
                params[key] = 0
            }
        }
        const configDefault = {
            headers: {
                Authorization: 'JWT ' + token,
                'Content-Type': get(config, 'headers.Content-Type', 'application/json')
            },
            timeout: 60000,
            baseURL: AXIOS_BASE_URL,
            data: {},
            params: params
        }
        return axiosService(Object.assign(configDefault, config))
    }
}

export const axiosService = createAxiosService()
export const axiosInstance = createRequestFunction(axiosService)
export default axiosInstance

// 用于模拟网络请求的实例和请求方法
export const axiosServiceForMock = createAxiosService()
export const axiosInstanceForMock = createRequestFunction(axiosServiceForMock)

// 网络请求数据模拟工具
// export const mock = new Adapter(serviceForMock)

const refreshToken = function () {
    const refresh = cookies.get('refresh')
    return axiosInstance({
        url: 'token/refresh/',
        method: 'post',
        data: {
            refresh: refresh
        }
    })
}



