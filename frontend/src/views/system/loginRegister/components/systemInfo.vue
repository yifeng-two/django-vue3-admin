<!--
 * @Author: yifeng
 * @Date: 2022-10-04 14:04:11
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-04 16:47:15
 * @Description: 
-->
<template>
    <div class="page-login--content-footer">
        <p class="page-login--content-footer-locales">
            <!-- <a v-for="language in $languages" :key="language.value" @click="onChangeLocale(language.value)"
                style="cursor:pointer;">
                {{ language.label }}
            </a> -->
        </p>
        <p>Copyright &copy; {{ copyright }}</p>
        <p>
            <a href="https://beian.miit.gov.cn" target="_blank">{{
            keepRecord
            }}</a>
             |<a :href="helpUrl || '#'" target="_blank">帮助</a> |
            <a :href="privacyUrl || '#'" target="_blank">隐私</a> |
            <a :href="clauseUrl || '#'" target="_blank">条款</a>
        </p>
    </div>
</template>
<script lang="ts" setup>
import useSettingStore from '@/stores/system-setting';
import { computed } from 'vue';

const settingStore = useSettingStore()
settingStore.init()

const siteLogo = computed(() => {
    return settingStore.systemInfo['login.site_logo'] || import.meta.glob('./image/dvadmin.png')
})
const loginBackground = computed(() => {
    return settingStore.systemInfo['login.login_background'] || import.meta.glob('./image/bg.png')
})
const captchaState = computed(() => {
    return settingStore.systemInfo['base.captchaState'] !== undefined ? settingStore.systemInfo['base.captcha_state'] : true
})
const keepRecord = computed(() => {
    return settingStore.systemInfo['login.keep_record']
})
const siteName = computed(() => {
    return settingStore.systemInfo['login.keep_record']
})
const copyright = computed(() => {
    return settingStore.systemInfo['login.site_name']
})
const helpUrl = computed(() => {
    return settingStore.systemInfo['login.help_url']
})
const privacyUrl = computed(() => {
    return settingStore.systemInfo['login.privacy_url']
})
const clauseUrl = computed(() => {
    return settingStore.systemInfo['login.clause_url']
})

const onChangeLocale = (value) => {
    console.log(value);

}
</script>
<style lang="scss">
// footer
.page-login--content-footer {
    margin-top: 10px;
    padding: 1em 0;

    .page-login--content-footer-locales {
        padding: 0px;
        margin: 0px;
        margin-bottom: 15px;
        font-size: 12px;
        line-height: 12px;
        text-align: center;
        color: #e2c026;

        a {
            color: #e2c026;
            margin: 0 0.5em;

            &:hover {
                color: #e2c026;
            }
        }
    }

    .page-login--content-footer-copyright {
        padding: 0px;
        margin: 0px;
        margin-bottom: 10px;
        font-size: 12px;
        line-height: 12px;
        text-align: center;
        color: #3325;

        a {
            color: #3325;
        }
    }

    .page-login--content-footer-options {
        padding: 0px;
        margin: 0px;
        font-size: 12px;
        line-height: 12px;
        text-align: center;

        a {
            color: #e2c026;
            margin: 0 1em;
        }
    }
}
</style>