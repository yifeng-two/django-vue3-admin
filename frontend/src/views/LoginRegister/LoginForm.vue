<!--
 * @Author: yifeng
 * @Date: 2022-08-22 22:31:30
 * @LastEditors: yifeng
 * @LastEditTime: 2022-08-24 20:25:38
 * @Description: 
-->
<template>
  <el-form ref="loginForm" :model="loginUser" :rules="rules" label-width="100px" class="loginForm sign-in-form">
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="loginUser.email" placeholder="Enter Email..."></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="loginUser.password" type="password" placeholder="Enter Password..."></el-input>
    </el-form-item>

    <el-form-item>
      <el-button @click="handleLogin('loginForm')" type="primary" class="submit-btn">提交</el-button>
    </el-form-item>

    <!-- 找回密码 -->
    <div class="tiparea">
      <p>忘记密码？ <a>立即找回</a></p>
    </div>
  </el-form>

</template>
<script lang="ts">
import { ref, getCurrentInstance } from "vue";
import {useRouter} from 'vue-router'
import type { ElForm } from 'element-plus'
export default {
  props: {
    loginUser: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      required: true,
    },
  },
  setup(props, ctx) {
    type FormInstance = InstanceType<typeof ElForm> //  ElForm,来自element-plus，官方文档中这样用
    const loginUserRef = ref<FormInstance>()
    // @ts-ignore
    const { proxy } = getCurrentInstance();
    const router = useRouter();

    // 触发登录方法
   // 登录事件
    const handleLogin = (formEl: FormInstance | undefined)=>{
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          // @ts-ignore
          proxy.$axios.post(
            "/api/v1/auth/login",
            props.loginUser)
            .then((res:any)=>{
            if(res.data.success){
              console.log("登录成功");
              // 登录成功，存储token到本地存储
              const {token} = res.data;
              localStorage.setItem("lkToken",token)
              
              router.push("/")
            }
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
    // 忘记密码
    const handleForgot = ()=>{
      router.push("/forgotpassword")
    }

    return {
      loginUserRef,
      handleLogin,
      handleForgot
    }
  },
};
</script>

<style scoped>
/* form */
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
  width: 100%;
}

.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}

.tiparea p a {
  color: #409eff;
}
</style>
