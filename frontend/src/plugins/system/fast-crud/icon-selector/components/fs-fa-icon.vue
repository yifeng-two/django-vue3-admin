<!--
 * @Author: yifeng
 * @Date: 2022-10-16 13:30:05
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-16 14:33:09
 * @Description: 
-->
<template>
    <i ref="faIconRef" class="fa" :class="`fa-${icon}`" aria-hidden="true"></i>
</template>
<script lang="ts">
import { defineComponent, nextTick, onMounted, ref, unref, watch } from "vue";
/**
 * iconify 按需加载图标组件
 * https://iconify.design/icon-sets/ion/
 */
export default defineComponent({
    name: "FsFaIcon",
    props: {
        /**
         * 图标名称
         */
        icon: {
            type: String
        },
    },
    setup(props) {
        const faIconRef = ref(null);

        const update = async () => {
            if (!props.icon) return;

            const el: any = unref(faIconRef);
            if (!el) return;

            await nextTick();
            const span: any = document.createElement("i");
            span.className = "fa fa-"+ props.icon;
            // el.appendChild(span);
        };

        watch(() => props.icon, update, { flush: "post" });

        onMounted(update);

        return { faIconRef };
    }
});
</script>
<style lang="scss">
.fa{
    vertical-align: middle;
    margin-right: 5px;
    text-align: center;
    font-size: 18px;
}
</style>