<!--
 * @Author: yifeng
 * @Date: 2022-09-15 20:26:20
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-05 15:19:24
 * @Description: 
-->
<template>
    <fs-page>
        <fs-crud ref="crudRef" custom-class="page-layout" v-bind="crudBinding">
        </fs-crud>
    </fs-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import createCrudOptions from "./crud";
import { useExpose,useCrud } from "@fast-crud/fast-crud";
export default defineComponent({
    name: "menuButton",
    props: {
        // 容器样式
        meunCatagory: {
            type: Object,
            required: true,
            default: {}
        },
    },
    // emits: ["update:dictionaryRow"],
    setup(props, ctx) {
        // crud组件的ref
        const crudRef = ref();
        // crud 配置的ref
        const crudBinding = ref();
        // 暴露的方法
        const { expose } = useExpose({ crudRef, crudBinding });
        // 你的crud配置
        const { crudOptions } = createCrudOptions({ expose, props, ctx });
        // 初始化crud配置
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
        const { resetCrudOptions } = useCrud({ expose, crudOptions });
        // 你可以调用此方法，重新初始化crud配置
        // resetCrudOptions(options)
        // 页面打开后获取列表数据
        onMounted(() => {
            expose.doRefresh();
        });
        // 字典配置
        //你的业务代码
        watch(
            () => props.meunCatagory,
            (currentValue, prevValue) => {
                /* ... */
                // console.log(currentValue, prevValue);
                expose.doRefresh();
            },
            //深度监听
            { deep: true }
        )
        return {
            crudBinding,
            crudRef,
            // setSearchFormData: expose.setSearchFormData,
            // doRefresh: expose.doRefresh
        };
    }
});
</script>