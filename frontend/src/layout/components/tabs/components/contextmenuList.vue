<!--
 * @Author: yifeng
 * @Date: 2022-10-02 17:25:16
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-03 23:05:29
 * @Description: 
-->
<template>
    <div class="contentmenu-list" @click="rowClick">
        <div v-for="item in menulist" :key="item.value" :data-value="item.value" class="contentmenu-item"
            flex="cross:center main:center">
            <el-icon v-if="item.icon">
                <component :is="item.icon" />
            </el-icon>
            <div class="contentmenu-item-title" flex-box="1">
                {{item.title}}
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>

const props = defineProps({
    menulist: {
        type: Array,
        default: () => []
    }
})
// const menulist = reactive([
//     { icon: 'CircleClose', title: '关闭全部', value: 'all' }
// ])
let $emit = defineEmits(['rowClick'])
const rowClick = (event:any) => {
    let target = event.target
    while (!target.dataset.value) {
        target = target.parentNode
    }
    // console.log('target.dataset.value',target.dataset.value);
    $emit('rowClick', target.dataset.value)
}
</script>
  
<style lang="scss">
.contentmenu-list {
    .contentmenu-item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px 20px 8px 15px;
        margin: 0;
        font-size: 15px;
        color: #606266;
        cursor: pointer;

        &:hover {
            background: #ecf5ff;
            color: #66b1ff;
        }

        .contentmenu-item-title {
            margin-left: 10px;
        }
    }
}
</style>