<!--
 * @Author: yifeng
 * @Date: 2022-08-22 22:31:30
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-16 12:32:55
 * @Description: 
-->
<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="100px" class="loginForm sign-in-form">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="用户名">
        <template #prefix>
          <el-icon class="el-input__icon">
            <UserFilled />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" type="password" placeholder="密码">
        <template #prefix>
          <el-icon class="el-input__icon">
            <Position />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="captcha" v-show="captchaState" :rules="{ required: false, message: '请输入验证码', trigger: 'blur' }">
      <el-input type="text" v-model="loginForm.captcha" placeholder="验证码"
        @keyup.enter.native="handleLogin(loginFormRef)">
        <template #append>
          <el-image class="login-code" style="position:absolute;right:0;margin:auto;" fit="contain" :src="image_base"
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
        快速选择用户登录(限dev环境)
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
    <div>
      <system-info></system-info>
    </div>
  </el-form>

</template>
<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { ElForm, ElMessage } from 'element-plus';

import * as api from "@/apis/system/index";
import useAccountStore from "@/stores/system-account";
import useSettingStore from "@/stores/system-setting";
import useDbStore from "@/stores/system-db";

import systemInfo from "./systemInfo.vue";

// 使用路由
const router = useRouter()
const route = useRoute()
const accountStore = useAccountStore();
const settingStore = useSettingStore()
const dbStore = useDbStore()

settingStore.init()
dbStore.databaseClear()

const props = defineProps({
  loginUser: {
    type: Object,
    required: true,
  },
  rules: {
    type: Object,
    required: true,
  },
})
const loginForm = reactive(props.loginUser)
type FormInstance = InstanceType<typeof ElForm> //  ElForm,来自element-plus，官方文档中这样用
const loginFormRef = ref<FormInstance>()

// 获取验证码
const captchaState = computed(() => {
  return settingStore.get('base.captcha_state')
})
const image_base = ref<string>('')
const getCaptcha = () => {
  if (captchaState !== undefined && !captchaState) return
  api.getCaptcha().then((ret) => {
    props.loginUser.captcha = null
    props.loginUser.captchaKey = ret.data.key
    image_base.value = ret.data.image_base
  })
}
onMounted(() => {
  getCaptcha()
})
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
            // 重定向对象不存在则返回顶层路径
            const redirect: string = route.query && route.query.redirect;
            router.replace(redirect || '/')
            // 登录成功，存储token到本地存储
            // 重定向至主页
            // router.push("index")
          }).catch(() => {
            getCaptcha()
          })
      } else {
        // 登录表单校验失败
        ElMessage.error('表单校验失败，请检查')
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
  }, {
    name: 'test',
    username: 'test',
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

.el-input-group__append {
  max-width: 400px;
  padding: 0;
}

.el-image {
  max-width: 100%;
  width: 120px;
  height: 33px;
}

.login-code {
  max-width: 400px;
  max-height: 33px;
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
