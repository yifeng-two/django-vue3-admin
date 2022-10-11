<!--
 * @Author: yifeng
 * @Date: 2022-10-08 21:57:18
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-10 21:10:02
 * @Description: 
-->
<template>
    <div>
        <div style="margin: 10px">
            <el-button type="primary" @click="submitPermisson" v-permission="'Save'">保存
            </el-button>
        </div>
        <el-container style="height: 80vh; border: 1px solid #eee">
            <el-aside width="300px" style="border:1px solid #eee;padding: 20px;">
                <div style="margin: 10px;">
                    <div style="margin-bottom: 20px">
                        <div class="flex-align-center">
                            <div class="divider"></div>
                            <span>数据授权</span>
                            <el-tooltip class="item" effect="dark" placement="right">
                                <template #content>{{dataAuthorizationTips}}</template>
                                <el-icon>
                                    <Warning />
                                </el-icon>
                            </el-tooltip>
                        </div>
                    </div>
                    <div>
                        <el-select v-show="roleObj.name" v-model="roleObj.data_range" @change="dataScopeSelectChange">
                            <el-option v-for="item in dataScopeOptions" :key="item.value" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </div>

                    <div v-show="roleObj.data_range === 4" class="dept-tree">
                        <el-tree :data="deptOptions" show-checkbox default-expand-all
                            :default-checked-keys="deptCheckedKeys" ref="dept" node-key="id" :check-strictly="true"
                            :props="{ label: 'name' }"></el-tree>
                    </div>
                </div>
            </el-aside>
            <el-main>
                <div style="margin: 10px;">
                    <div>
                        <div style="margin-bottom: 20px">
                            <div class="flex-align-center">
                                <div class="divider"></div>
                                <span>菜单授权</span>
                                <el-tooltip class="item" effect="dark" placement="right">
                                    <template #content>{{menuAuthorizationTips}}</template>
                                    <el-icon>
                                        <Warning />
                                    </el-icon>
                                </el-tooltip>
                            </div>
                        </div>
                        <el-tree class="flow-tree" ref="menuTree" :data="menuOptions" node-key="id"
                            default-expand-all="true" show-checkbox="true" :expand-on-click-node="false"
                            :check-on-click-node="false" :check-strictly="false" empty-text="请先选择角色"
                            :default-checked-keys="menuCheckedKeys" @check-change="handleCheckClick">
                            <template #default="{ node, data }">
                                <span class="custom-tree-node">
                                    <div class="flex-between">
                                        <div :style="{width:((4-node.level)*18+100)+'px'}">{{ data.name }}</div>
                                        <div>
                                            <el-checkbox v-for="(item, index) in data.menuPermission" :key="index"
                                                v-model="item.checked">{{ item.name }}</el-checkbox>
                                        </div>
                                    </div>
                                </span>
                            </template>
                        </el-tree>
                    </div>
                </div>
                <el-backtop target=".el-main" :right="100" :bottom="100" ></el-backtop>
            </el-main>
        </el-container>
    </div>
</template>
<script lang="ts" setup>
import * as api from '@/apis/system'
import { ElMessage } from 'element-plus';
import { getCurrentInstance, nextTick, onMounted, reactive, ref } from 'vue';
import XEUtils from 'xe-utils'
const props = defineProps({
    roleObj: {
        type: Object,
        required: true,
        default: {
            name: null,
            data_range: null
        }
    }
})
// console.log(props.roleObj);

const filterText = ref('')
const data = ref<any>([])
const menuOptions = ref<any>([])
const permissionData = ref<any>([])
const menuCheckedKeys = ref<any>([])// 菜单默认选中的节点
const deptOptions = ref<any>([])
const deptCheckedKeys = ref<any>([])
const dataScopeOptions = reactive([
    {
        value: 0,
        label: '仅本人数据权限'
    },
    {
        value: 1,
        label: '本部门及以下数据权限'
    },
    {
        value: 2,
        label: '本部门数据权限'
    },
    {
        value: 3,
        label: '全部数据权限'
    },
    {
        value: 4,
        label: '自定数据权限'
    }
])
const dataAuthorizationTips = ref('授权用户可操作的数据范围')
const menuAuthorizationTips = ref('授权用户在菜单中可操作的范围')


const filterNode = (value: any, data: { label: string | any[]; }) => {
    if (!value) return true
    return data.label.indexOf(value) !== -1
}

const initNode = () => {
    getDeptData()
    getMenuData(props.roleObj)
    menuCheckedKeys.value = props.roleObj.menu // 加载已勾选的菜单
    deptCheckedKeys.value = props.roleObj.dept
}
// 获取部门数据
const getDeptData = () => {
    api.getDeptList({ status: 1 }).then((ret: { data: { data: any; }; }) => {
        deptOptions.value = ret.data.data
    })
}
// 获取菜单数据
const getMenuData = (data: any) => {
    api.getMenuDataByRoleId(data).then((res: any[]) => {
        res.forEach((x: any) => {
            // 根据当前角色的permission,对menuPermisson进行勾选处理
            x.menuPermission.forEach((a: any) => {
                if (data.permission.indexOf(a.id) > -1) {
                    // this.$set(a, 'checked', true)
                    a['checked'] = true
                } else {
                    // this.$set(a, 'checked', false)
                    a['checked'] = false
                }
            })
        })
        // 将菜单列表转换为树形列表
        menuOptions.value = XEUtils.toArrayTree(res, {
            parentKey: 'parent',
            strict: true
        })
    })
}

const getPageData = async (query: any) => {
    const res = await api.getRoleList(query);
    res.data.data.map((value, index) => {
        value.node_id = index;
    });
    data.value = res;
    nextTick().then(() => {
        initNode();
    });
}
onMounted(() => {
    getPageData()
})

// 所有勾选菜单节点数据
// const menuTree = ref(null)
const proxy = getCurrentInstance()
const getMenuAllCheckedKeys = () => {
    // 目前被选中的菜单节点
    const checkedKeys = proxy.ctx.$refs.menuTree.getCheckedKeys()
    // 半选中的菜单节点
    const halfCheckedKeys = proxy.ctx.$refs.menuTree.getHalfCheckedKeys()
    checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
    return checkedKeys
}
// 所有自定义权限时,勾选的部门节点数据
// const dept = ref(null)
const getDeptAllCheckedKeys = () => {
    // 目前被选中的部门节点
    const checkedKeys = proxy.ctx.$refs.dept.getCheckedKeys()
    // 半选中的部门节点
    const halfCheckedKeys = proxy.ctx.$refs.dept.getHalfCheckedKeys()
    checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
    return checkedKeys
}
// 提交修改
const submitPermisson = async () => {

    props.roleObj.menu = getMenuAllCheckedKeys() // 获取选中的菜单
    props.roleObj.dept = getDeptAllCheckedKeys() // 获取选中的部门
    const menuData = XEUtils.toTreeArray(menuOptions.value)
    const permissionData: any[] = []
    console.log(menuData);
    
    menuData.forEach(x => {
        const checkedPermission = x.menuPermission.filter((f:any) => {
            return f.checked
        })

        if (checkedPermission.length > 0) {
            for (const item of checkedPermission) {
                permissionData.push(item.id)
            }
        }
    })
    props.roleObj.permission = permissionData
    const res = await api.updateRole(props.roleObj);
    ElMessage.success('更新成功');
}
/** 选择角色权限范围触发 */
const dataScopeSelectChange = (value: number) => {
    if (value !== 4) {
        proxy.ctx.$refs.dept.setCheckedKeys([]);
    }
}
/**
 * 菜单树点击,全选权限部分数据
 * @param data
 */
const handleCheckClick = (data: any, checked: any) => {
    const {
        menuPermission,
        children,
        parent
    } = data
    for (const item of menuPermission) {
        // this.$set(item, 'checked', checked)
        item['checked'] = checked
    }
    if (children && parent) {
        for (const item of children) {
            proxy.ctx.$refs.menuTree.setChecked(item.id, checked)
        }
    }
}

</script>
<style lang="scss">
// .yxtInput {
//   .el-form-item__label {
//     color: #49a1ff;
//   }
// }
.flex-align-center {
    display: flex;
    -webkit-align-items: center;
    align-items: center;
}

.flex-between {
    display: flex;
    justify-content: space-between;
}

.divider {
    background: #409EFF;
    width: 8px;
    height: 20px;
    display: inline-block;
    margin-right: 10px;
}

.dept-tree::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
}

.dept-tree {
    height: 160px;
    overflow-y: scroll;
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;
    /* IE 10+ */
}

.flow-tree {
    overflow: auto;
    flex: 1;

    margin: 10px;

    .el-tree-node {
        .el-tree-node__children {
            overflow: visible !important
        }
    }
}
</style>