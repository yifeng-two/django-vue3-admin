<!--
 * @Author: yifeng
 * @Date: 2022-07-30 22:28:20
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-12 21:28:25
 * @Description: 
-->
<template>
  <ImageCard v-if="data.items.length>0" :data="data"></ImageCard>
</template>

<script>
import { reactive } from 'vue'
import ImageCard from '@/components/ImageCard.vue'
import {createSocket } from '@/utils'

export default ({
  name: 'Home',
  components: {
    ImageCard,
  },
  setup() {
    let data = reactive({
      items: []
    })
    
    createSocket("ws://127.0.0.1:8000/test",getWebSocketData);
    function getWebSocketData(socketData){
      data.items = socketData
    }
    return {
      data
    };
  },
})
</script>