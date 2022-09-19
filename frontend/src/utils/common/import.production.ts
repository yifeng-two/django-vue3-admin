/*
 * @Author: yifeng
 * @Date: 2022-09-11 10:39:36
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-19 19:19:02
 * @Description: 
 */
module.exports = (file: string) => () => import('@/views/' + file)
