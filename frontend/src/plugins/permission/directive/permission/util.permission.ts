/*
 * @创建文件时间: 2021-06-27 10:14:26
 * @Auther: 猿小天
 * @最后修改人: 猿小天
 * @最后修改时间: 2021-08-09 21:51:29
 * 联系Qq:1638245306
 * @文件介绍: 权限控制
 */
import XEUtils from 'xe-utils'
import { useRouter } from 'vue-router'
export default {
  hasPermissions (value: any) {
    const router = useRouter()
    if (import.meta.env.VITE_APP_PM_ENABLED) {
      const path = router.currentRoute.value.path;// 当前路由
      // console.log('path',path);
      
      let need: any[] = []
      if (typeof value === 'string') {
        need.push(value)
      } else if (value && value instanceof Array && value.length > 0) {
        need = need.concat(value)
      }
      if (need.length === 0) {
        throw new Error('need permissions! Like v-permission="usersphere:user:view" ')
      }
      // 获取所有的菜单路由(包含权限)
      let menuTree = sessionStorage.getItem('menuData')
      menuTree = JSON.parse(menuTree)
      const userPermissionList = XEUtils.toTreeArray(menuTree)
      const permissionList = []
      for (const item of userPermissionList) {
        if (item.menuPermission) {
          for (const per of item.menuPermission) {
            permissionList.push(item.path + ':' + per)
          }
        }
      }
      // console.log(permissionList.includes(path + ':' + value));
      
      return permissionList.includes(path + ':' + value)
    }
    return true
  }
}
