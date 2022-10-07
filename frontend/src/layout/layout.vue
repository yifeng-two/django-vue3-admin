<!--
 * @Author: yifeng
 * @Date: 2022-08-06 18:54:46
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-06 00:05:13
 * @Description: 
-->
<template>
  <el-container class="home-container">
    <el-aside width="auto">
      <el-scrollbar>
        <side-bar />
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <header-bar />
      </el-header>
      <div class="bottom-content">
        <tabs />
      </div>
      <el-main>
        <!-- <div ref="main-container-body">
          <keep-alive :include="keepAlive" v-if="showView">
            <router-view :key="routerViewKey" />
          </keep-alive>
        </div> -->
        <el-scrollbar>
          <keep-alive :include="keepAlive" v-if="showView">
            <router-view :key="routerViewKey" />
          </keep-alive>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { computed, nextTick, provide, ref } from "vue";
import { useRouter } from 'vue-router'

import usePageStore from "@/stores/system-page";

import sideBar from "@/layout/components/sideBar/sideBar.vue"
import headerBar from "@/layout/components/headerBar/headerBar.vue";
import tabs from '@/layout/components/tabs/tabs.vue'
const router = useRouter()

const pageStore = usePageStore()
const showView = ref(true)  // 用于点击当前页的router时，刷新当前页
const keepAlive = computed(() => {
  return pageStore.keepAlive
})

/**
 * 刷新页面
 */
const refreshView = () => {
  showView.value = false // 通过v-if移除router-view节点
  nextTick(() => {
    showView.value = true // DOM更新后再通过v-if添加router-view节点
  })
}
provide("refreshView", refreshView)
/**
 * @description 用来实现带参路由的缓存
 */
const routerViewKey = () => {
  // 默认情况下 key 类似 __transition-n-/foo
  // 这里的字符串操作是为了最终 key 的格式和原来相同 类似 __transition-n-__stamp-time-/foo
  const stamp = router.currentRoute.value.meta[`__stamp-${router.currentRoute.value.fullPath}`] || ''
  return `${stamp ? `__stamp-${stamp}-` : ''}${router.currentRoute.value.fullPath}`
}
// /**
//  * @description 最外层容器的背景图片样式
//  */
// const styleLayoutMainGroup = () =>{
//   return this.themeActiveSetting.backgroundImage
//     ? {
//       backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`
//     }
//     : {}
// }
</script>
<style scoped>
.home_container {
  height: 100%;
}

.home-container .el-header {
  position: relative;
  background-color: #384857;
  color: var(--el-text-color-primary);
}

.home-container .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  background-color: #545c64;
  height: 100%;
  /* width: var(--el-aside-width, 200px); */
}

.home-container .bottom-content {
  /* display: flex; */
  position: relative;
  height: 41px;
  background-color: #384857;
  /* color: var(--el-text-color-primary); */
  /* color: #fff; */
  
}

/* 
.home-container .el-menu {
  border-right: none;
} */

/* .home-container .el-main {
  padding: 0;
} */
</style>
