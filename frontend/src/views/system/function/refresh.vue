<!--
 * @Author: yifeng
 * @Date: 2022-10-03 22:52:01
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-15 21:58:56
 * @Description: 
-->
<template>
    <div></div>
</template>
   
<script lang="ts">

export default {
    name: 'refresh',
    beforeRouteEnter(to, from, next) {
        from.meta[`__stamp-${from.path}`] = Date.now()
        next(instance => instance.$router.replace({ path: from.fullPath, meta: from.meta }))
    },
    // return{
        
    // }
}
</script>
  