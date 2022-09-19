/*
 * @Author: yifeng
 * @Date: 2022-09-13 22:54:40
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-13 22:54:41
 * @Description: 
 */
export interface DbSchema {
    sys: {},
    database: {}
}
export interface dbAcceptParma {
    dbName: string,
    path: string,
    value: boolean | string,
    user: boolean
}