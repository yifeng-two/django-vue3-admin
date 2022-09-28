<!--
 * @Author: yifeng
 * @Date: 2022-09-15 20:29:51
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-25 19:35:32
 * @Description: 
-->
<template>
  <fs-page>
    <fs-crud ref="crudRef" custom-class="page-layout" v-bind="crudBinding">
      <template #cell-rowHandle-right="scope">
        <el-button class="row-handle-btn" type="danger" :title="scope.row.id" @click="resetPassword(scope.row.id)">
          <el-icon><RefreshLeft /></el-icon>
          密码重置</el-button>
        <el-dialog title="密码重置" v-model="selectResetDialogVisible" :close-on-click-modal="false" width="30%" append-to-body="true">
          <el-form ref="resetPwdFormRef" :model="resetPwdForm" :rules="pwd2Rule" label-position="top">
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="resetPwdForm.pwd" type="password" show-password clearable autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item label="再次输入密码" prop="pwd2">
              <el-input v-model="resetPwdForm.pwd2" type="password" show-password clearable autocomplete="off">
              </el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="selectResetDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="resetPwdSubmit(resetPwdFormRef)">重 置</el-button>
            </span>
          </template>
        </el-dialog>
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
  name: "userForm",
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
    // 重置密码
    const selectResetDialogVisible = ref(false)
    const resetPwdFormRef = ref<FormInstance>()
    let resetPwdForm = reactive({
      id: '',
      pwd: '',
      pwd2: '',
    })
    const validatePass = (rule: any, value: any, callback: any) => {
      const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{6,30}')
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!pwdRegex.test(value)) {
        callback(new Error('您的密码复杂度太低(密码中必须包含字母、数字)'))
      } else {
        // if (resetPwd2Form.pwd2 !== '') {
        //   resetPwd2FormRef.value.validateField('pwd2', () => null)
        // }
        if (resetPwdForm.pwd2 !== '') {
          if (!resetPwdFormRef.value) return
          resetPwdFormRef.value.validateField('pwd2', () => null)
        }
        callback()
      }
    }
    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== resetPwdForm.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const pwd2Rule = reactive({
      pwd: [
        { required: true, message: '必填项' },
        { validator: validatePass, trigger: 'blur' }
      ],
      pwd2: [
        { required: true, message: '必填项' },
        { validator: validatePass2, trigger: 'blur' }
      ]
    })
    // 重置密码弹框
    const resetPassword = (id: string) => {
      selectResetDialogVisible.value = true
      resetPwdForm.id = id
    }
    const resetPwdSubmit = (formEL: FormInstance | undefined) => {
      if (!formEL) {
        return
      } else {
        formEL.validate((valid) => {
          if (valid) {
            const params = {
              id: resetPwdForm.id,
              newPassword: md5(resetPwdForm.pwd),
              newPassword2: md5(resetPwdForm.pwd2),
            }
            api.resetPassword(params).then((res) => {
              selectResetDialogVisible.value = false
              resetPwdForm = {
                id: '',
                pwd: '',
                pwd2: ''
              }
              ElMessage.success('修改成功')
            })

          } else {
            ElMessage.error('表单校验失败，请检查')
          }
        })
      }
    }
    return {
      crudBinding,
      crudRef,
      selectResetDialogVisible,
      pwd2Rule,
      resetPwdForm,
      resetPwdFormRef,
      resetPassword,
      resetPwdSubmit
    };

  }
});
</script>