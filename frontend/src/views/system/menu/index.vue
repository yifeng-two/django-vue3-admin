<!--
 * @Author: yifeng
 * @Date: 2022-09-15 20:24:23
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-09 19:18:45
 * @Description: 
-->
<template>
    <fs-page>
        <fs-crud ref="crudRef" custom-class="page-layout" v-bind="crudBinding">
            <template #cell-rowHandle-right="scope">
                <el-button v-show="(scope.row.web_path && !scope.row.is_link)" class="row-handle-btn" type="success"
                    :title="scope.row.id" @click="editmenuButton(scope)">
                    <el-icon>
                        <EditPen />
                    </el-icon>菜单按钮
                </el-button>
            </template>
            <el-drawer v-model="drawerStatus" title="菜单按钮配置" :with-header="false" append-to-body="true" size="50%">
                <div slot="title">
                    <span>菜单按钮列表</span>
                    <el-tag style="margin-left: 10px" type="success">{{menuRow.name}}</el-tag>
                </div>
                <menu-button style="margin-top: 80px; padding-right: 20px;" :meun-catagory="menuRow" />
            </el-drawer>
        </fs-crud>
    </fs-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from "vue";
import { useCrud } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import { useExpose } from "@fast-crud/fast-crud";
import menuButton from "@/views/system/menuButton/index.vue"

export default defineComponent({
    name: "menuForm",
    components: {
        menuButton,
    },
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

        // 菜单按钮设置
        const drawerStatus = ref(false)
        let  menuRow = ref<any>({});//Ts写法
        const editmenuButton = (scope:any) => {
            console.log(scope);
            drawerStatus.value = true
            menuRow.value = scope.row
        }
        return {
            crudBinding,
            crudRef,
            drawerStatus,
            menuRow,
            editmenuButton
        };

    }
});
</script>