<!--
 * @Author: yifeng
 * @Date: 2022-08-04 22:30:57
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-02 21:15:33
 * @Description: 
-->
<template>
    <header>
        <div class="l-content">
            <el-icon class="icons" :size="25" @click="collapseMenu">
                <component :is="iconAsideMenu ? Fold : Expand"></component>
            </el-icon>
        </div>
        <div class="r-content">
            <header-user />
        </div>
    </header>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { Fold, Expand } from "@element-plus/icons-vue";
import headerUser from "@/layout/components/headerUser/headerUser.vue"
import useMenuStore from '@/stores/system-menu'

// 控制左侧显示
const menuStore = useMenuStore();
const iconAsideMenu = computed(() => {
    // 这里的数据就是从vuex取得
    return menuStore.asideCollapse
})
//控制左侧菜单是否折叠
const collapseMenu = () => {
    menuStore.asideCollapseToggle()
}
</script>

<style lang="scss" scoped>
header {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
}

.l-content {
    display: flex;
    align-items: center;

    .el-icon {
        margin-right: 20px;
    }
    .icons {
        color: #fff;
    }

    // .el-button {
    //     margin-right: 20px;
    // }
}

.r-content {
    /* .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    } */
}
</style>