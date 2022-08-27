<!--
 * @Author: yifeng
 * @Date: 2022-08-06 19:32:52
 * @LastEditors: yifeng
 * @LastEditTime: 2022-08-21 23:01:27
 * @Description: 
-->
<template>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
        <el-table-column fixed="right" label="Operations" width="120">
            <template #default>
                <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
                <el-button link type="primary" size="small">Edit</el-button>
            </template>
        </el-table-column>
    </el-table>

</template>
<script>
import { ref, reactive } from 'vue';

export default ({
    name: 'OrginDataManage',
    setup() {
        const handleClick = () => {
            console.log('click')
        }

        const tableData = [
            {
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
        ]
        return {
            tableData
        }
    }
});
</script>
<style>
</style>


