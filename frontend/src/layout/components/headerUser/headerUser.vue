<!--
 * @Author: yifeng
 * @Date: 2022-09-11 10:54:34
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-04 12:37:37
 * @Description: 
-->
<template>
    <el-dropdown>
        <span class="el-dropdown-link">
            {{userInfo.name ? `你好 ${userInfo.name}` : "未登录"}}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item :icon="UserFilled" @click="setUserInfo">个人中心</el-dropdown-item>
                <el-dropdown-item :icon="Setting" @click="logOut">退出</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script lang="ts" setup>
import { UserFilled, Setting } from '@element-plus/icons-vue'
import useUserStore from '@/stores/system-user';
import useAccountStore from '@/stores/system-account';
import router from '@/router';
import { computed } from 'vue';
const accountStore = useAccountStore()
const userStore = useUserStore()
const userInfo = computed(()=>{
    return userStore.info
})

/** 个人信息 */
const setUserInfo = () =>{
    router.push({ path: 'userInfo' })
}
/**
 * @description 登出
 */
 const logOut = ()=> {
    accountStore.logout({
        confirm: true
    })
}
</script>
<style scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #fff;
    display: flex;
    align-items: center;
}
</style>