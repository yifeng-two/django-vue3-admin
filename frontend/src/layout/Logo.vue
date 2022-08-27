<!--
 * @Author: yifeng
 * @Date: 2022-08-25 22:05:07
 * @LastEditors: yifeng
 * @LastEditTime: 2022-08-25 22:27:59
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
        <img class="logo_img" src="../assets/MenuLogo.png" alt="logo" />
        <span v-show="!title_show">焊接检测管理系统</span>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
export default ({
    name: 'Logo',
    props: {
        title_show: {
            type: Boolean,
        },
    },
    setup(props) {
        const show = ref(true);
        watch(props.title_show, (newVal) => {
            // console.log('newVal, oldVal', newVal, oldVal)
            // console.log('iscol', isCollapse);
            if (!newVal) {
                setTimeout(() => {
                    show.value = newVal;
                    // console.log('if', title_show.value);
                }, 300)
            } else {
                setTimeout(() => {
                    show.value = newVal;
                    // console.log('if', title_show.value);
                }, 300)
            }
        }, { immediate: true, deep: true });
        // console.log(show);
        return {
            show,
        }
    }

})

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

.el-menu {
    height: 100vh;
    border: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 210px;
    min-height: 400px;
    // height: 100vh; //添加此属性
}

// 折叠时宽度
// .el-menu--collapse {
//     width: 100px;
// }
</style>
