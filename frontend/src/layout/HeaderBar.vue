<!--
 * @Author: yifeng
 * @Date: 2022-08-04 22:30:57
 * @LastEditors: yifeng
 * @LastEditTime: 2022-08-25 22:04:06
 * @Description: 
-->
<template>
    <header>
        <div class="l-content">
            <el-icon class="icons" :size="25" @click="collapseMenu">
                <component :is="iconMenu ? Fold : Expand"></component>
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
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <!-- <el-dropdown-item>Add</el-dropdown-item> -->
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </header>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Fold, Expand} from "@element-plus/icons-vue";

export default ({
    name: 'HeaderBar',
    setup() {
        // 控制左侧显示
        const $store = useStore();
        const iconMenu = computed(() => {
            // 这里的数据就是从vuex取得
            return $store.state.isCollapse
        })
        //控制左侧菜单是否折叠
        function collapseMenu() {
            $store.commit('collapseMenu')
            // console.log($store.state.isCollapse);
        }
        return {
            collapseMenu,
            iconMenu,
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