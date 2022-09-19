/*
 * @Author: yifeng
 * @Date: 2022-09-06 20:14:42
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-15 19:59:03
 * @Description: 
 */
import axiosInstance from '@/utils/axiosInstance'

// 用户登录接口
export function sysUserLogin(data) {
    return axiosInstance({
        url: "api/login/",
        method: 'post',
        data
    })
}

// 用户登出接口
export function sysUserLogout(data) {
    // return axiosInstance.post("api/logout/", data)
    return axiosInstance({
        url: "api/logout/",
        method: 'post',
        data
    })
}

// 获取验证码接口
export function getCaptcha() {
    // return axiosInstance.get("api/captcha/")
    return axiosInstance({
        url: "api/captcha/",
        method: 'get',
    })
}

// 获取验证码状态接口
export function getCaptchaStatus() {
    // return axiosInstance.get("api/captcha/status")
    return axiosInstance({
        url: "api/captcha/status",
        method: 'get',
    })
}