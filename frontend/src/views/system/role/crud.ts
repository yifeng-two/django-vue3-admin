/*
 * @Author: yifeng
 * @Date: 2022-09-25 18:19:53
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-10 20:57:31
 * @Description: 
 */
import * as api from "@/apis/system";
import useDictStore from "@/stores/system-dict";
import { dict } from "@fast-crud/fast-crud";
import { getCurrentInstance } from "vue";

export default function ({ expose }) {
    const { proxy } = getCurrentInstance() // 使用proxy代替ctx，因为ctx只在开发环境有效
    const dictStore = useDictStore()

    const pageRequest = async (query: any) => {
        return await api.getRoleList(query);
    };
    const editRequest = async ({ form, row }) => {
        form.id = row.id;
        return await api.updateRole(form);
    };
    const delRequest = async ({ row }) => {
        return await api.deleteRole(row.id);
    };

    const addRequest = async ({ form }) => {
        return await api.createRole(form);
    };

    return {
        crudOptions: {
            request: {
                pageRequest,
                addRequest,
                editRequest,
                delRequest
            },
            rowHandle: {
                width: 300,
                view: {
                    thin: true,
                    text: '',
                    show: proxy.hasPermissions('Retrieve')
                },
                edit: {
                    thin: true,
                    text: '',
                    show: proxy.hasPermissions('Retrieve')
                },
                remove: {
                    thin: true,
                    text: '',
                    show: proxy.hasPermissions('Retrieve')
                },
            },
            table: { //表格配置，对应fs-table
                // 对应 el-table / a-table的配置
                border: true,
                bordered: true,
                height: "100%",
                rowKey: 'id',
                stripe: true,
                children: 'children',
                hasChild: 'hasChildren',
                defaultExpandAll: true,
                // 监听 el-table的单行选中事件
                // onCurrentChange(currentRow) {
                //     console.log("选中行", currentRow);
                //     asideTableRef.value.setSearchFormData({ form: { gradeId: currentRow.id } });
                //     asideTableRef.value.doRefresh();
                // }
            },
            form: {
                display: "flex",
                col: { span: 24 },
                labelWidth: "100px", //
                // labelCol: { span: 8},
                // width: '35%'
            },
            columns: {
                _index: {
                    title: "序号",
                    form: { show: false },
                    column: {
                        // type: "index",
                        align: "center",
                        width: "55px",
                        columnSetDisabled: true, //禁止在列设置中选择
                        formatter: (context) => {
                            //计算序号,你可以自定义计算规则，此处为翻页累加
                            const index = context.index ?? 1;
                            const pagination = expose.crudBinding.value.pagination;
                            return ((pagination.currentPage ?? 1) - 1) * pagination.pageSize + index + 1;
                        }
                    }
                },
                // search: {
                //     title: '关键词',
                //     show: false,
                //     disabled: true,
                //     search: {
                //         disabled: false
                //     },
                //     form: {
                //         disabled: true,
                //         component: {
                //             props: {
                //                 clearable: true
                //             },
                //             placeholder: '请输入关键词'
                //         }
                //     },
                //     view: { // 查看对话框组件的单独配置
                //         disabled: true
                //     }
                // },
                name: {
                    title: "角色名称",
                    search: { show: true },
                    type: 'input',
                    column: {
                        minWidth: 100,
                    },
                    form: {
                        rules: [ // 表单校验规则
                            {
                                required: true,
                                message: '角色名称必填项'
                            }
                        ],
                        component: {
                            placeholder: '请输入角色名称'
                        },
                    }
                },
                key: {
                    title: '权限标识',
                    type: 'input',
                    column: {
                        minWidth: 90,
                    },
                    form: {
                        rules: [ // 表单校验规则
                            {
                                required: true,
                                message: '权限标识必填项'
                            }
                        ],
                        component: {
                            placeholder: '请输入标识字符'
                        },
                        // vm.systemConfig('base.default_password')
                    },
                    show: true,
                },
                sort: {
                    title: '排序',
                    type: 'number',
                    column:{
                        sortable: true,
                        width: 80,
                    },
                    form: {
                        value: 1,
                        component: {
                            placeholder: '请输入排序'
                        }
                    }
                },
                admin: {
                    title: "是否管理员",
                    search: { show: true },
                    type: 'dict-radio',
                    dict: dict({
                        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
                        data: dictStore.dicts['button_whether_bool']
                    }),
                    column: {
                        minWidth: 100,
                    },
                    form: {
                        value: false,
                        component: {
                            placeholder: '请选择是否管理员'
                        }
                    }
                },
                status: {
                    title: "状态",
                    type: 'dict-radio',
                    dict: dict({
                        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
                        data: dictStore.dicts['button_status_bool']
                    }),
                    column: {
                        minWidth: 100,
                    },
                    form: {
                        value: true,
                        component: {
                            placeholder: '请选择状态'
                        }
                    }
                },
            }
        }
    };
}