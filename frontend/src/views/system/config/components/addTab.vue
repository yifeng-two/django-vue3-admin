<!--
 * @Author: yifeng
 * @Date: 2022-10-05 21:26:44
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-07 17:31:22
 * @Description: 
-->
<template>
    <div>
        <el-form ref="addTabFormRef" :model="addTabForm" :rules="addTabRules" label-width="80px">
            <el-form-item label="标题" prop="title">
                <el-input v-model="addTabForm.title"></el-input>
            </el-form-item>
            <el-form-item label="key值" prop="key">
                <el-input v-model="addTabForm.key"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit(addTabFormRef)">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script lang="ts" setup>
import * as api from '@/apis/system'
import { inject, reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus'
const refreshView = inject['refreshView']
const addTabForm = reactive({
    title: null,
    key: null
})
const addTabFormRef = ref<FormInstance>()

const addTabRules = reactive<FormRules>({
    title: [
        {
            required: true,
            message: '请输入'
        }
    ],
    key: [
        {
            required: true,
            message: '请输入'
        },
        {
            pattern: /^[A-Za-z0-9]+$/,
            message: '只能是英文和数字'
        }
    ]
})
const onSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            api.createConfig(addTabForm).then(res => {
                ElMessage.success('新增成功')
                refreshView()
            })
        } else {
            console.log('error submit!!')
            return false
        }
    })
}

</script>
  
<style scoped>

</style>
  