/*
 * @Author: yifeng
 * @Date: 2022-09-30 20:02:29
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-30 23:23:19
 * @Description: 
 */
import * as api from "@/apis";
import useDictStore from "@/stores/system-dict";
import axiosInstance from "@/utils/net/axiosInstance";
import { dict } from "@fast-crud/fast-crud";
import { ElAlert } from "element-plus";
import { render, h } from "vue";

export default function ({ expose, props, ctx }) {
    const dictStore = useDictStore()
    // const menuNameDict = dict({
    //     cloneable:false,
    //     data:[
    //         { label: '新增', value: '新增', permission: "Create",   color: "success" },
    //         { label: '编辑', value: '编辑', permission: "Update",   color: "primary" },
    //         { label: '删除', value: '删除', permission: "Delete",   color: "danger" },
    //         { label: "详情", value: "详情", permission: "Retrieve", color: "info" },
    //         { label: "查询", value: "查询", permission: "Search",   color: "warning" },
    //         { label: "保存", value: "保存", permission: "Save" ,    color: "success" },
    //         { label: "导入", value: "导入", permission: "Import",   color: "primary" },
    //         { label: "导出", value: "导出", permission: "Export",   color: "warning" }
    //     ]
    // })
    const menuNameDict = dict({
        cloneable:false,
        data:dictStore.dicts['system_button']
    })
    const pageRequest = async (query) => {
        const menuId = props.meunCatagory.id
        const ret = await api.getMenuButtonList({ ...query, menu: menuId })
        return ret;
    };
    const editRequest = async ({ form, row }) => {
        form.id = row.id;
        return await api.updateMenuButton(form);
    };
    const delRequest = async ({ row }) => {
        return await api.deleteMenuButton(row.id);
    };

    const addRequest = async ({ form }) => {
        const menuId = props.meunCatagory.id
        return await api.addMenuButton(form, menuId);
    };

    return {
        crudOptions: {
            request: {
                pageRequest,
                addRequest,
                editRequest,
                delRequest
            },
            form: {
                col: { span: 24 },
                display: "flex",
                labelWidth: "100px", //
            },
            search: {        //查询框配置 ，对应fs-search组件
                //查询表单配置 ，对应el-from, a-form配置    
                options: {

                }
            },
            table: { //表格配置，对应fs-table
                // 对应 el-table / a-table的配置
                highlightCurrentRow: true,
                border: true,
                bordered: true,
                height: "100%",
                rowKey: 'id',
                stripe: true,
                slots: {}    // 对应el-table ,a-table的插槽
            },
            rowHandle: {
                width: 200
            },
            columns: {
                _index: {
                    title: "序号",
                    form: { show: false },
                    column: {
                        // type: "index",
                        align: "center",
                        width: 90,
                        columnSetDisabled: true, //禁止在列设置中选择
                        formatter: (context: { index: number; }) => {
                            //计算序号,你可以自定义计算规则，此处为翻页累加
                            const index = context.index ?? 1;
                            const pagination = expose.crudBinding.value.pagination;
                            return ((pagination.currentPage ?? 1) - 1) * pagination.pageSize + index + 1;
                            // return context.index
                        }
                    }
                },
                id: {
                    title: 'ID',
                    column: {
                        show: false,
                    },
                    form: {
                        show: false
                    }
                },
                name: {
                    title: '权限名称',
                    type: 'dict-select',
                    dict: menuNameDict,
                    search: {
                        show: true
                    },
                    column: {
                        sortable: true,
                        width: 150,
                        align:"center"
                    },
                    form: {
                        rules: [ // 表单校验规则
                            { required: true, message: '必填项' }
                        ],
                        component: {
                            span: 12,
                            props: {
                                clearable: true,
                                elProps: {
                                    allowCreate: true,
                                    filterable: true,
                                    clearable: true
                                },
                            }
                        },
                        valueChange({ form, value }) {
                            if (value) {
                                // 执行city的select组件的reloadDict()方法，触发“city”重新加载字典
                                form.value = menuNameDict.getNodeByValue(form.name).permission; 
                                
                            }
                        },
                        helper: {
                            render() {
                                return h(
                                    ElAlert,
                                    {
                                        title: "可手动输入不在列表中的新值",
                                        type: "warning",
                                        description: "比较常用的建议放在字典管理中"
                                    }
                                )
                            }
                        }
                    }
                },
                value: {
                    title: '权限值',
                    type: 'input',
                    search: {
                        show: true
                    },
                    column: {
                        sortable: true,
                        width: 200,
                        align:"center"
                    },
                    form: {
                        rules: [ // 表单校验规则
                            { required: true, message: '必填项' }
                        ],
                        component: {
                            span: 12,
                            placeholder: '请输入权限值',
                            props: {
                                elProps: {
                                    clearable: true
                                }
                            }
                        },
                        helper: {
                            render() {
                                return h(
                                    ElAlert, {
                                    title: "用于前端按钮权限的判断展示",
                                    type: "warning",
                                    description: "使用方法：vm.hasPermissions(权限值)"
                                }
                                )
                            }
                        }
                    }
                },
                method: {
                    title: '请求方式',
                    type: 'dict-select',
                    dict: dict({
                        data: [
                            { color: "primary",label: 'GET', value: 0 },
                            { color: "success",label: 'POST', value: 1 },
                            { color: "warning",label: 'PUT', value: 2 },
                            { color: "danger",label: 'DELETE', value: 3 }
                        ]
                    }),
                    search: {
                        show: true
                    },
                    column: {
                        sortable: true,
                        width: 150,
                    },
                    form: {
                        rules: [ // 表单校验规则
                            { required: true, message: '必填项' }
                        ],
                        component: {
                            span: 12
                        },
                    }
                },
                api: {
                    title: '接口地址',
                    type: 'dict-select',
                    dict: dict({
                        url: '/swagger.json',
                        label: 'label',
                        value: 'value',
                        async getData(dict) {
                            const ret = await axiosInstance({ url: dict.url });
                            const res = Object.keys(ret.paths);
                            const data = [];
                            for (const item of res) {
                                const obj = {};
                                obj.label = item;
                                obj.value = item;
                                data.push(obj);
                            }
                            return data;
                        }
                    }),
                    column:{
                        sortable: true,
                    },
                    form: {
                        rules: [ // 表单校验规则
                            { required: true, message: '必填项' }
                        ],
                        component: {
                            span: 24,
                            props: {
                                elProps: {
                                    allowCreate: true,
                                    filterable: true,
                                    clearable: true
                                }

                            }
                        },
                        helper: {
                            render() {
                                return h(
                                    ElAlert,
                                    {
                                        title: "请正确填写，以免请求时被拦截。匹配单例使用正则,例如:/api/xx/.*?/",
                                        type: "warning"
                                    }
                                )
                            }
                        }
                    }
                }
            }
        }
    };
}
