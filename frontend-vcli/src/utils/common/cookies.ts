/*
 * @Author: yifeng
 * @Date: 2022-09-11 14:55:30
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-11 17:20:30
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
    set(name: String, value: String, cookieSetting: Object): void;
    
    /**
     * @description 拿到 cookie 值
     * @param {String} name cookie name
     */
    get(name: String): String;
    
    /**
     * @description 拿到 cookie 全部的值
     */
    getAll(): Object;
    
    /**
     * @description 删除 cookie
     * @param {String} name cookie name
     */
    remove(name: String): String;
}

class cookieClass implements cookieMethod {
    set(name: String ='default', value: String='', cookieSetting: Object={}): void {
        const currentCookieSetting = {
            expires: 1
        }
        Object.assign(currentCookieSetting, cookieSetting)
        Cookies.set(`system-${process.env.VUE_APP_VERSION}-${name}`, value, currentCookieSetting)
    }
    get(name: String='default'): String {
        return Cookies.get(`system-${process.env.VUE_APP_VERSION}-${name}`)
    }
    getAll(): Object {
        return Cookies.get()
    }
    remove(name: String='default'): String {
        return Cookies.remove(`system-${process.env.VUE_APP_VERSION}-${name}`)
    }
}

const cookies = new cookieClass()

export default cookies
