/*
 * @Author: yifeng
 * @Date: 2022-09-17 22:58:09
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-12 20:25:10
 * @Description: 
 */
import * as api from "@/apis/system";
import useDictStore from "@/stores/system-dict";
import { dict } from "@fast-crud/fast-crud";
import { getCurrentInstance } from "vue";
import {assign} from "lodash"

export default function ({ expose }) {
    const dictStore = useDictStore()
    const { proxy } = getCurrentInstance()
    const pageRequest = async (query) => {
        query.is_value = false
        const ret = await api.getDictList(query)

        return ret;
    };
    const editRequest = async ({ form, row }) => {
        form.id = row.id;
        return await api.updateDict(form);
    };
    const delRequest = async ({ row }) => {
        return await api.deleteDict(row.id);
    };

    const addRequest = async ({ form }) => {
        return await api.addDict(form);
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
                buttons: {
                    view: {
                        thin: true,
                        text: '',
                        show: proxy.hasPermissions('Retrieve')
                    },
                    edit: {
                        thin: true,
                        text: '',
                        show: proxy.hasPermissions('Update')
                    },
                    remove: {
                        thin: true,
                        text: '',
                        show: proxy.hasPermissions('Delete')
                    },
                }
            },
            form: {
                col: { span: 24 },
                display: "flex"
            },
            search: {        //查询框配置 ，对应fs-search组件
                //查询表单配置 ，对应el-from, a-form配置    
                options: {

                }
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
                label: {
                    title: "字典名称",
                    type: "text",
                    search: { show: true },
                    form: {
                        rules: [ // 表单校验规则
                            { required: true, message: '字典名称必填项' }
                        ],
                        component: {
                            props: {
                                clearable: true
                            },
                            placeholder: '请输入字典名称'
                        },

                    }
                },
                value: {
                    title: "字典编号",
                    type: "text",
                    search: { show: true },
                    form: {
                        rules: [ // 表单校验规则
                            { required: true, message: '字典编号必填项' }
                        ],
                        component: {
                            props: {
                                clearable: true
                            },
                            placeholder: '请输入字典编号'
                        },
                        helper: "我这里是字段的帮助说明"
                        // helper: {
                        //     render() {
                        //         // return <el-alert title = "使用方法：dictStore.load('字典编号')" type = "warning" > < /el-alert>
                        //         <div class="red">我这里是通过jsx显示的帮助说明</div>
                        //     }
                        // }
                    }
                },
                status: {
                    title: "状态",
                    type: "dict-select",
                    dict: dict({
                        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
                        data: dictStore.dicts['button_status_bool']
                    }),
                    column: {
                        align: 'center',
                        minWidth: 20,
                    },
                    form: {
                        rules: [ // 表单校验规则
                            { required: true, message: '状态必填项' }
                        ],
                        value: true,
                        component: {
                            placeholder: '请选择状态'
                        },
                    }
                },
                sort: {
                    title: "排序",
                    type: "number",
                    column: {
                        align: 'center',
                        minWidth: 20,
                    },
                    form: {
                        value: 1,
                        component: {

                        },
                    }
                },
                remark: {
                    title: "备注",
                    type: "text",
                },
                create_datatime: {
                    title: "创建时间",
                    type: "datetime",
                    form: {
                        show: false,
                    }
                },
                update_datatime: {
                    title: "更新时间",
                    type: "datetime",
                    form: {
                        show: false,
                    }
                },

            }
        }
    };
}
