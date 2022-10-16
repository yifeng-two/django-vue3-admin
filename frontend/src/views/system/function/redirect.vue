<!--
 * @Author: yifeng
 * @Date: 2022-10-15 21:58:12
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-15 22:00:37
 * @Description: 
-->
<template>
    <div></div>
</template>
   
<script lang="ts">

export default {
    name: 'redirect',
    beforeRouteEnter(to, from, next) {
        next(instance => instance.$router.replace(JSON.parse(from.params.route)))
    }
    // return{
        
    // }
}
</script>