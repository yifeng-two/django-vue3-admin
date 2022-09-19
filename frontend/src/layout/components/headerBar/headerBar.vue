<!--
 * @Author: yifeng
 * @Date: 2022-08-04 22:30:57
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-15 21:17:00
 * @Description: 
-->
<template>
    <header>
        <div class="l-content">
            <el-icon class="icons" :size="25" @click="collapseMenu">
                <component :is="iconAsideMenu ? Fold : Expand"></component>
            </el-icon>
            <h3 style=" color : #fff">首页</h3>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
                <span style="margin-right: 8px; color: #fff;">
                    <el-icon style="margin-right: 8px; color: #fff;">
                        <setting />
                    </el-icon>
                </span>
                <header-user/>
                <!-- <HeaderUser/> -->
            </el-dropdown>
        </div>
    </header>
</template>
<script>
import { computed } from 'vue';
import { Fold, Expand} from "@element-plus/icons-vue";
import HeaderUser from "../headerUser/index.vue"
import useMenuStore from '@/stores/system-menu'

export default ({
    name: 'HeaderBar',
    component:{
        HeaderUser
    },
    setup() {
        // 控制左侧显示
        const menuStore = useMenuStore();
        const iconAsideMenu = computed(() => {
            // 这里的数据就是从vuex取得
            return menuStore.asideCollapse
        })
        //控制左侧菜单是否折叠
        function collapseMenu() {
            menuStore.asideCollapseToggle()
        }
        return {
            collapseMenu,
            iconAsideMenu,
            Expand,
            Fold
        }
    }
})

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
    .icons{
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