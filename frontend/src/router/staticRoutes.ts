/*
 * @Author: yifeng
 * @Date: 2022-09-17 00:21:03
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-19 19:56:05
 * @Description: 
 */
import layoutHeaderAside from '@/layout/main.vue'
const frameIn = [{
    path: '/',
    redirect: { name: 'workbench' },
    component: layoutHeaderAside,
    children: [
        // 控制台
        {
            path: '/workbench',
            name: 'workbench',
            meta: {
                title: '工作台',
                auth: true
            },
            component: import('@/views/dashboard/workbench/index.vue')
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