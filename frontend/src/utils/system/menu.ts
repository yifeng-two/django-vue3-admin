/*
 * @Author: yifeng
 * @Date: 2022-09-14 21:09:16
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-03 18:37:10
 * @Description: 
 */
import XEUtils from 'xe-utils'
import { getWebRouter } from "@/apis/system/menu"
import { staticRoutes } from "@/router/staticRoutes"
import { uniqueId } from 'lodash'
import { defineAsyncComponent } from 'vue'
// const _import = require('@/utils/common/import.' + process.env.NODE_ENV)

const component_route = import.meta.glob(`/src/views/**/*.vue`)

// /**
//  * 路由懒加载 拼接
//  * @param component_route
//  * @returns {function(): *}
//  */
//  export const loadView = (component_route: any) => {
// 	// 这里需要注意一下 vite+vue3 要用 defineAsyncComponent 才能拼接成功 不然会一直报错找不到模块
//     return () => defineAsyncComponent(() => import(`@/views/${component_route}.vue`))
// }

/**
 * @description 给菜单数据补充上 path 字段
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath(menu) {
    return menu.map(e => ({
        ...e,
        path: e.path || uniqueId('d2-menu-empty-'),
        ...e.children ? {
            children: supplementPath(e.children)
        } : {}
    }))
}


// 请求菜单数据,用于解析路由和侧边栏菜单
export const getMenu = function () {
    return getWebRouter().then((res: { data: { data: any } }) => {
        // 设置动态路由
        const menuData = res.data.data
        sessionStorage.setItem('menuData', JSON.stringify(menuData))
        return menuData
    })
}

/**校验路由是否有效**/
export const checkRouter = function (menuData: any[]) {
    const result = [] as any[]
    for (const item of menuData) {
        try {
            if (item.path !== '' && item.component) {
                // (item.component && item.component.indexOf('@great-dream/') !== -1) ? pluginImport(item.component.replace('@great-dream/', '')) : _import(item.component)
                // const component_url = "@/views/" + item.component + '.vue'
                // import(/* @vite-ignore */component_url)
                component_route[/* @vite-ignore */ `/src/views/${item.component}.vue`]
            }
            result.push(item)
        } catch (err) {
            console.log(`导入菜单错误，会导致页面无法访问，请检查文件是否存在：${item.component}`)
        }
    }   
    return result
}
/**将获取到的后端菜单数据,解析为前端路由**/
export const handleRouter = function (menuData: any[]) {
    const result = [] as any[]
    for (const item of menuData) {
        if (item.path !== '' && item.component) {
            const obj = {
                path: item.path,
                name: item.component_name,
                // import(/* @vite-ignore */component_url),
                // component_route[/* @vite-ignore */ `@/views/${item.component}.vue`],
                // loadView(item.component),
                component: component_route[/* @vite-ignore */ `/src/views/${item.component}.vue`],
                meta: {
                    title: item.name,
                    auth: true,
                    cache: item.cache
                }
            }
            result.push(obj)
        } else {
            if (item.is_link === 0) {
                delete item.path
            }
        }
    }
    staticRoutes[0].children = [...result]
    // console.log(staticRoutes);
    return staticRoutes
}

/** 将前端的侧边菜单进行处理 **/
export const handleAsideMenu = function (menuData: any[]) {
    // 将列表数据转换为树形数据
    const data = XEUtils.toArrayTree(menuData, {
        parentKey: 'parent',
        strict: true
    })
    const menu = [{
        path: 'workbench',
        title: '控制台',
        icon: 'HomeFilled'
    },
    ...data
    ]

    return menu
    // return supplementPath(menu)
}

