/*
 * @Author: yifeng
 * @Date: 2022-09-11 13:53:46
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-04 16:12:27
 * @Description: 
 */
import { ElMessage, ElMessageBox } from 'element-plus'
import cookies from '@/utils/common/cookies'
import router from '@/router'
import { sysUserLogin, sysUserLogout } from '@/apis'
import { defineStore } from 'pinia'
import useUserStore from './system-user'
import useMenuStore from './system-menu'
import useDictStore from './system-dict'


const useAccountStore = defineStore('system/account', {
  actions: {
    /**
     * @description 登录
     * @param {Object} context
     * @param {Object} payload username {String} 用户账号
     * @param {Object} payload password {String} 密码
     * @param {Object} payload route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     */
    async login({
      username = '',
      password = '',
      captcha = '',
      captchaKey = ''
    }) {
      const userStore = useUserStore()
      let res = await sysUserLogin({
        username,
        password,
        captcha,
        captchaKey
      })
      // 设置 cookie 一定要存 uuid 和 token 两个 cookie
      // 整个系统依赖这两个数据进行校验和存储
      // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
      // token 代表用户当前登录状态 建议在网络请求中携带 token
      // 如有必要 token 需要定时更新，默认保存一天
      res = res.data
      cookies.set('uuid', res.userId)
      cookies.set('token', res.access)
      cookies.set('refresh', res.refresh)
      // 设置 pinia 用户信息
      await userStore.set({
        name: res.name,
        user_id: res.userId,
        avatar: res.avatar
      })
      // 用户登录后从持久化数据加载一系列的设置
      await this.load()
    },

    /**
     * @description 注销用户并返回登录页面
     * @param {Object} context
     * @param {Object} payload confirm {Boolean} 是否需要确认
     */
    logout({ confirm = false } = {}) {
      /**
       * @description 注销
       */
      const userStore = useUserStore()
      const menuStore = useMenuStore()
      async function logout() {
        await sysUserLogout({ refresh: cookies.get('refresh') }).then(() => {
          // 删除cookie
          cookies.remove('token')
          cookies.remove('uuid')
          cookies.remove('refresh')
        })
        // 清空用户信息
        await userStore.set({})
        menuStore.asideSet([]) // 设置侧边栏菜单
        // await dispatch('system/user/set', {}, { root: true })
        // store.commit('system/menu/asideSet', []) // 设置侧边栏菜单
        // store.commit('system/search/init', []) // 设置搜索
        sessionStorage.removeItem('menuData')

        // store.dispatch('system/db/databaseClear')

        // 跳转路由
        router.push({ name: 'login' })
        router.go(0)
      }
      // 判断是否需要确认
      if (confirm) {
        // commit('system/gray/set', true, { root: true })
        ElMessageBox.confirm('确定要注销当前用户吗', '注销用户', { type: 'warning' })
          .then(() => {
            // commit('system/gray/set', false, { root: true })
            logout()
          })
          .catch(() => {
            // commit('system/gray/set', false, { root: true })
            ElMessage({ message: '取消注销操作' })
          })
      } else {
        logout()
      }
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} context
     */
    async load() {
      // 加载用户名
      // await dispatch('system/user/load', null, { root: true })
      //   // 加载主题
      //   await dispatch('d2admin/theme/load', null, { root: true })
      //   // 加载页面过渡效果设置
      //   await dispatch('d2admin/transition/load', null, { root: true })
      //   // 持久化数据加载上次退出时的多页列表
      //   await dispatch('d2admin/page/openedLoad', null, { root: true })
      //   // 持久化数据加载侧边栏配置
      //   await dispatch('d2admin/menu/asideLoad', null, { root: true })
      //   // 持久化数据加载全局尺寸
      //   await dispatch('d2admin/size/load', null, { root: true })
      //   // 持久化数据加载颜色设置
      //   await dispatch('d2admin/color/load', null, { root: true })
      const userStore = useUserStore()
      const menuStore = useMenuStore()
      const dictStore = useDictStore()
      await userStore.load()
      await menuStore.asideLoad()
      await dictStore.init()
    }
  }
})
export default useAccountStore;

