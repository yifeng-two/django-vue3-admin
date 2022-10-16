<!--
 * @Author: yifeng
 * @Date: 2022-10-02 15:49:04
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-16 14:37:51
 * @Description: 
-->
<template>
    <div class="tabs-content" flex>
        <div class="tabs-context-left">
            <el-tabs class="multiple-page-context" v-model="currentPage" type="card" @tab-click="handleClick"
                @tab-remove="handleTabRemove" @contextmenu.native="handleContextmenu" style="color:#fff">
                <el-tab-pane v-for="page in opened" :key="page.fullPath" :label="page.meta.title || '未命名'"
                    :name="page.fullPath" :closable="isTabClosable(page)" />
            </el-tabs>
            <context-menu v-model:visible="contextmenuFlag" :x="contentmenuX" :y="contentmenuY">
                <contextmenu-list :menulist="tagName === '/index' ? contextmenuListIndex : contextMenuList"
                    @rowClick="contextmenuClick" />
            </context-menu>
        </div>
        <div class="tabs-context-right">
            <el-dropdown size="default" split-button @click="closeAll"
                @command="command=>handleControlItemClick(command)">
                <el-icon>
                    <CircleClose />
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="left">
                            <el-icon>
                                <Back />
                            </el-icon>
                            关闭左侧
                        </el-dropdown-item>
                        <el-dropdown-item command="right">
                            <el-icon>
                                <Right />
                            </el-icon>
                            关闭右侧
                        </el-dropdown-item>
                        <el-dropdown-item command="other">
                            <el-icon>
                                <Close />
                            </el-icon>
                            关闭其它
                        </el-dropdown-item>
                        <el-dropdown-item command="all">
                            <el-icon>
                                <CircleClose />
                            </el-icon>
                            全部关闭
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script lang="ts" setup>
import usePageStore from '@/stores/system-page';
import { ElMessage } from 'element-plus';
import { computed, onMounted, reactive, ref } from 'vue';
import contextMenu from '@/layout/components/tabs/components/contextMenu.vue'
import contextmenuList from '@/layout/components/tabs/components/contextmenuList.vue'
import { useRouter } from 'vue-router';

const pageStore = usePageStore()
const router = useRouter()

const contextmenuFlag = ref(false)
const contentmenuX = ref(0)
const contentmenuY = ref(0)
const tagName = ref('/index')
const contextmenuListIndex = reactive([
    { icon: 'CircleClose', title: '关闭全部', value: 'all' }
])
const contextMenuList = reactive([
    { icon: 'Refresh', title: '刷新', value: 'refresh' },
    { icon: 'Back', title: '关闭左侧', value: 'left' },
    { icon: 'Right', title: '关闭右侧', value: 'right' },
    { icon: 'Close', title: '关闭其它', value: 'other' },
    { icon: 'CircleClose', title: '关闭全部', value: 'all' }
])

// 所有打开页面
const opened = computed(() => {
    // 这里的数据就是从pinia取得
    return pageStore.opened
})
// 当前打开页面
const currentPage = computed(() => {
    // 这里的数据就是从pinia取得
    return pageStore.current
})
// 关闭所有页面函数
const closeAll = pageStore.closeAll

/**
 * @description 计算某个标签页是否可关闭
 * @param {Object} page 其中一个标签页
 */
const isTabClosable = (page: any) => {
    // console.log(page);
    return page.name !== 'index'
}
/**
 * @description 右键菜单功能点击
 * @param {Object} event 事件
 */
const handleContextmenu = (event: any) => {

    let target = event.target
    let flag = false
    if (target.className.indexOf('el-tabs__item') > -1) {
        flag = true
    } else if (target.parentNode.className.indexOf('el-tabs__item') > -1) {
        target = target.parentNode
        flag = true
    }
    if (flag) {
        event.preventDefault()
        event.stopPropagation()
        contentmenuX.value = event.clientX
        contentmenuY.value = event.clientY
        tagName.value = target.getAttribute('aria-controls').slice(5)
        contextmenuFlag.value = true
    }
}
/**
 * @description 右键菜单的 row-click 事件
 * @param {String} command 事件类型
 */
const contextmenuClick = (command: any) => {
    handleControlItemClick(command, tagName.value)
}
/**
 * @description 接收点击关闭控制上选项的事件
 * @param {String} command 事件类型
 * @param {String} tagName tab 名称
 */
const handleControlItemClick = (command: any, tagName: string | null = null) => {
    if (tagName) {
        contextmenuFlag.value = false
    }
    const params = { pageSelect: tagName }
    switch (command) {
        case 'refresh': router.push({ name: 'refresh' }); break
        case 'left': pageStore.closeLeft(params); break
        case 'right': pageStore.closeRight(params); break
        case 'other': pageStore.closeOther(params); break
        case 'all': pageStore.closeAll(); break
        default: ElMessage.error('无效的操作'); break
    }
}
/**
     * @description 接收点击 tab 标签的事件
     * @param {object} tab 标签
     * @param {object} event 事件
     */
const handleClick = (tab: any) => {
    // 找到点击的页面在 tag 列表里是哪个
    const page = pageStore.opened.find(page => page.fullPath === tab.props.name)
    if (page) {
        const { name, params, query } = page
        router.push({ name, params, query })
        pageStore.currentSet(page.fullPath)
    }
}
/**
 * @description 点击 tab 上的删除按钮触发这里
 * @param {String} tagName tab 名称
 */
const handleTabRemove = (tagName: any) => {
    pageStore.close({ tagName })
}

// onMounted() {
//     const el = document.querySelectorAll('.d2-multiple-page-sort .el-tabs__nav')[0]
//     Sortable.create(el, {
//         onEnd: (evt) => {
//             const { oldIndex, newIndex } = evt
//             this.openedSort({ oldIndex, newIndex })
//         }
//     })
// }

</script>
<style  lang="scss">
.tabs-content {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
}



.tabs-context-left {
    height: 100%;

    .multiple-page-context .el-tabs__nav .el-tabs__item {
        color: #ccc;
        background-color: #384857;
        border-left-color: #384857;
    }

    .multiple-page-context .el-tabs__nav .el-tabs__item.is-active {
        color: #384857;
        background-color: #fff;
        border-bottom-color: #fff;
    }

    .el-tabs--card>.el-tabs__header .el-tabs__nav {
        border: 1px solid #555555;
        border-bottom: none;
        border-radius: 2px 2px 0 0;
        box-sizing: border-box;
    }

    .el-tabs__header {
        padding: 0;
        position: relative;
        margin: 0 0 0px;
    }

}

// :deep(.multiple-page-context) {
//     .el-tabs {
//         .el-tabs__header {
//             .el-tabs__nav-wrap {
//                 .el-tabs__nav-scroll {
//                     .el-tabs__nav {
//                         .el-tabs__active-bar {
//                             display: none;
//                         }

//                         .el-tabs__item {
//                             text-align: center;
//                             color: #ccc;
//                             background-color: #384857;
//                             border-left-color: #384857;
//                         }

//                         .el-tabs__item.is-active {
//                             color: #384857;
//                             background-color: #fff;
//                             border-bottom-color: #fff;
//                         }
//                     }
//                 }
//             }
//         }

//         .el-tabs__nav-wrap::after {
//             display: none;
//         }
//     }
// }


.tabs-context-right {
    display: flex;
    margin-left: auto;
}
</style>