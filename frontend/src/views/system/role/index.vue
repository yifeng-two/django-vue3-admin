<!--
 * @Author: yifeng
 * @Date: 2022-09-15 20:29:04
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-27 22:54:58
 * @Description: 
-->
<template>
    <fs-page>
        <fs-crud ref="crudRef" custom-class="page-layout" v-bind="crudBinding">
            <template #cell-rowHandle-right="scope">
                <el-button class="row-handle-btn" type="warning" :title="scope.row.id"
                    @click="createPermission(scope)">
                    权限管理</el-button>
                <el-drawer title="角色授权" v-model="rolePermissionShow" direction="rtl" size="70%">
                    <template slot="title">
                        <div>
                            当前角色<el-tag>{{roleObj?roleObj.name:'无'}}</el-tag>
                        </div>
                    </template>
                    <div>
                        <rolePermission v-if="rolePermissionShow" :role-obj="roleObj"></rolePermission>
                    </div>
                </el-drawer>
            </template>
        </fs-crud>
    </fs-page>
</template>
    
<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from "vue";
import { useCrud } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import { useExpose } from "@fast-crud/fast-crud";
import useDictStore from '@/stores/system-dict'
import { ElMessage, FormInstance } from "element-plus";
// md5加密
import md5 from 'js-md5'
import * as api from "@/apis"

export default defineComponent({
    name: "roleForm",
    setup() {
        const dictStore = useDictStore()
        dictStore.load()
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
        const rolePermissionShow = ref(false)
        const createPermission = (scope: { row: any; }) =>{
            roleObj = scope.row
            rolePermissionShow.value = true
            // this.$router.push({
            //   name: 'rolePermission',
            //   params: { id: scope.row.id }
            // })
        }

        return {
            crudBinding,
            crudRef,
            rolePermissionShow,
            createPermission
        };

    }
});
</script>