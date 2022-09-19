<!--
 * @Author: yifeng
 * @Date: 2022-08-06 18:54:46
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-11 12:54:20
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
      <el-main>
        <el-scrollbar>
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from "@/layout/components/sideBar/sideBar.vue"
import HeaderBar from "@/layout/components/headerBar/headerBar.vue";

export default {

  components: {
    SideBar,
    HeaderBar,
  },
}
</script>
<style>
.home_container {
  height: 100%;
}

.home-container .el-header {
  /* position: relative;
  background-color: var(--el-color-primary-light-7); */
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

.home-container .el-menu {
  border-right: none;
}

.home-container .el-main {
  padding: 0;
}
</style>
