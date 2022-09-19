<!--
 * @Author: yifeng
 * @Date: 2022-09-15 20:29:51
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-19 22:31:09
 * @Description: 
-->
<template>
  <fs-page>
    <fs-crud ref="crudRef" custom-class="page-layout" v-bind="crudBinding"> </fs-crud>
  </fs-page>
</template>
  
<script>
import { defineComponent, ref, onMounted } from "vue";
import { useCrud } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import { useExpose } from "@fast-crud/fast-crud";
import useDictStore from '@/stores/system-dict'
export default defineComponent({
  name: "FormLayoutFlex",
  setup() {
    const dictStore = useDictStore()
    dictStore.load()
    
    console.log('load dicts', dictStore.dicts);
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
      crudRef
    };

  }
});
</script>