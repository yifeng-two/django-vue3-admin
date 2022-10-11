/*
 * @Author: yifeng
 * @Date: 2022-09-11 14:55:30
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-09 22:30:21
 * @Description: 
 */
import Cookies from 'js-cookie'

interface cookieMethod {
    /**
     * @description 存储 cookie 值
     * @param {String} name cookie name
     * @param {String} value cookie value
     * @param {Object} setting cookie setting
     */
    set(name: string, value: string, cookieSetting: Object): void;

    /**
     * @description 拿到 cookie 值
     * @param {String} name cookie name
     */
    get(name: string): string;

    /**
     * @description 拿到 cookie 全部的值
     */
    getAll(): Object;

    /**
     * @description 删除 cookie
     * @param {String} name cookie name
     */
    remove(name: string): string;
}

class cookieClass implements cookieMethod {
    set(name: string = 'default', value: string = '', cookieSetting: Object = {}): void {
        const currentCookieSetting = {
            expires: 1
        }
        Object.assign(currentCookieSetting, cookieSetting)
        Cookies.set(`system-${import.meta.env.VITE_APP_VERSION}-${name}`, value, currentCookieSetting)
    }
    get(name: string = 'default'): string {
        return Cookies.get(`system-${import.meta.env.VITE_APP_VERSION}-${name}`)
    }
    getAll(): Object {
        return Cookies.get()
    }
    remove(name: string = 'default'): string {
        return Cookies.remove(`system-${import.meta.env.VITE_APP_VERSION}-${name}`)
    }
}

const cookies = new cookieClass()

export default cookies
