<!--
 * @Author: yifeng
 * @Date: 2022-09-15 20:22:18
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-05 13:59:37
 * @Description: 
-->
<template>
    <div class="config-container">
        <el-header>
            <div class="config-container-header-left">
                <el-tag>系统配置:您可以对您的网站进行自定义配置</el-tag>
            </div>
            <div class="config-container-header-right">
                <el-button-group>
                    <el-button type="primary" @click="tabsDrawer=true">
                        <el-icon>
                            <FolderAdd />
                        </el-icon>添加分组
                    </el-button>
                    <el-button type="warning" @click="contentDrawer=true">
                        <el-icon>
                            <Edit />
                        </el-icon>添加内容
                    </el-button>
                </el-button-group>
            </div>
        </el-header>
        <div>
            <el-drawer v-if="tabsDrawer" title="添加分组" v-model="tabsDrawer" direction="rtl" size="30%">
                <!-- <addTabs></addTabs> -->
            </el-drawer>
        </div>
        <div>
            <el-drawer v-if="contentDrawer" title="添加内容" v-model="contentDrawer" direction="rtl" size="30%">
                <!-- <addContent></addContent> -->
            </el-drawer>
        </div>
        <el-tabs type="border-card" v-model="editableTabsValue" @tab-click="handleClick">
            <el-tab-pane :key="index" v-for="(item, index) in editableTabs" :label="item.title" :name="item.key">
                <span slot="label" v-if="item.icon">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                </span>
                <el-row v-if="item.icon">
                    <el-col :offset="4" :span="8">
                        <!-- <addContent></addContent> -->
                    </el-col>
                </el-row>
                <form-content v-else :options="item" :editableTabsItem="item"></form-content>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup>
import {  onMounted,  ref } from 'vue';
import * as api from '@/apis'
import formContent from './components/formContent.vue';

const tabsDrawer = ref(false)
const contentDrawer = ref(false)
const editableTabsValue = ref('base')
// const tabIndex = ref(2)
const editableTabs = ref([])

const getTabs = async () => {
    const res = await api.getSysConfigList({
        limit: 999,
        parent__isnull: true
    })
    const { data } = res.data;
    data.push({
        title: '无',
        icon: 'Plus',
        key: 'null'
    })
    editableTabs.value = data
    return editableTabs;
}
onMounted(() => {
    getTabs()
    // console.log(editableTabs)
})
// const handleClick = (tab, event) => {
// //   console.log(tab, event)
// }

</script>
<style lang="scss" scoped>
.config-container {
    height: 100%;

    .el-header {
        display: flex;
        align-items: center;

        .config-container-header-left {
            font: 100
        }

        .config-container-header-right {
            align-content: center;
            margin-left: auto;

        }
    }
}
</style>