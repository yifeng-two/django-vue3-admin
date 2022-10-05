<!--
 * @Author: yifeng
 * @Date: 2022-10-02 17:25:06
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-05 15:14:08
 * @Description: 
-->
<template>
    <div ref="contextmenu" class="contextmenu" v-show="flag" :style="style">
        <slot></slot> <!-- 插槽出口 -->
    </div>
</template>
  
<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue'

const proxy = getCurrentInstance()
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    x: {
        type: Number,
        default: 0
    },
    y: {
        type: Number,
        default: 0
    }
})
const contextmenu = ref(null)

let $emit = defineEmits(['update:visible'])
const flag = computed({
    get: () => {
        if (props.visible) {
            // 注册全局监听事件 [ 目前只考虑鼠标解除触发 ]
            window.addEventListener('mousedown', watchContextmenu)
        }
        return props.visible
    },
    set: (newVal) => {
        $emit('update:visible', newVal)
    }
})

const style = computed(() => {
    // console.log(String(toRef(props,'x') )+ 'px',props.y+ 'px',)
    return {
        position: 'fixed',
        left: props.x + 'px',
        top: props.y + 'px',
        display: props.visible ? 'block' : 'none '
    }
})

const watchContextmenu = (event) => {
    // console.log('watchContextmenu',event.target);
    if (!proxy.ctx.$el.contains(event.target) || event.button !== 0) {
        flag.value = false
    }
    window.removeEventListener('mousedown', watchContextmenu)
}
onMounted(() => {
    // 将菜单放置到body下
    // document.querySelector('body').appendChild(this.$refs.contextmenu)
    // const body = document.querySelector("body");
    // if (body.append) {
    //     body.append(contextmenu);
    // } else {
    //     body.appendChild(contextmenu);
    // }
}) 
</script>
  
<style>
.contextmenu {
    position: absolute;
    padding: 5px 0;
    z-index: 2018;
    background-color: #FFF;
    border: 1px solid #cfd7e5;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
}
</style>