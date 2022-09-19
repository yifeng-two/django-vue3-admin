/*
 * @Author: yifeng
 * @Date: 2022-09-11 10:39:36
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-19 19:13:30
 * @Description: 
 */
module.exports = (file: string) => require('@/views/' + file).default
// module.exports = file => require('@/views/' + file).default
