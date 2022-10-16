/*
 * @Author: yifeng
 * @Date: 2022-09-25 21:33:02
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-12 18:30:46
 * @Description: 
 */
import * as api from "@/apis/system";
import useDictStore from "@/stores/system-dict";
import { dict } from "@fast-crud/fast-crud";
import { getCurrentInstance } from "vue";

export default function ({ expose }) {
    const dictStore = useDictStore()
    const { proxy } = getCurrentInstance()
    const pageRequest = async (query: any) => {
        // query.lazy = true
        return await api.getDeptList(query);
    };
    const addRequest = async ({ form }) => {
        return await api.createDept(form);
    };
    const editRequest = async ({ form, row }) => {
        form.id = row.id;
        return await api.updateDept(form);
    };
    const delRequest = async ({ row }) => {
        return await api.deleteDept(row.id);
    };

    return {
        crudOptions: {
            request: {
                pageRequest,
                addRequest,
                editRequest,
                delRequest
            },
            table: { //表格配置，对应fs-table
                // 对应 el-table / a-table的配置
                border: true,
                bordered: true,
                height: "100%",
                rowKey: 'id',
                stripe: true,
                defaultExpandAll: true,
                slots: {}    // 对应el-table ,a-table的插槽
            },
            form: {
                display: "flex",
                col: { span: 24 },
                labelWidth: "100px", //
            },
            rowHandle: {
                width: 240,
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
            columns: {
                _index: {
                    title: "序号",
                    form: {
                        show: false,
                    },
                    column: {
                        type: "index",
                        align: "center",
                        width: "55px",
                        columnSetDisabled: true, //禁止在列设置中选择
                        formatter: (context: any) => {
                            //计算序号,你可以自定义计算规则，此处为翻页累加
                            const index = context.index ?? 1;
                            const pagination = expose.crudBinding.value.pagination;
                            return ((pagination.currentPage ?? 1) - 1) * pagination.pageSize + index + 1;
                        }
                    }
                },
                parent: {
                    title: "上级部门",
                    type: 'dict-tree',
                    column: {
                        show: false,
                        minWidth: 100,
                    },
                    dict: dict({
                        isTree: true,
                        label: 'name',
                        value: 'id',
                        cache: false,
                        async getData() {
                            const ret = await api.deptLazyLoad();
                            return ret.data;
                        },
                        getNodes(scope: any) {
                            // 配置行展示远程获取nodes
                            return new Promise((resolve, reject) => {
                                const row = scope.row
                                resolve(row.parent !== null ? [{ name: row.parent_name, id: row.parent }] : [])
                            })
                        }
                    }),
                    form: {
                        helper: '默认留空为根节点',
                        rules: [ // 表单校验规则
                            {
                                required: true,
                                message: '上级部门必填项'
                            }
                        ],
                        component: {
                            placeholder: '请输入上级部门',
                            name: 'el-tree-select',
                            props: {
                                multiple: false,
                                select: {
                                    valueKey: "id"
                                },
                                tree: {
                                    valueKey: "id"
                                },
                                lazy: true,
                                highlightCurrent: true,
                                children: 'has_children',
                                load(node, resolve) {
                                    // 懒加载
                                    api.deptLazyLoad({ parent: node.data.id }).then((data) => {
                                        resolve(data.data)
                                    })
                                },
                                props: {
                                    // 为什么这里要写两层props
                                    // 因为props属性名与fs的动态渲染的props命名冲突，所以要多写一层
                                    label: "name",
                                    key: "id",
                                    value: "id",
                                    valueKey: "id",
                                },
                            }
                        },
                    }
                },
                name: {
                    title: '部门名称',
                    type: 'input',
                    search: { show: true },
                    column: {
                        sortable: true,
                        minWidth: 40,
                    },
                    form: {
                        rules: [ // 表单校验规则
                            {
                                required: true,
                                message: '部门名称必填项'
                            }
                        ],
                        component: {
                            span: 12,
                            placeholder: '请输入部门名称'
                        },
                    },
                    show: true,
                },
                owner: {
                    title: '负责人',
                    search: { show: true },
                    column: {
                        sortable: true,
                    },
                    form: {
                        component: {
                            span: 12,
                            props: {
                                clearable: true
                            },
                            placeholder: '请输入负责人'
                        }
                    }
                },
                phone: {
                    title: '联系电话',
                    column: {
                        sortable: true,
                    },
                    form: {
                        component: {
                            span: 12,
                            props: {
                                clearable: true
                            },
                            placeholder: '请输入联系电话'
                        }
                    }
                },
                email: {
                    title: '邮箱',
                    column: {
                        sortable: true,
                    },
                    form: {
                        component: {
                            span: 12,
                            props: {
                                clearable: true
                            },
                            placeholder: '请输入邮箱'
                        },
                        rules: [
                            {
                                type: 'email',
                                message: '请输入正确的邮箱地址',
                                trigger: ['blur', 'change']
                            }
                        ]
                    }
                },
                sort: {
                    title: '排序',
                    type: 'number',
                    column: {
                        sortable: true,
                        minWidth: 20,
                        align: 'center',
                    },
                    form: {
                        value: 1,
                        component: {
                            span: 12,
                            placeholder: '请选择序号'
                        }
                    }
                },
                status: {
                    title: "状态",
                    type: 'dict-radio',
                    search: {
                        show: false
                    },
                    dict: dict({
                        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
                        data: dictStore.dicts['button_status_bool']
                    }),
                    column: {
                        sortable: true,
                        align: 'center',
                        minWidth: 16,
                    },
                    form: {
                        value: true,
                        component: {
                            span: 12,
                            placeholder: '请选择状态'
                        }
                    }
                },
            }
        }
    };
}