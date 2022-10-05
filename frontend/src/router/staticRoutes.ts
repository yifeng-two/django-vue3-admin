/*
 * @Author: yifeng
 * @Date: 2022-09-17 00:21:03
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-03 23:08:26
 * @Description: 
 */
import layoutHeaderAside from '@/layout/layout.vue'
const frameIn = [{
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
        // 控制台
        {
            path: 'index',
            name: 'index',
            meta: {
                title: '工作台',
                auth: true
            },
            component: import('@/views/dashboard/workbench/index.vue')
        },
        {
            path: 'userInfo',
            name: 'userInfo',
            meta: {
                title: '个人信息',
                auth: true
            },
            component: () => import('@/layout/components/headerUser/userInfo.vue')
        },
        // 刷新页面 必须保留
        {
            path: 'refresh',
            name: 'refresh',
            hidden: true,
            component: import('@/views/system/function/refresh.vue')
        },
        {
            path: '/home',
            name: 'home',
            meta: {
                auth: true
            },
            component: import('@/views/Home/Home.vue')
        },
    ]
}]
/**
 * 在主框架之外显示
 * 登录页面
 */
const frameOut = [{
    path: '/login',
    name: 'login',
    component: import('@/views/system/loginRegister/loginRegister.vue'),
}]
/**
 * 错误页面
 */
const errorPage = [{
    path: '/:catchAll(.*)',
    name: '/404',
    component: () => import('@/views/system/error/404/404.vue'),
}]

export const staticRoutes = frameIn

export default [
    ...frameIn,
    ...frameOut,
    ...errorPage
]