<!--
 * @Author: yifeng
 * @Date: 2022-09-15 20:24:56
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-09 19:21:40
 * @Description: 
-->
<template>
    <fs-page>
        <fs-crud ref="crudRef" custom-class="page-layout" v-bind="crudBinding">
            <template #cell-rowHandle-right="scope">
                <el-button class="row-handle-btn" type="success" :title="scope.row.id"
                    @click="editDictbyCatagory(scope)">
                    <el-icon>
                        <EditPen />
                    </el-icon>字典配置
                </el-button>
            </template>
            <el-drawer v-model="drawerStatus" title="字典配置" :with-header="false" append-to-body="true"
                size="50%">
                <div slot="title">
                    <span>字典列表</span>
                    <el-tag  style="margin-left: 10px" type="success">{{dictionaryRow.label}}</el-tag>
                </div>
                <sub-dictionary style="margin-top: 80px; padding-right: 20px;" :catagory-dict="dictionaryRow" />
            </el-drawer>
        </fs-crud>
    </fs-page>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from "vue";
import { useCrud } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import { useExpose } from "@fast-crud/fast-crud";
import subDictionary from "./subDictionary/index.vue"
export default defineComponent({
    name: "dictionary",
    components: { subDictionary },
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
        // 字典配置
        const drawerStatus = ref<boolean>(false)
        let  dictionaryRow = ref<any>({});//Ts写法
        const editDictbyCatagory = (scope: any) => {
            dictionaryRow.value = scope.row
            drawerStatus.value = true
            // console.log(dictionaryRow);
        }
        
        return {
            crudBinding,
            crudRef,
            drawerStatus,
            dictionaryRow,
            editDictbyCatagory
        };
    }
});
</script>