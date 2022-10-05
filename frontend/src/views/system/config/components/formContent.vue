<!--
 * @Author: yifeng
 * @Date: 2022-10-04 22:06:40
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-05 14:50:45
 * @Description: 
-->
<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="4">变量标题</el-col>
            <el-col :span="12">变量值</el-col>
            <el-col :span="4" :offset="4">变量名</el-col>
        </el-row>
        <el-form ref="configFormRef" :model="configForm" label-width="140px" label-position="left"
            style="margin-top: 20px">
            <el-form-item :label="item.title" :prop="['array'].indexOf(item.form_item_type_label) >-1?'':item.key"
                :key="index" :rules="item.rule || []" v-for="(item,index) in formList">
                <el-col :span="12" :offset="2">
                    <!--    文本      -->
                    <el-input :key="item.key" v-if="['text','textarea'].indexOf(item.form_item_type_label) >-1"
                        :type="item.form_item_type_label" v-model="form[item.key]" :placeholder="item.placeholder"
                        clearable></el-input>

                    <el-input-number :key="item.key" v-else-if="item.form_item_type_label === 'number'"
                        v-model="form[item.key]" :min="0"></el-input-number>
                    <!--     datetime、date、time     -->
                    <el-date-picker v-else-if="['datetime','date','time'].indexOf(item.form_item_type_label) >-1"
                        v-model="form[item.key]" :key="index" :type="item.form_item_type_label"
                        :placeholder="item.placeholder">
                    </el-date-picker>
                    <!--    select      -->
                    <el-select :key="item.key" v-else-if="item.form_item_type_label === 'select'"
                        v-model="form[item.key]" :placeholder="item.placeholder" clearable>
                        <el-option v-for="item in dictionary(item.setting)  || []" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!--    checkbox      -->
                    <el-checkbox-group :key="item.key" v-else-if="item.form_item_type_label === 'checkbox'"
                        v-model="form[item.key]" :placeholder="item.placeholder">
                        <el-checkbox v-for="item in dictionary(item.setting)  || []" :key="item.value"
                            :label="item.value" :value="item.value">
                            {{ item.label }}
                        </el-checkbox>
                    </el-checkbox-group>
                    <!--    radio      -->
                    <el-radio-group :key="item.key" v-else-if="item.form_item_type_label === 'radio'"
                        v-model="form[item.key]" :placeholder="item.placeholder" clearable>
                        <el-radio v-for="item in dictionary(item.setting)  || []" :key="item.value" :label="item.label"
                            :value="item.value">
                            {{ item.label }}
                        </el-radio>
                    </el-radio-group>
                    <!--    switch      -->
                    <el-switch :key="item.key" v-else-if="item.form_item_type_label === 'switch'"
                        v-model="form[item.key]" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                    <!--     图片     -->
                    <div v-else-if="['img','imgs'].indexOf(item.form_item_type_label) >-1" :key="item.key">
                        <el-upload :action="uploadUrl" :headers="uploadHeaders" name="file" :accept="'image/*'"
                            :on-preview="handlePictureCardPreview"
                            :on-success="(response, file, fileList)=>{handleUploadSuccess(response, file, fileList,item.key)}"
                            :on-error="handleError" :on-exceed="handleExceed"
                            :before-remove="(file, fileList)=>{beforeRemove(file, fileList, item.key)}"
                            :multiple="item.form_item_type_label!=='img'" :limit="item.form_item_type_label==='img'?1:5"
                            :ref="'imgUpload_'+item.key" :data-keyname="item.key" :file-list="item.value?item.value:[]"
                            list-type="picture-card">
                            <i class="el-icon-plus"></i>
                            <div slot="tip" class="el-upload__tip">选取图片后,需手动上传到服务器,并且只能上传jpg/png文件</div>
                        </el-upload>
                        <el-dialog :visible.sync="dialogImgVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                    <!--     文件     -->
                    <div v-else-if="['file'].indexOf(item.form_item_type_label) >-1" :key="item.key">
                        <el-upload :action="uploadUrl" :headers="uploadHeaders" name="file"
                            :on-preview="handlePictureCardPreview"
                            :on-success="(response, file, fileList)=>{handleUploadSuccess(response, file, fileList,item.key)}"
                            :on-error="handleError" :on-exceed="handleExceed"
                            :before-remove="(file, fileList)=>{beforeRemove(file, fileList, item.key)}" :limit="5"
                            :ref="'fileUpload_'+item.key" :data-keyname="item.key" :file-list="item.value"
                            list-type="picture-card">
                            <i class="el-icon-plus"></i>
                            <div slot="tip" class="el-upload__tip">选取图片后,需手动上传到服务器,并且只能上传jpg/png文件</div>
                        </el-upload>
                        <el-dialog :visible.sync="dialogImgVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                    <!--    关联表      -->
                    <!-- <div v-else-if="['foreignkey','manytomany'].indexOf(item.form_item_type_label) >-1" :key="index">
                        <table-selector v-model="form[item.key]" :el-props='{
                        pagination: true,
                        columns: item.setting.searchField}' :dict="{
                  url:'/api/system/system_config/get_table_data/'+item.id+'/',
                   value: item.setting.primarykey,
                    label: item.setting.field,
                }" :pagination="true" :multiple="item.form_item_type_label ==='manytomany'"></table-selector>
                    </div> -->
                    <!--   数组       -->
                    <!-- <div v-else-if="item.form_item_type_label==='array'" :key="index">
                        <vxe-table border resizable auto-resize show-overflow keep-source :ref="'xTable_'+item.key"
                            height="200" :edit-rules="validRules"
                            :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
                            <vxe-column field="title" title="标题" :edit-render="{autofocus: '.vxe-input--inner'}">
                                <template #edit="{ row }">
                                    <vxe-input v-model="row.title" type="text"></vxe-input>
                                </template>
                            </vxe-column>
                            <vxe-column field="key" title="键名" :edit-render="{autofocus: '.vxe-input--inner'}">
                                <template #edit="{ row }">
                                    <vxe-input v-model="row.key" type="text"></vxe-input>
                                </template>
                            </vxe-column>
                            <vxe-column field="value" title="键值" :edit-render="{}">
                                <template #edit="{ row }">
                                    <vxe-input v-model="row.value" type="text"></vxe-input>
                                </template>
                            </vxe-column>
                            <vxe-column title="操作" width="100" show-overflow>
                                <template #default="{ row,index }">
                                    <el-popover placement="top" width="160" v-model="childRemoveVisible">
                                        <p>删除后无法恢复,确定删除吗？</p>
                                        <div style="text-align: right; margin: 0">
                                            <el-button size="mini" type="text" @click="childRemoveVisible = false">取消
                                            </el-button>
                                            <el-button type="primary" size="mini" @click="onRemoveChild(row,index)">确定
                                            </el-button>
                                        </div>
                                        <el-button type="text" slot="reference">删除</el-button>
                                    </el-popover>
                                </template>
                            </vxe-column>
                        </vxe-table>
                        <div>
                            <el-button size="mini" @click="onAppend('xTable_'+item.key)">追加</el-button>
                        </div>
                    </div> -->
                </el-col>
                <el-col :span="4" :offset="6">{{ props.editableTabsItem.key }}.{{ item.key }}</el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script lang="ts" setup>

import { nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus'

import * as api from '@/apis'
import { AXIOS_BASE_URL } from '@/configs';
import cookies from '@/utils/common/cookies';
// import tableSelector from '@/components/table-selector/table-selector'

// inject: ['refreshView'],
const props = defineProps({
    options: {
        type: Object
    },
    editableTabsItem: {
        type: Object
    }
})

const configFormState = reactive({
    configForm: {},
    formList: []
})
const { configForm, formList } = toRefs(configFormState)
const configFormRef = ref<FormInstance>()
const childTableData = ref([])
const childRemoveVisible = ref(false)
const validRules = reactive<FormRules>({
    title: [
        {
            required: true,
            message: '必须填写'
        }
    ],
    key: [
        {
            required: true,
            message: '必须填写'
        }
    ],
    value: [
        {
            required: true,
            message: '必须填写'
        }
    ]
})
const uploadUrl = ref(AXIOS_BASE_URL + 'api/system/file/')
const uploadHeaders = ref({
    Authorization: 'JWT ' + cookies.get('token')
})
const dialogImageUrl = ref('')
const dialogImgVisible = ref(false)
const uploadImgKey = ref(null)
// onMounted(() => {
//     getInit()
//     console.log(formList)
// })

// 获取数据
const getInit = async () => {
    const res = await api.getSysConfigList({ parent: props.options.id })
    const { data } = res.data
    configFormState.formList = data
    const form = {}
    for (const item of data) {
        const key = item.key
        if (item.value) {
            form[key] = item.value
        } else {
            if ([5, 12, 14].indexOf(item.form_item_type) !== -1) {
                form[key] = []
            } else {
                form[key] = undefined
            }
        }
        // if (item.form_item_type_label === 'array') {
        //    nextTick(() => {
        //         const tableName = 'xTable_' + key
        //         const $table = this.$refs[tableName][0]
        //         $table.loadData(item.chinldern)
        //     })
        // }
    }
    configFormState.configForm = JSON.parse(JSON.stringify(form))
}
watch(
    () => props.options,
    (newValue, oldValue) => {
        if (newValue && newValue.id) {
            getInit()
        }
    }, { immediate: true }
)
// 提交数据
const onSubmit = () => {
    const that = this
    const form = JSON.parse(JSON.stringify(this.form))
    const keys = Object.keys(form)
    const values = Object.values(form)
    for (const index in this.formList) {
        const item = this.formList[index]
        // eslint-disable-next-line camelcase
        const form_item_type_label = item.form_item_type_label

        // eslint-disable-next-line camelcase
        if (form_item_type_label === 'array') {
            const parentId = item.id
            const tableName = 'xTable_' + item.key
            const $table = this.$refs[tableName][0]
            const { tableData } = $table.getTableData()
            for (const child of tableData) {
                if (!child.id && child.key && child.value) {
                    child.parent = parentId
                    child.id = null
                    this.formList.push(child)
                }
            }
            // 必填项的判断
            for (const arr of item.rule) {
                if (arr.required && tableData.length === 0) {
                    that.$message.error(item.title + '不能为空')
                    return
                }
            }
            item.value = tableData
        }
        // 赋值操作
        keys.map((mapKey, mapIndex) => {
            if (mapKey === item.key) {
                if (item.form_item_type_label !== 'array') {
                    item.value = values[mapIndex]
                }
                // 必填项的验证
                if (['img', 'imgs'].indexOf(item.form_item_type_label) > -1) {
                    for (const arr of item.rule) {
                        if (arr.required && item.value === null) {
                            that.$message.error(item.title + '不能为空')
                            return
                        }
                    }
                }
            }
        })
    }
    that.$refs.form.clearValidate()
    that.$refs.form.validate((valid) => {
        if (valid) {
            api.saveContent(this.options.id,
                this.formList).then(res => {
                    this.$message.success('保存成功')
                    this.refreshView()
                })
        } else {
            console.log('error submit!!')
            return false
        }
    })
}
// 追加
// const onAppend = async (tableName) => {
//     const $table = this.$refs[tableName][0]
//     const { tableData } = $table.getTableData()
//     const tableLength = tableData.length
//     if (tableLength === 0) {
//         const { row: newRow } = $table.insert()
//         console.log(newRow)
//     } else {
//         const errMap = await $table.validate().catch(errMap => errMap)
//         if (errMap) {
//             ElMessage.error('校验不通过！')
//         } else {
//             const { row: newRow } = $table.insert()
//             console.log(newRow)
//         }
//     }
// }
// 子表删除
const onRemoveChild = (row, index) => {
    if (row.id) {
        console.log(1, 'ok')
    } else {
        childTableData.splice(index, 1)
    }
}
// 图片预览
const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url
    dialogImgVisible.value = true
}
// 判断是否为图片
// 封装一个判断图片文件后缀名的方法
const isImage = (fileName) => {
    if (typeof fileName !== 'string') return
    const name = fileName.toLowerCase()
    return name.endsWith('.png') || name.endsWith('.jpeg') || name.endsWith('.jpg') || name.endsWith('.png') || name.endsWith('.bmp')
}
// 上传成功
const handleUploadSuccess = (response, file, fileList, imgKey) => {
    // const that = this
    const {
        code,
        msg
    } = response
    if (code === 2000) {
        const { url } = response.data
        const { name } = file
        const type = isImage(name)
        if (!type) {
            ElMessage.error('只允许上传图片')
        } else {
            const uploadImgKey = configFormState.configForm[imgKey]
            if (!uploadImgKey || uploadImgKey === '') {
                configFormState.configForm[imgKey] = []
            }
            // console.log(len)
            const dict = {
                name: name,
                url: AXIOS_BASE_URL + url
            }
            configFormState.configForm[imgKey].push(dict)
        }
    } else {
        ElMessage.error('上传失败,' + JSON.stringify(msg))
    }
}
// 上传失败
const handleError = () => {
    ElMessage.error('上传失败')
}
// 上传超出限制
const handleExceed = () => {
    ElMessage.error('超过文件上传数量')
}
// 删除时的钩子
const beforeRemove = (file, fileList, key) => {
    var index = 0
    configFormState.configForm[key].map((value, inx) => {
        if (value.uid === file.uid) index = inx
    })
    configFormState.configForm[key].splice(index, 1)
}
</script>
  
<style scoped>

</style>