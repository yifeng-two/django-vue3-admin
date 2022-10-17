/*
 * @Author: yifeng
 * @Date: 2022-10-16 21:17:35
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-16 21:40:58
 * @Description: 
 */
import * as api from "@/apis/system";
import useDictStore from "@/stores/system-dict";
import { axiosInstance } from "@/utils";
import { dict } from "@fast-crud/fast-crud";
import { ElAlert } from "element-plus";
import { getCurrentInstance, h } from "vue";
import { useRoute } from "vue-router";

export default function ({ expose }) {
    const { proxy } = getCurrentInstance() // 使用proxy代替ctx，因为ctx只在开发环境有效
    const dictStore = useDictStore()
    const route = useRoute()

    const pageRequest = async (query: any) => {
        return await api.getApiWhiteList(query);
    };
    const editRequest = async ({ form, row }) => {
        form.id = row.id;
        return await api.updateApiWhite(form);
    };
    const delRequest = async ({ row }) => {
        return await api.deleteApiWhite(row.id);
    };

    const addRequest = async ({ form }) => {
        const menuId = route.params.id
        return await api.createApiWhite(form, menuId);
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
                method: {
                    title: '请求方式',
                    sortable: true,
                    type: 'dict-select',
                    dict: dict({
                        data: [
                            {
                                label: 'GET',
                                value: 0
                            },
                            {
                                label: 'POST',
                                value: 1
                            },
                            {
                                label: 'PUT',
                                value: 2
                            },
                            {
                                label: 'DELETE',
                                value: 3
                            }
                        ]
                    }),
                    form: {
                        rules: [ // 表单校验规则
                            {
                                required: true,
                                message: '必填项'
                            }
                        ],
                        component: {
                            span: 12
                        },
                        itemProps: {
                            class: { yxtInput: true }
                        }
                    }
                },
                url: {
                    title: '接口地址',
                    sortable: true,
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
                                const obj = {} as any;
                                obj.label = item;
                                obj.value = item;
                                data.push(obj);
                            }
                            return data;
                        }
                    }),
                    form: {
                        rules: [ // 表单校验规则
                            {
                                required: true,
                                message: '必填项'
                            }
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
                        itemProps: {
                            class: { yxtInput: true }
                        },
                        helper: {
                            render() {
                                return h(
                                    ElAlert,
                                    {
                                        title: "请正确填写，以免请求时被拦截。匹配单例使用正则,例如:/api/xx/.*?/",
                                        type: "warning"

                                    })
                            }
                        }
                    }
                },
                enable_datasource: {
                    title: '数据权限认证',
                    type: 'dict-radio',
                    dict: dict({
                        data: dictStore.dicts['button_status_bool']
                    }),
                    column: {
                        width: 150,
                    },
                    form: {
                        value: true,
                        component: {
                            span: 12
                        }
                    }
                },
                description: {
                    title: '备注',
                    type: 'textarea',
                    form: {
                        component: {
                            placeholder: '请输入内容',
                            showWordLimit: true,
                            maxlength: '200',
                            props: {
                                type: 'textarea'
                            }
                        }
                    }
                }
            }
        }
    };
}