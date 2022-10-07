<!--
 * @Author: yifeng
 * @Date: 2022-10-05 21:49:25
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-07 17:31:20
 * @Description: 
-->
<template>
    <div>
        <el-form :model="associationForm" ref="associationFormRef">
            <el-form-item label="关联表" prop="table" :rules="[
              { required: true, message: '必填项', trigger: 'blur' }
            ]">
                <el-select v-model="associationForm.table" filterable clearable placeholder="请选择"
                    @change="handleChange">
                    <el-option v-for="item in tableOptions" :key="item.table" :label="item.tableName"
                        :value="item.table">
                        <span style="float: left">{{ item.tableName }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.table }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="显示字段" prop="field" :rules="[
              { required: true, message: '必填项', trigger: 'blur' }
            ]">
                <el-select v-model="associationForm.field" filterable clearable placeholder="请选择">
                    <el-option v-for="item in labelOptions" :key="item.table" :label="item.title" :value="item.field">
                        <span style="float: left">{{ item.field }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.title }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="储存字段" prop="primarykey" :rules="[
              { required: true, message: '必填项', trigger: 'blur' }
            ]">
                <el-select v-model="associationForm.primarykey" filterable clearable placeholder="请选择">
                    <el-option v-for="(item,index) in labelOptions" :key="index" :label="item.title"
                        :value="item.field">
                        <span style="float: left">{{ item.field }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.title }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="过滤条件" prop="oldSearchField" :rules="[
              { required: true, message: '必填项', trigger: 'blur' }
            ]">
                <el-select v-model="associationForm.oldSearchField" multiple filterable clearable placeholder="请选择"
                    @change="handleSearch">
                    <el-option v-for="(item,index) in labelOptions" :key="index" :label="item.title"
                        :value="item.field">
                        <span style="float: left">{{ item.field }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.title }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script lang="ts" setup>
import * as api from '@/apis/system'
import { FormInstance } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
const props = defineProps({
    value: {
        type: Object
    }
})
const associationForm = reactive({
    table: null,
    primarykey: '',
    field: '',
    searchField: [],
    oldSearchField: null
})
const associationFormRef = ref<FormInstance>()
const searchField = ref(null)
const tableOptions = ref([])
const labelOptions = ref([])
// 初始化数据
const init = () => {
    api.getAssociationTable().then(res => {
        const { data } = res
        tableOptions.value = data
        // 设置默认选中
        associationForm.table = data[0].table
        labelOptions.value = data[0].tableFields
        associationForm.primarykey = 'id'
        associationForm.field = 'id'
    })
}
// 选中事件
const handleChange = (val) => {
    const { tableFields } = tableOptions.find(item => {
        return item.table === val
    })
    labelOptions.value = tableFields
}
// 过滤条件选中
const handleSearch = (val) => {
    const fields = labelOptions.value.filter(item => {
        return val.indexOf(item.field) > -1
    })
    associationForm.searchField = fields
}
// 更新数据
let $emit = defineEmits(['updateVal'])
const handleUpdate = () => {
    $emit('updateVal', associationForm)
}
// 数据验证
const onSubmit = (formEl: FormInstance | undefined) => {
    let res = false
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            res = true
        } else {
            return false
        }
    })
    return res
}
onMounted(() => {
    init()
})
    // model: {
    //     prop: 'value',
    //     event: 'updateVal'
    // },
</script>
  
<style scoped>

</style>
  
