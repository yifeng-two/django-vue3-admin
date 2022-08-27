<!--
 * @Author: yifeng
 * @Date: 2022-08-04 22:12:49
 * @LastEditors: yifeng
 * @LastEditTime: 2022-08-25 22:24:44
 * @Description: 
-->
<template>
    <Logo :title_show=isCollapse ></Logo>
    <!-- <div class="logo">
        <img class="logo_img" src="../assets/MenuLogo.png" alt="logo" />
        <span v-show="!title_show">焊接检测管理系统</span>
    </div> -->
    <el-menu :collapse="isCollapse" :default-active="$route.path" class="el-menu-vertical-demo"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <!--collapse 是否水平折叠收起菜单-->
        <!-- <h3 v-show="isCollapse">焊接</h3> -->
        <!-- <div class="l-content">
            <el-button plain icon="expand" size="small" @click="collapseMenu"></el-button>
        </div> -->
        <el-menu-item :index="item.index" v-for="item in fmenu" :key="item.label" @click="clickMenu(item)">
            <el-icon>
                <component :is="item.icon" />
            </el-icon>
            <span>{{ item.label }}</span>
        </el-menu-item>
        <el-sub-menu :index="item.label" v-for="(item, index) in smenu" :key="index">
            <template #title>
                <el-icon>
                    <component :is="item.icon" />
                </el-icon>
                <span>{{ item.label }}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex"
                    @click="clickMenu(subItem)">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity'
import { reactive} from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Logo from './Logo.vue'
const menu = reactive(
            [{
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'HomeFilled',
                url: 'Home'
            },
            {
                label: '数据管理',
                icon: 'DataBoard',
                children: [
                    {
                        path: '/orginDataManage',
                        name: 'orginDataManage',
                        label: '原始数据',
                        icon: 'Folder',
                        url: 'dataManage/orginDataManage'
                    },
                    {
                        path: '/detectDataManage',
                        name: 'detectDataManage',
                        label: '检测数据',
                        icon: 'FolderChecked',
                        url: 'dataManage/detectDataManage'
                    }]
            },
            {
                label: '用户管理',
                icon: 'user',
                children: [
                    {
                        path: '/page1',
                        name: 'page1',
                        label: '页面1',
                        icon: 'setting',
                        url: 'Other/PageOne'
                    },
                    {
                        path: '/page2',
                        name: 'page2',
                        label: '页面2',
                        icon: 'setting',
                        url: 'Other/PageTwo'
                    }]
            }]
        )
const fmenu = menu.filter(function (item) {
    return !item.children
})
const smenu = menu.filter(function (item) {
    return item.children
})

//跳转路由 根据名称跳转
const $router = useRouter();
function clickMenu(item) {
    $router.push({ name: item.name })
}
// 控制左侧显示
const $store = useStore();
const isCollapse = computed(() => {
    // 这里的数据就是从vuex取得
    return $store.state.isCollapse
})
// export default ({
//     name: 'SideBar',
//     components:{
//         Logo
//     },
//     setup() {
        
//         return {
//             fmenu,
//             smenu,
//             clickMenu,
//             isCollapse,
//         }
//     }

// })

</script>
<style lang="scss" scoped>
.logo {
    color: #ffffff;
    text-align: center;
    line-height: 48px;
    font-size: 18px;
    font-family: sans-serif;
    font-weight: bold;
    display: flex;

    .logo_img {
        width: 50px;
        height: 50px;
    }
}

.el-menu {
    height: 100vh;
    border: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 210px;
    min-height: 400px;
    // height: 100vh; //添加此属性
}

// 折叠时宽度
// .el-menu--collapse {
//     width: 100px;
// }
</style>
