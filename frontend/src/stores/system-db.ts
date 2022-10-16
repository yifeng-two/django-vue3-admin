/*
 * @Author: yifeng
 * @Date: 2022-09-11 14:25:10
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-12 20:31:18
 * @Description: 
 */
import { database as getDatabase, dbGet, dbSet } from '@/utils/common/local.db'
import { defineStore } from 'pinia'
import { dbAcceptParma } from '@/utils/common/structInterface'
import router from '@/router'
import { cloneDeep } from 'lodash'

const useDbStore = defineStore('system/db', {
  actions: {
    /**
     * @description 将数据存储到指定位置 | 路径不存在会自动初始化
     * @description 效果类似于取值 dbName.path = value
     * @param {Object} payload dbName {String} 数据库名称
     * @param {Object} payload path {String} 存储路径
     * @param {Object} payload value {*} 需要存储的值
     * @param {Object} payload user {Boolean} 是否区分用户
     */
    set({ dbName = 'database', path = '', value = '', user = false }: dbAcceptParma
    ) {
      dbSet({ dbName, path, value, user })
    },
    /**
     * @description 获取数据
     * @description 效果类似于取值 dbName.path || defaultValue
     * @param {Object} context
     * @param {Object} payload dbName {String} 数据库名称
     * @param {Object} payload path {String} 存储路径
     * @param {Object} payload defaultValue {*} 取值失败的默认值
     * @param {Object} payload user {Boolean} 是否区分用户
     */
    get({
      dbName = 'database',
      path = '',
      defaultValue = {},
      user = false
    }) {
      return dbGet({ dbName, path, defaultValue, user })
    },
    /**
     * @description 获取存储数据库对象
     * @param {Object} context
     * @param {Object} payload user {Boolean} 是否区分用户
     */
    database({
      user = false
    } = {}) {
      return getDatabase({
        user,
        defaultValue: {}
      })
    },

    /**
     * @description 清空存储数据库对象
     * @param {Object} context
     * @param {Object} payload user {Boolean} 是否区分用户
     */
    databaseClear({
      user = false
    } = {}) {
      return getDatabase({
        user:user,
        validator: (value:any) => false,
        defaultValue: {}
      })
    },
    /**
     * @description 获取存储数据库对象 [ 区分页面 ]
     * @param {Object} context
     * @param {Object} payload basis {String} 页面区分依据 [ name | path | fullPath ]
     * @param {Object} payload user {Boolean} 是否区分用户
     */
    databasePage ({
      basis = 'fullPath',
      user = false
    } = {}) {
      return getDatabase({
        path: `$page.${router.app.$route[basis]}`,
        user,
        defaultValue: {}
      })
    },
    /**
     * @description 清空存储数据库对象 [ 区分页面 ]
     * @param {Object} context
     * @param {Object} payload basis {String} 页面区分依据 [ name | path | fullPath ]
     * @param {Object} payload user {Boolean} 是否区分用户
     */
    databasePageClear ({
      basis = 'fullPath',
      user = false
    } = {}) {
      return getDatabase({
        path: `$page.${router.app.$route[basis]}`,
        user,
        validator: (value:any) => false,
        defaultValue: {}
      })
    },
    /**
     * @description 快速将页面当前的数据 ( $data ) 持久化
     * @param {Object} context
     * @param {Object} payload instance {Object} vue 实例
     * @param {Object} payload basis {String} 页面区分依据 [ name | path | fullPath ]
     * @param {Object} payload user {Boolean} 是否区分用户
     */
    pageSet ({
      instance,
      basis = 'fullPath',
      user = false
    }) {
      return getDatabase({
        path: `$page.${router.app.$route[basis]}.$data`,
        user,
        validator: (value:any) => false,
        defaultValue: cloneDeep(instance.$data)
      })
    },
    /**
     * @description 快速获取页面快速持久化的数据
     * @param {Object} context
     * @param {Object} payload instance {Object} vue 实例
     * @param {Object} payload basis {String} 页面区分依据 [ name | path | fullPath ]
     * @param {Object} payload user {Boolean} 是否区分用户
     */
    pageGet ({
      instance,
      basis = 'fullPath',
      user = false
    }) {
      return dbGet({
        path: `$page.${router.app.$route[basis]}.$data`,
        user,
        defaultValue: cloneDeep(instance.$data)
      })
    },
    /**
     * @description 清空页面快照
     * @param {Object} context
     * @param {Object} payload basis {String} 页面区分依据 [ name | path | fullPath ]
     * @param {Object} payload user {Boolean} 是否区分用户
     */
    pageClear ({
      basis = 'fullPath',
      user = false
    }) {
      return getDatabase({
        path: `$page.${router.app.$route[basis]}.$data`,
        user,
        validator: (value:any) => false,
        defaultValue: {}
      })
    }
  }
})

export default useDbStore;
