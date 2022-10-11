<!--
 * @Author: yifeng
 * @Date: 2022-09-15 20:29:04
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-10 20:07:08
 * @Description: 
-->
<template>
    <fs-page>
        <fs-crud ref="crudRef" custom-class="page-layout" v-bind="crudBinding">
            <template #cell-rowHandle-right="scope">
                <el-button class="row-handle-btn" type="warning" :title="scope.row.id" @click="editPermission(scope)">
                    <el-icon>
                        <Edit />
                    </el-icon>权限管理
                </el-button>
            </template>
            <el-drawer title="角色授权" v-model="rolePermissionShow" direction="rtl" size="70%" append-to-body="true">
                    <template #title>
                        <div>
                            当前角色<el-tag>{{roleObj?roleObj.name:'无'}}</el-tag>
                        </div>
                    </template>
                    <div>
                        <role-permission v-show="rolePermissionShow" :role-obj="roleObj"></role-permission>
                    </div>
                </el-drawer>
        </fs-crud>
    </fs-page>
</template>
    
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useCrud } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import { useExpose } from "@fast-crud/fast-crud";
import rolePermission from "@/views/system/rolePermission/rolePermission.vue"

export default defineComponent({
    name: "roleForm",
    components: { rolePermission },
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

        // 授权
        const roleObj = ref<any>({})
        const rolePermissionShow = ref<boolean>(false)
        const editPermission = (scope: any) => {
            roleObj.value = scope.row
            rolePermissionShow.value = true
        }

        return {
            crudBinding,
            crudRef,
            rolePermissionShow,
            editPermission,
            roleObj,
        };

    }
});
</script>