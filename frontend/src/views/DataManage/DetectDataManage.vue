<!--
 * @Author: yifeng
 * @Date: 2022-08-06 19:32:52
 * @LastEditors: yifeng
 * @LastEditTime: 2022-08-06 20:24:31
 * @Description: 
-->
<template>
    <span>test DetectData</span>
    <!-- <el-row>
        <el-col v-for="(item, index) in t_items" :key="item" :span="4" style="margin-left:20px">
            <el-card class="card" :body-style="{ padding: '0px' }">
                <img :src="t_items[index].src" class="image" />
                <div style="padding: 14px">
                    <span>检测结果:{{ t_items[index].result }}</span>
                    <div class="bottom">
                        <time class="time">{{ currentDate }}</time>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row> -->
</template>

<script>
import { ref, reactive } from 'vue';

export default ({
    name: 'DetectDataManage',
    
});

</script>
