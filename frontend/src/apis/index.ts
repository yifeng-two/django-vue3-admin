/*
 * @Author: yifeng
 * @Date: 2022-10-07 17:32:33
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-07 17:48:56
 * @Description: 
 */
import { assign, map } from 'lodash'
// import faker from 'faker/locale/zh_CN'
import { axiosService, axiosInstance } from '@/utils/net/axiosInstance'
import * as tools from '@/utils/system/tools'

// const files = require.context('./modules', true, /\.api\.js$/)
const files = import.meta.glob('/src/apis/system/*.ts')
const generators = files.keys().map(key => files(key).default)

export default assign({}, ...map(generators, generator => generator({
    axiosService,
    axiosInstance,
    tools
})))