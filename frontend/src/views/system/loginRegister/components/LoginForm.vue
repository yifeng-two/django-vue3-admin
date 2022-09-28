<!--
 * @Author: yifeng
 * @Date: 2022-08-22 22:31:30
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-22 22:39:42
 * @Description: 
-->
<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="100px" class="loginForm sign-in-form">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username" placeholder="请输入用户名..."></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="loginForm.password" type="password" placeholder="请输入密码..."></el-input>
    </el-form-item>
    <el-form-item prop="captcha" v-show="captchaState" :rules="{ required: false, message: '请输入验证码', trigger: 'blur' }">
      <el-input type="text" v-model="loginForm.captcha" placeholder="验证码" @keyup.enter.native="submit">
        <template v-slot:append>
          <img class="login-code" style="cursor: pointer;" height="33px" width="200px" slot="suffix" :src="image_base"
            @click="getCaptcha" />
        </template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button @click="handleLogin(loginFormRef)" type="primary" class="submit-btn">提交</el-button>
    </el-form-item>
    <!-- 快速选择用户登录（限dev环境） -->
    <el-form-item>
      <el-button class="submit-btn" size="default" type="success" @click="selectUsersDialogVisible = true">
        快速选择用户登录（限dev环境）
      </el-button>
      <el-dialog title="快速选择用户" v-model="selectUsersDialogVisible" width="400px" append-to-body>
        <el-row :gutter="10" style="margin: -20px 0px -10px 0px">
          <el-col v-for="(user, index) in users" :key="index" :span="8">
            <el-button type="primary" @click="handleFastLogin(user,loginFormRef)">{{ user.name }}</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </el-form-item>

    <!-- 找回密码 -->
    <div class="tiparea">
      <p>忘记密码？ <a>立即找回</a></p>
    </div>
  </el-form>

</template>
<script lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router';
import type { ElForm } from 'element-plus';

import * as api from "@/apis/index";
import useAccountStore from "@/stores/system-account";

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
  setup(props:any) {

    const loginForm = reactive(props.loginUser)
    type FormInstance = InstanceType<typeof ElForm> //  ElForm,来自element-plus，官方文档中这样用
    const loginFormRef = ref<FormInstance>()
    // @ts-ignore
    // const { proxy } = getCurrentInstance();

    // 使用路由
    const router = useRouter()
    const accountStore = useAccountStore();

    // 获取验证码
    const getCaptcha = () => {
      if (props.captchaState !== undefined && !props.captchaState) return
      api.getCaptcha().then((ret) => {
        props.loginUser.captcha = null
        props.loginUser.captchaKey = ret.data.key
        props.loginUser.image_base = ret.data.image_base
      })
    }

    // 触发登录方法
    // 登录事件
    const handleLogin = (formEL: FormInstance | undefined) => {
      if (!formEL) {
        return
      } else {
        formEL.validate((valid) => {
          if (valid) {
            accountStore.login(props.loginUser)
              .then(() => {
                // 登录成功，存储token到本地存储
                // 重定向至主页
                router.push("workbench")
              })
          } else {
            return false
          }
        })
      }
    }

    // 快速登录事件
    // 表单
    const users = ref([
      {
        name: '超管',
        username: 'superadmin',
        password: 'admin123456'
      },
      {
        name: '管理员',
        username: 'admin',
        password: 'admin123456'
      }
    ])
    const selectUsersDialogVisible = ref(false)
    const handleFastLogin = function (user: { username: any; password: any; }, loginFormRef: any) {
      loginForm.username = user.username
      loginForm.password = user.password
      if (!props.captchaState) {
        handleLogin(loginFormRef)
      }
    }
    // 忘记密码
    const handleForgot = () => {
      router.push("/forgotpassword")
    }
    const captchaState = false

    return {
      captchaState,
      loginForm,
      loginFormRef,
      getCaptcha,
      handleLogin,
      handleForgot,
      users,
      selectUsersDialogVisible,
      handleFastLogin
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
