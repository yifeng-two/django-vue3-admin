/*
 * @Author: yifeng
 * @Date: 2022-09-11 14:44:38
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-14 20:19:44
 * @Description: 
 */
import { LocalStorage, Low, LowSync } from 'lowdb'
import cookies from './cookies'
import lodash, { cloneDeep } from 'lodash'
import { dbAcceptParma, DbSchema } from './structInterface'

//#region 
// create an interface
// interface userInfo {
//   name: String,
//   user_id: String,
//   avatar: String,
// }
// interface settingInit {
//   base:{
//     captcha_state: true,
//     default_password: String,
//   },
//   login:{
//     site_name: String,
//     site_logo: null,
//     login_background: null,
//     copyright: String,
//     keep_record: String,
//     help_url: String,
//     privacy_url: String,
//     clause_url: String
//   }
// }
// interface settingMenu {
//   name: String,
//   user_id: String,
//   avatar: String,
// }
// interface DbSchema {
//   sys: {
//     user: {
//       info: userInfo[];
//     }
//     settings: {
//       init: settingInit[];
//       menut: settingMenu[];
//     }
//   },
//   database: {}
// }
//#endregion

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends LowSync<T> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
}
const adapter = new LocalStorage<DbSchema>(`system-${process.env.VUE_APP_VERSION}`)

// const db = new LowSync(adapter)
const db = new LowWithLodash(adapter)

db.data ||= ({
  sys: {},
  database: {}
})
db.write()

export default db

/**
 * @description 检查路径是否存在 不存在的话初始化
 * @param {Object} payload dbName {String} 数据库名称
 * @param {Object} payload path {String} 路径
 * @param {Object} payload user {Boolean} 区分用户
 * @param {Object} payload validator {Function} 数据校验钩子 返回 true 表示验证通过
 * @param {Object} payload defaultValue {*} 初始化默认值
 * @returns {String} 可以直接使用的路径
 */
export function pathInit({
  dbName = 'database',
  path = '',
  user = true,
  validator = (value) => true,
  defaultValue = {}
}) {
  const uuid = cookies.get('uuid') || 'ghost-uuid'
  const currentPath = `${dbName}.${user ? `user.${uuid}` : 'public'}${path ? `.${path}` : ''}`
  const value = db.chain.get(currentPath).value()
  if (!(value !== undefined && validator(value))) {
    db.chain.set(currentPath, defaultValue).value()
    db.write()
  }
  return currentPath
}

/**
 * @description 将数据存储到指定位置 | 路径不存在会自动初始化
 * @description 效果类似于取值 dbName.path = value
 * @param {Object} payload dbName {String} 数据库名称
 * @param {Object} payload path {String} 存储路径
 * @param {Object} payload value {*} 需要存储的值
 * @param {Object} payload user {Boolean} 是否区分用户
 */
export function dbSet({dbName = 'database', path = '', value = '', user= false}:dbAcceptParma) {
  db.chain.set(pathInit({
    dbName,
    path,
    user
  }), value).value()
  db.write()
}

/**
 * @description 获取数据
 * @description 效果类似于取值 dbName.path || defaultValue
 * @param {Object} payload dbName {String} 数据库名称
 * @param {Object} payload path {String} 存储路径
 * @param {Object} payload defaultValue {*} 取值失败的默认值
 * @param {Object} payload user {Boolean} 是否区分用户
 */
export function dbGet({
  dbName = 'database',
  path = '',
  defaultValue = {},
  user = false
}) {
  return cloneDeep(db.chain.get(pathInit({
    dbName,
    path,
    user,
    defaultValue
  })).value())
}

/**
 * @description 获取存储数据库对象
 * @param {Object} payload user {Boolean} 是否区分用户
 */
export function database({
  dbName = 'database',
  path = '',
  user = false,
  validator = (value) => true,
  defaultValue = {}
} = {}) {
  return db.chain.get(pathInit({
    dbName, path, user, validator, defaultValue
  })).value()
}
