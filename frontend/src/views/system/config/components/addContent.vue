<!--
 * @Author: yifeng
 * @Date: 2022-10-04 22:06:40
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-07 17:31:18
 * @Description: 
-->
<template>
    <div style="padding: 20px">
        <el-form ref="addContentFormRef" :model="addContentForm" :rules="addContentFormRules" label-width="80px">
            <el-form-item label="所属分组" prop="parent">
                <el-select v-model="addContentForm.parent" placeholder="请选择分组" clearable>
                    <el-option v-for="(item,index) in parentOptions" :key="index" :label="item.title" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model="addContentForm.title" placeholder="请输入" clearable></el-input>
            </el-form-item>
            <el-form-item label="key值" prop="key">
                <el-input v-model="addContentForm.key" placeholder="请输入" clearable></el-input>
            </el-form-item>
            <el-form-item label="表单类型" prop="form_item_type">
                <el-select v-model="addContentForm.form_item_type" placeholder="请选择" clearable>
                    <el-option v-for="(item,index) in configFormType" :key="index" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="[4,5,6].indexOf(addContentForm.form_item_type)>-1" label="字典key" prop="setting"
                :rules="[{required: true,message: '不能为空'}]">
                <el-input v-model="addContentForm.setting" placeholder="请输入dictionary中key值" clearable></el-input>
            </el-form-item>
            <div v-if="[13,14].indexOf(addContentForm.form_item_type)>-1">
                <associationTable ref="associationTableForm" v-model="addContentForm.setting"
                    @updateVal="associationTableUpdate">
                </associationTable>
            </div>
            <el-form-item label="校验规则">
                <el-select v-model="addContentForm.rule" multiple placeholder="请选择(可多选)" clearable>
                    <el-option :label="item.label" :value="item.value" :key="index" v-for="(item,index) in ruleOptions">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="提示信息" prop="placeholder">
                <el-input v-model="addContentForm.placeholder" placeholder="请输入" clearable></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input-number v-model="addContentForm.sort" :min="0" :max="99"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit(addContentFormRef)">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script lang="ts" setup>
import * as api from '@/apis/system'
import { onMounted, reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import associationTable from './associationTable.vue'
import useDictStore from '@/stores/system-dict';
const dictStore = useDictStore()
const configFormType = dictStore.dicts['config_form_type']

// inject: ['refreshView'],

const addContentFormRef = ref<FormInstance>()
const addContentForm = ref({
    parent: null,
    title: null,
    key: null,
    form_item_type: null,
    rule: null,
    placeholder: null
})
const addContentFormRules = reactive<FormRules>({
    parent: [
        {
            required: true,
            message: '请选择'
        }
    ],
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
            pattern: /^[A-Za-z0-9_]+$/,
            message: '请输入数字、字母或下划线'
        }
    ],
    form_item_type: [
        {
            required: true,
            message: '请输入'
        }
    ]
})
// 父级内容
const parentOptions =ref<any>()
const getParent = async () => {
    const res = await api.getSysConfigList({
        parent__isnull: true,
        limit: 999
    });
    const { data } = res.data;
    parentOptions.value = data
    return parentOptions
}
onMounted(()=>{
    getParent()
})

const ruleOptions = reactive([
    {
        label: '必填项',
        value: '{"required": true, "message": "必填项不能为空"}'
    },
    {
        label: '邮箱',
        value: '{ "type": "email", "message": "请输入正确的邮箱地址"}'
    },
    {
        label: 'URL地址',
        value: '{ "type": "url", "message": "请输入正确的URL地址"}'
    }
])

// 提交
const onSubmit = (formEl: FormInstance | undefined) => {
    associationTableUpdate().then(() => {
        const form = JSON.parse(JSON.stringify(addContentForm))
        const rules = []
        for (const item of form.rule) {
            const strToObj = JSON.parse(item)
            rules.push(strToObj)
        }
        form.rule = rules
        if (!formEl) return
        formEl.validate((valid) => {
            if (valid) {
                api.createConfig(form).then(res => {
                    ElMessage.success('新增成功')
                    //    refreshView()
                })
            } else {
                console.log('error submit!!')
                return false
            }
        })
    })
}
// 关联表数据更新
const associationTableForm = ref(null)
const associationTableUpdate = () => {
    return new Promise(function (resolve, reject) {
        if (associationTableForm) {
            if (!associationTableForm.onSubmit()) {
                // eslint-disable-next-line prefer-promise-reject-errors
                return reject(false)
            }
            const { formObj } = associationTableForm
            addContentForm.setting = formObj
            return resolve(true)
        } else {
            return resolve(true)
        }
    })
}
</script>
  
<style scoped>

</style>
  