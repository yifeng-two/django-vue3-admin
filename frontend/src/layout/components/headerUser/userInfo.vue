<!--
 * @Author: yifeng
 * @Date: 2022-09-11 10:54:34
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-07 17:31:29
 * @Description: 
-->
<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="用户设置" name="userInfo">
            <el-row :gutter="20">
                <el-col :span="10" :offset="6">
                    <el-form ref="userInfoFormRef" :model="userInfo.data" required-asterisk :rules="userInfoRule"
                        :label-position="position" label-width="auto" center>
                        <el-form-item prop="avatar" required label="头像">
                            <el-upload class="avatar-uploader" list-type="picture-card"
                                v-model:file-list="fileList.data" :action="action"
                                :headers="headers" :limit="1" :before-upload="beforeAvatarUpload"
                                :on-success="handleAvatarSuccess">
                                <!-- <img v-if="userInfo.data.avatar" :src="userInfo.data.avatar" class="avatar" /> -->
                                <el-icon class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload>
                        </el-form-item>
                        <el-form-item prop="name" required label="昵称">
                            <el-input v-model="userInfo.data.name" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="电话号码" prop="mobile">
                            <el-input v-model="userInfo.data.mobile" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="userInfo.data.email" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="性別" prop="gender">
                            <el-radio-group v-model="userInfo.data.gender">
                                <el-radio :label="1">男</el-radio>
                                <el-radio :label="0">女</el-radio>
                                <el-radio :label="-1">未知</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="updateUserInfo(userInfoFormRef)" type="primary">
                                <i class="fa fa-check"></i>
                                更新
                            </el-button>
                            <el-button @click="resetForm('userInfo',userInfoFormRef)" type="info">
                                <i class="fa fa-reply-all"></i>
                                重置
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="密码设置" name="userPwdInfo">
            <el-row :gutter="20">
                <el-col :span="10" :offset="6">
                    <el-form ref="userPwdFormRef" :model="userPwdInfo" required-asterisk :label-position="position"
                        label-width="auto" :rules="pwdRule" center>
                        <el-form-item label="原密码" required prop="oldPwd">
                            <el-input v-model="userPwdInfo.oldPwd" clearable></el-input>
                        </el-form-item>
                        <el-form-item required prop="newPwd" label="新密码">
                            <el-input type="password" v-model="userPwdInfo.newPwd" clearable></el-input>
                        </el-form-item>
                        <el-form-item required prop="newPwd2" label="确认密码">
                            <el-input type="password" v-model="userPwdInfo.newPwd2" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="setPassword(userPwdFormRef)">
                                <i class="fa fa-check"></i>提交
                            </el-button>
                            <el-button @click="resetForm('userPwdInfo',userPwdFormRef)" type="info">
                                <i class="fa fa-reply-all"></i>重置
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-tab-pane>
    </el-tabs>
</template>
<script lang="ts" setup>
import { ElMessage, FormInstance, UploadProps } from 'element-plus';
import { onMounted, reactive, ref, watch } from 'vue'
// md5加密
import md5 from 'js-md5'
import { AXIOS_BASE_URL } from '@/configs';
import cookies from '@/utils/common/cookies';
import * as api from "@/apis/system"
import useAccountStore from '@/stores/system-account';
const accountStore = useAccountStore()

const activeName = ref('userInfo')
const position = ref("right")
const action = ref(AXIOS_BASE_URL + 'api/system/file/')
const headers = reactive({
    Authorization: 'JWT ' + cookies.get('token')
})
const fileList = reactive({
    data: [] as any
})
const userPwdFormRef = ref<FormInstance>()
const userInfoFormRef = ref<FormInstance>()
const userInfo = reactive({
    data: {
        name: '',
        gender: '',
        mobile: '',
        avatar: '',
        email: ''
    }
})

const userPwdInfo = reactive({
    oldPwd: '',
    newPwd: '',
    newPwd2: ''
})

// 用户信息校验规则
const userInfoRule = reactive({
    name: [{
        required: true,
        message: '请输入昵称',
        trigger: 'blur'
    }],
    mobile: [{
        pattern: /^1[3-9]\d{9}$/,
        message: '请输入正确手机号'
    }]
})
// 密码校验规则
const validatePass = (rule: any, value: any, callback: any) => {
    const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{6,30}')
    if (value === '') {
        callback(new Error('请输入密码'))
    } else if (value === userPwdInfo.oldPwd) {
        callback(new Error('原密码与新密码一致'))
    } else if (!pwdRegex.test(value)) {
        callback(new Error('您的密码复杂度太低(密码中必须包含字母、数字)'))
    } else {
        if (userPwdInfo.newPwd2 !== '') {
            if (!userPwdFormRef.value) return
            userPwdFormRef.value.validateField('newPwd2', () => null)
        }
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== userPwdInfo.newPwd) {
        callback(new Error('两次输入密码不一致!'))
    } else {
        callback()
    }
}
const pwdRule = reactive({
    oldPwd: [{
        required: true,
        message: '请输入原密码',
        trigger: 'blur'
    }],
    newPwd: [{
        validator: validatePass,
        trigger: 'blur'
    }],
    newPwd2: [{
        validator: validatePass2,
        trigger: 'blur'
    }]
})

/**
 * 获取当前用户信息
 */
const getCurrentUserInfo = async () => {
    const res = await api.getUserInfo();
    userInfo.data = res.data;
    fileList.data = [{ name: 'avatar.png', url: res.data.avatar }];
}
onMounted(() => {
    // console.log("mounted");
    getCurrentUserInfo()
})

// tab切换
const handleClick = (tab: { paneName: string; }, event: any) => {
    // console.log(tab, event);
    // console.log(userPwdFormRef);
    if (tab.paneName === 'userInfo') {
        userPwdFormRef.value.resetFields()
        getCurrentUserInfo()
    } else {
        userInfoFormRef.value.resetFields()
    }
}
/**
 * 头像上传校验大小
 * @param res
 * @param file
 */
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
/**
 * 头像上传
 * @param res
 * @param file
 */
const handleAvatarSuccess = (res: { data: { url: string; }; }, file: { name: any; }) => {
    // console.log(11, res)
    fileList.data = [{ url: AXIOS_BASE_URL + res.data.url, name: file.name }]
    userInfo.data.avatar = AXIOS_BASE_URL + res.data.url
}
// const handleAvatarSuccess: UploadProps['onSuccess'] = (
//     response,
//     uploadFile
// ) => {
//     imageUrl.value = URL.createObjectURL(uploadFile.raw!)
// }

/**
 * 更新用户信息
 */
const updateUserInfo = (formEL: FormInstance | undefined) => {
    if (!formEL) {
        return
    } else {
        formEL.validate((valid) => {
            if (valid) {
                api.updateUserInfo(userInfo.data).then((res) => {
                    ElMessage.success('修改成功')
                    getCurrentUserInfo()
                })
            } else {
                // 校验失败
                // 登录表单校验失败
                ElMessage.error('表单校验失败，请检查')
            }
        })
    }

}


// 设置密码
const setPassword = (formEL: FormInstance | undefined) => {
    if (!formEL) {
        return
    } else {
        formEL.validate((valid) => {
            if (valid) {
                const userId = cookies.get('uuid')
                if (userId) {
                    const params = JSON.parse(JSON.stringify(userPwdInfo))
                    params.oldPassword = md5(params.oldPwd)
                    params.newPassword = md5(params.newPwd)
                    params.newPassword2 = md5(params.newPwd2)
                    api.changePassword(userId, params)
                        .then((res) => {
                            activeName.value = 'userInfo'
                            ElMessage.success('修改成功')
                            accountStore.logout({})
                        })
                }
            } else {
                ElMessage.error('表单校验失败，请检查')
            }
        })
    }
}

const resetForm = (formName: string, formEL: FormInstance | undefined) => {
    // console.log(formEL);
    // if (!formEL) return
    // formEL.resetFields()
    if (formName === 'userInfo') {
        getCurrentUserInfo()
    } else {
        formEL.resetFields()
    }
}

</script>
<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
<style>
.demo-tabs {
    margin-top: 20px;
    margin-left: 20px;
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>