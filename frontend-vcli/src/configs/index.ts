/*
 * @Author: yifeng
 * @Date: 2022-08-14 21:55:39
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-06 22:31:23
 * @Description: 
 */

const BASE_URL = "127.0.0.1";

// axios基本路径参数设置
const AXIOS_PROTOCL = 'http'
const AXIOS_PORT = '8000';
export const AXIOS_BASE_URL = `${AXIOS_PROTOCL}://${BASE_URL}:${AXIOS_PORT}/`


// websocket基本路径参数设置
const WS_PORT = '8000';
export const WS_ADDRESS = `ws://${BASE_URL}:${WS_PORT}`;
