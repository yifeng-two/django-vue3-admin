<!--
 * @Author: yifeng
 * @Date: 2022-09-15 20:29:35
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-05 16:27:37
 * @Description: 
-->
<template>
    <el-container>
        <el-main>
            <el-table :data="logs" size="mini" style="width: 100%" empty-text="暂无日志信息" stripe>
                <!-- 时间 -->
                <el-table-column prop="time" label="Time" width="140">
                </el-table-column>
                <!-- 信息 -->
                <el-table-column prop="message" label="Message">
                </el-table-column>
                <!-- 触发页面 -->
                <el-table-column label="Url" align="center" min-width="200">
                    <template slot-scope="scope">
                        {{get(scope.row, 'meta.url')}}
                    </template>
                </el-table-column>
                <!-- 触发组件 -->
                <el-table-column label="Tag" align="center" min-width="120">
                    <template slot-scope="scope">
                        <el-tag v-if="get(scope.row, 'meta.instance.$vnode.componentOptions.tag')" type="info"
                            size="mini">
                            &#60;{{get(scope.row, 'meta.instance.$vnode.componentOptions.tag')}}&gt;
                        </el-tag>
                    </template>
                </el-table-column>
                <!-- 查看详情 -->
                <el-table-column fixed="right" align="center" label="More" width="100">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleShowMore(scope.row)">
                            <d2-icon name="eye" />
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer align="left">
            <el-button slot="footer" type="primary"  :loading="uploading" @click="handleUpload">
                <d2-icon name="cloud-upload" />
                Upload {{logStore.length}} log data
            </el-button>
        </el-footer>
    </el-container>
</template>
  
<script lang="ts" setup>
import { get } from 'lodash'
import { computed, ref } from 'vue';
import { ElNotification } from 'element-plus'
import useLogStore from '@/stores/system-log';
import Log from '@/utils/common/log.print'

const uploading = ref(false)
const logStore = useLogStore()
const logs = computed(() => {
    logStore.log
})
const handleShowMore = (log) => {
    // 打印一条日志的所有信息到控制台
    ElNotification({
        type: 'info',
        title: '日志详情',
        message: '完整的日志内容已经打印到控制台'
    })
    Log.capsule('D2Admin', 'handleShowMore', 'primary')
    console.group(log.message)
    console.log('time: ', log.time)
    console.log('type: ', log.type)
    console.log(log.meta)
    console.groupEnd()
}
// 日志上传
const handleUpload = () => {
    uploading.value = true
    ElNotification({
        type: 'info',
        title: '日志上传',
        message: `开始上传${logs.length}条日志`
    })
    setTimeout(() => {
        uploading.value = false
        ElNotification({
            type: 'success',
            title: '日志上传',
            message: '上传成功'
        })
    }, 3000)
}
</script>