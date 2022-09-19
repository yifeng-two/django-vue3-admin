/*
 * @Author: yifeng
 * @Date: 2022-09-12 10:42:16
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-12 17:39:51
 * @Description: 
 */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */


import axios from 'axios'
// declare module 'axios' {
//   interface AxiosInstance {
//     (config: AxiosRequestConfig): Promise<any>
//   }
// }
declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}