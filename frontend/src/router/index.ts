/*
 * @Author: yifeng
 * @Date: 2022-07-30 22:21:45
 * @LastEditors: yifeng
 * @LastEditTime: 2022-08-25 21:59:09
 * @Description: 
 */
// 1. 从vue-router 中按需导入两个方法
// 2. createRouter 方法用于创建路由的实例对象
// 3. createHashHistory 用于指定路由的工作模式（hash 模式）
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name:'Main',
        component: () => import('@/layout/Main.vue'),
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('@/views/Home/Home.vue'),
            },
            {
                path: '/orginDataManage',
                name: 'orginDataManage',
                component: () => import('@/views/DataManage/OrginDataManage.vue'),
            },
            {
                path: '/detectDataManage',
                name: 'detectDataManage',
                component: () => import('@/views/DataManage/DetectDataManage.vue'),
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginRegister/LoginRegister.vue'),
    },
    {
        path: '/:catchAll(.*)',
        name: '/404',
        component: () => import('@/views/404.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})
export default router