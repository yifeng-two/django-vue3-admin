<!--
 * @Author: yifeng
 * @Date: 2022-08-04 22:12:49
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-16 14:31:21
 * @Description: 
-->
<template>
    <logo :title_show=asideCollapse />
    <el-menu :collapse="asideCollapse" :default-active="$route.path" class="el-menu-vertical-demo"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse-transition=false>
        <el-menu-item-group v-for="(menu,index) in menus" :key="index">
            <el-menu-item :index="index" v-if="!menu.children" :key="index" @click="clickMenu(menu)">
                <!-- <el-icon>
                    <component :is="menu.icon" />
                </el-icon> -->
                <fs-single-icon :icon="menu.icon"></fs-single-icon>
                <span v-show="!asideCollapse">{{ menu.title }}</span>
            </el-menu-item>
            <el-sub-menu :index="index" v-if="menu.children">
                <template #title>
                    <!-- <el-icon>
                        <component :is="menu.icon" />
                    </el-icon> -->
                    <fs-single-icon :icon="menu.icon"></fs-single-icon>
                    <span v-show="!asideCollapse">{{ menu.title }}</span>
                </template>
                <el-menu-item :index="subMenu.path" v-for="(subMenu, subIndex) in menu.children" :key="subIndex"
                    @click="clickMenu(subMenu)">
                    <!-- <el-icon>
                        <component :is="subMenu.icon" />
                    </el-icon> -->
                    <fs-single-icon :icon="subMenu.icon"></fs-single-icon>
                    <span>{{ subMenu.title }}</span>
                </el-menu-item>
            </el-sub-menu>
        </el-menu-item-group>
    </el-menu>
</template>

<script lang="ts" setup>
import useMenuStore from '@/stores/system-menu'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Logo from "../logo/logo.vue"

// const menus = reactive(
//     [{
//         path: '/',
//         name: 'home',
//         title: '??????',
//         icon: 'HomeFilled',
//         url: 'Home'
//     },
//     {
//         path: '/workbench',
//         name: 'workbench',
//         title: '?????????',
//         icon: 'HomeFilled',
//         url: 'workbench'
//     },
//     {
//         title: '????????????',
//         icon: 'DataBoard',
//         children: [
//             {
//                 path: '/orginDataManage',
//                 name: 'orginDataManage',
//                 title: '????????????',
//                 icon: 'Folder',
//                 url: 'dataManage/orginDataManage'
//             },
//             {
//                 path: '/detectDataManage',
//                 name: 'detectDataManage',
//                 title: '????????????',
//                 icon: 'FolderChecked',
//                 url: 'dataManage/detectDataManage'
//             }]
//     },
//     {
//         title: '????????????',
//         icon: 'user',
//         children: [
//             {
//                 path: '/page1',
//                 name: 'page1',
//                 title: '??????1',
//                 icon: 'setting',
//                 url: 'Other/PageOne'
//             },
//             {
//                 path: '/page2',
//                 name: 'page2',
//                 title: '??????2',
//                 icon: 'setting',
//                 url: 'Other/PageTwo'
//             }]
//     }]
// )
// const fmenu = menus.filter(function (item) {
//     return !item.children
// })
// const smenu = menus.filter(function (item) {
//     return item.children
// })
const menuStore = useMenuStore()
const menus = menuStore.aside

//???????????? ??????????????????
const router = useRouter();
const clickMenu = (item: { path: any; }) => {
    router.push({ path: item.path })
}
// ??????????????????
const asideCollapse = computed(() => {
    // ????????????????????????vuex??????
    return menuStore.asideCollapse
})
</script>
<style lang="scss" scoped>
.el-menu {
    height: 100vh;
    border: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    // height: 100vh; //???????????????
}

/* ????????????????????????*/
.el-aside {
    overflow-x: hidden;
    transition: width 0.25s;
    -webkit-transition: width 0.25s;
    -moz-transition: width 0.25s;
    -webkit-transition: width 0.25s;
    -o-transition: width 0.25s;
}

/*????????????????????????????????????*/
.el-menu {
    transition: all 50ms;
}


// ???????????????
// .el-menu--collapse {
//     width: 50px;
// }
</style>
