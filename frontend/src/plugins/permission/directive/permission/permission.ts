/*
 * @创建文件时间: 2021-06-27 10:14:26
 * @Auther: 猿小天
 * @最后修改人: 猿小天
 * @最后修改时间: 2021-07-27 23:00:10
 * 联系Qq:1638245306
 * @文件介绍: 自定义指令-权限控制
 */
import permissionUtil from './util.permission'
export const permission = (el, binding, vnode)=> {
  const { value } = binding
  const hasPermission = permissionUtil.hasPermissions(value)
  if (import.meta.env.VITE_APP_PM_ENABLED) {
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}

