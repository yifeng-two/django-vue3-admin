<!--
 * @Author: yifeng
 * @Date: 2022-08-22 23:34:14
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-06 20:54:15
 * @Description: 
-->
<template>
  <el-form ref="registerForm" :model="registerUser" :rules="registerRules" label-width="100px"
    class="registerForm sign-up-form">
    <el-form-item label="用户名" prop="name">
      <el-input v-model="registerUser.name" placeholder="Enter UserName..."></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="registerUser.email" placeholder="Enter Email..."></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="registerUser.password" type="password" placeholder="Enter Password..."></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
      <el-input v-model="registerUser.password2" type="password" placeholder="Enter Password..."></el-input>
    </el-form-item>

    <el-form-item label="选择身份">
      <el-select v-model="registerUser.role" placeholder="请选择身份">
        <el-option label="管理员" value="admin"></el-option>
        <el-option label="用户" value="user"></el-option>
        <el-option label="游客" value="visitor"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button @click="handleRegister('registerForm')" type="primary" class="submit-btn">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from "vue";
import type { ElForm } from "element-plus";
import { useRouter } from 'vue-router'
export default defineComponent({
  props: {
    registerUser: {
      type: Object,
      required: true
    }, registerRules: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    type FormInstance = InstanceType<typeof ElForm>; //  ElForm,来自element-plus，官方文档中这样用
    const registerUserRef = ref<FormInstance>();
    // @ts-ignore
    const { proxy } = getCurrentInstance();
    const router = useRouter()
    // 注册事件
    const handleRegister = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          // @ts-ignore
          proxy.$axios.post(
            "/api/v1/auth/register",
            props.registerUser)
            .then((res: any) => {
              // 注册成功
              if (res.success) {
                console.log("注册成功");

              }
              console.log(222);
              router.push("/")
            })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
    return {
      registerUserRef,
      handleRegister,
    }
  },
});
</script>
<style scoped>
</style>