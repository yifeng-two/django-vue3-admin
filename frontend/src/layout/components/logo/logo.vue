<!--
 * @Author: yifeng
 * @Date: 2022-08-25 22:05:07
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-06 14:41:36
 * @Description: 
-->
<!--
 * @Author: yifeng
 * @Date: 2022-08-04 22:12:49
 * @LastEditors: yifeng
 * @LastEditTime: 2022-08-25 22:03:55
 * @Description: 
-->
<template>
    <div class="logo">
        <img class="logo_img" src="@/assets/MenuLogo.png" alt="logo" />
        <span v-show="!title_show">{{site_name}}</span>
    </div>
</template>

<script lang="ts" setup>
import useSettingStore from '@/stores/system-setting';
import { ref, watch } from 'vue'
const settingStore = useSettingStore()
const site_name = settingStore.systemInfo['login.site_name']

const props = defineProps({
    title_show: {
        type: Boolean,
        required: true
    },
})
const show = ref(true);
watch(
    () => props.title_show,
    (newVal, oldVal) => {
        if (!newVal) {
            show.value = newVal;
            // setTimeout(() => {
                
            // }, 300)
        } else {
            setTimeout(() => {
                show.value = newVal;
            }, 300)
        }
    },
    { immediate: true, deep: true }
)

</script>
<style lang="scss" scoped>
.logo {
    color: #ffffff;
    text-align: center;
    line-height: 48px;
    font-size: 18px;
    font-family: sans-serif;
    font-weight: bold;
    display: flex;

    .logo_img {
        width: 50px;
        height: 50px;
    }
}
</style>
