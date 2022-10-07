<!--
 * @Author: yifeng
 * @Date: 2022-09-15 20:25:30
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-07 18:49:19
 * @Description: 
-->
<template>
    <fs-page>
        <fs-crud ref="crudRef" custom-class="page-layout" v-bind="crudBinding">
        </fs-crud>
    </fs-page>
</template>
  
<script lang="ts">

import { useCrud, useExpose } from '@fast-crud/fast-crud';
import { defineComponent, onMounted, ref } from 'vue';
import createCrudOptions from "./crud";

export default defineComponent({
    name: 'loginLog',
    setup() {
        // crud组件的ref
        const crudRef = ref();
        // crud 配置的ref
        const crudBinding = ref();
        // 暴露的方法
        const { expose } = useExpose({ crudRef, crudBinding });
        // 你的crud配置
        const { crudOptions } = createCrudOptions({ expose });
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
  