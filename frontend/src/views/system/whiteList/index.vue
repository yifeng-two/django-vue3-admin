<!--
 * @Author: yifeng
 * @Date: 2022-09-15 20:30:27
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-16 21:17:42
 * @Description: 
-->
<template>
    <fs-page>
        <fs-crud ref="crudRef" custom-class="page-layout" v-bind="crudBinding">
        </fs-crud>
    </fs-page>
</template>
    
<script lang="ts">
import { defineComponent, ref, onMounted, getCurrentInstance } from "vue";
import { useCrud } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import { useExpose } from "@fast-crud/fast-crud";
import rolePermission from "@/views/system/rolePermission/rolePermission.vue"

export default defineComponent({
    name: "apiWhiteList",
    setup() {
        // crud组件的ref
        const crudRef = ref();
        // crud 配置的ref
        const crudBinding = ref();
        // 暴露的方法
        const { expose } = useExpose({ crudRef, crudBinding });
        // 你的crud配置
        const { crudOptions } = createCrudOptions({ expose});
        // 初始化crud配置
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
        const { resetCrudOptions } = useCrud({ expose, crudOptions });
        // 你可以调用此方法，重新初始化crud配置
        // resetCrudOptions(options)
        // 页面打开后获取列表数据
        onMounted(() => {
            expose.doRefresh();
        });

        return {
            crudBinding,
            crudRef,
        };

    }
});
</script>