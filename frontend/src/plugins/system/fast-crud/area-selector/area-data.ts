/*
 * @Author: yifeng
 * @Date: 2022-10-18 19:39:52
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-18 19:39:53
 * @Description: 
 */
const pcaData = () => import('china-division/dist/pca-code.json')
export default pcaData().then(ret => { return ret.default })