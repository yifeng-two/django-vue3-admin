<!--
 * @Author: yifeng
 * @Date: 2022-07-30 20:48:22
 * @LastEditors: yifeng
 * @LastEditTime: 2022-08-22 20:58:41
 * @Description: 
-->
<template>
    <el-row>
        <el-col v-for="(item, index) in items" :key="item" :span="4" style="margin-left:20px">
            <el-card class="card" :body-style="{ padding: '0px' }">
                <img :src="items[index].src" class="image" />
                <div style="padding: 14px">
                    <span>检测结果:{{ items[index].result }}</span>
                    <div class="bottom">
                        <time class="time">{{ currentDate }}</time>
                        <!-- <el-button text class="button">Operating</el-button> -->
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { ref, reactive} from 'vue';

export default ({
    name: 'ImageCard',
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
    },
    components: {},
    setup(props) {
        const items = reactive(props.data.items)
        return {
            items,
            currentDate: ref(new Date()),
        };
    },

});

</script>

<style>
.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.card {
    width: auto;
    height: auto;
    margin-top: 10px;
}

.image {
    width: 100%;
    display: block;
}
</style>
