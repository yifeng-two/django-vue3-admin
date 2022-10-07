/*
 * @Author: yifeng
 * @Date: 2022-07-30 22:21:45
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-06 21:44:04
 * @Description: 
 */
// 1. 从vue-router 中按需导入两个方法
// 2. createRouter 方法用于创建路由的实例对象
// 3. createHashHistory 用于指定路由的工作模式（hash 模式）
import cookies from '@/utils/common/cookies'
import { createRouter, createWebHashHistory } from 'vue-router'
import { checkRouter, getMenu, handleAsideMenu, handleRouter } from '@/utils/system/menu'
import useMenuStore from '@/stores/system-menu'
import usePageStore from '@/stores/system-page'
import routes from '@/router/staticRoutes'
import useDictStore from '@/stores/system-dict'
// import.meta.env.VITE_APP_VERSION
const router = createRouter({

    history: createWebHashHistory(process.env.BASE_URL),
    routes,
})
// console.log('process.env.BASE_URL',process.env.BASE_URL);
/**
 * 路由拦截||权限验证
 * 全局的路由拦截 
 * to 表示从哪里来
 * from 表示要去哪里
 * next 表示是否放行
 */
router.beforeEach((to, from, next) => {

    const pageStore = usePageStore()
    const menuStore = useMenuStore()
    const dictStore = useDictStore()
    // 定义一个列表
    // 可直接访问的白名单
    const whiteList = ['/login', '/auth-redirect', '/bind', '/register', '/oauth2']
    // 确认已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
    pageStore.isLoaded()
    // 验证当前路由所有的匹配中是否需要有登录验证的
    // 这里将cookie里是否存有token作为验证是否登录的条件
    // 获取token
    const token = cookies.get('token')
    if (token && token !== 'undefined') {
        if (!menuStore || menuStore.aside.length === 0) {
            dictStore.init()
            // 动态添加路由
            getMenu().then((ret: any[]) => {
                // 校验路由是否有效
                ret = checkRouter(ret)
                const routes = handleRouter(ret)

                // 处理路由 得到每一级的路由设置
                pageStore.init(routes)
                routes.forEach((route) => router.addRoute(route))

                const aside = handleAsideMenu(ret.filter(value => value.visible === true))
                // appStore.menuStore.asideSet(aside) // 设置侧边栏菜单
                menuStore.asideSet(aside) // 设置侧边栏菜单

                // const menu = handleAsideMenu(ret)
                // store.commit('d2admin/search/init', menu) // 设置搜索
                next({ path: to.fullPath, replace: true, params: to.params })
            })
        } else {
            next()
            // const childrenPath = window.qiankunActiveRule || []
            const childrenPath: any[] = []
            if (to.name) {
                // 有 name 属性，说明是主应用的路由
                next()
            } else if (childrenPath.some((item) => to.path.includes(item))) {
                next()
            } else {
                next({ name: '404' })
            }
        }
    } else {
        // 没有登录的时候跳转到登录界面
        // 携带上登陆成功之后需要跳转的页面完整路径
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next({
                name: 'login',
                query: {
                    redirect: to.fullPath
                }
            })
            // NProgress.done()
        }
    }
})
router.afterEach(to => {
    // 进度条
    // NProgress.done()
    // 多页控制 打开新的页面
    // store.dispatch('d2admin/page/open', to)
    const pageStore = usePageStore()
    pageStore.open(to)
    // 更改标题
    // util.title(to.meta.title)
})
export default router