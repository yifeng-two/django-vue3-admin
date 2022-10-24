/*
 * @Author: yifeng
 * @Date: 2022-09-28 21:46:49
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-22 22:20:33
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
        return await api.getAreaList(query);
    };
    const addRequest = async ({ form }) => {
        return await api.createArea(form);
    };
    const editRequest = async ({ form, row }) => {
        form.id = row.id;
        return await api.updateArea(form);
    };
    const delRequest = async ({ row }) => {
        return await api.deleteArea(row.id);
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
                highlightCurrentRow: true,
                // defaultExpandAll: true,
                lazy: true,
                load: async (row: any,treeNode:'name',resolve: (data: any) => void) => {
                    console.log(row);
                    const ret = await api.getAreaListByLazy({
                        pcode: row.code, limit: 999 
                    });
                    // console.log(ret);
                    ret.data.data.map(value => { value.hasChildren = value.pcode_count !== 0; });
                    row.hasChildren = false;
                    // return ret.data.data;
                    resolve(ret.data.data)
                },
                treeProps: {
                    children: 'children',
                    hasChild: 'hasChildren',
                },
                iconLoaded: 'Loading',// 美化loading图标
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
                id: {
                    title: 'ID',
                    column: {
                        width: 90,
                        show: false
                    },
                    form: {
                        show: false
                    }
                },
                pcode: {
                    title: '父级地区',
                    type: 'area-selector',
                    // dict: dict({
                    //     async getNodesByValues(scope: any) {
                    //         // 配置行展示远程获取nodes
                    //         return new Promise((resolve, reject) => {
                    //             const row = scope.row
                    //             console.log('row', row);
                    //             resolve(row.pcode !== null ? [{ name: row.name, id: row.pcode }] : [])
                    //         })
                    //     }
                    // }),
                    column: {
                        show: false,
                    },
                    form: {
                        component: {
                            showAllLevels: false, // 仅显示最后一级
                            props: {
                                elProps: {
                                    clearable: true,
                                    showAllLevels: false, // 仅显示最后一级
                                    props: {
                                        checkStrictly: true, // 可以不需要选到最后一级
                                        emitPath: false,
                                        clearable: true
                                    }
                                }
                            }
                        }
                    }
                },
                name: {
                    title: '名称',
                    type: 'text',
                    // treeNode:true,
                    column: {
                        width: 160,
                    },
                    form: {
                        rules: [ // 表单校验规则
                            { required: true, message: '名称必填项' }
                        ],
                        component: {
                            placeholder: '请输入名称'
                        },
                    }
                },
                code: {
                    title: '地区编码',
                    type: 'input',
                    form: {
                        rules: [ // 表单校验规则
                            { required: true, message: '地区编码必填项' }
                        ],
                        component: {
                            placeholder: '请输入地区编码'
                        },
                    }
                },
                pinyin: {
                    title: '拼音',
                    type: 'input',
                    form: {
                        rules: [ // 表单校验规则
                            { required: true, message: '拼音必填项' }
                        ],
                        component: {
                            placeholder: '请输入拼音'
                        }
                    }
                },
                level: {
                    title: '地区层级',
                    type: 'input',
                    form: {
                        show: true,
                        rules: [ // 表单校验规则
                            { required: true, message: '拼音必填项' }
                        ],
                        component: {
                            placeholder: '请输入拼音'
                        }
                    }
                },
                initials: {
                    title: '首字母',
                    form: {
                        rules: [ // 表单校验规则
                            { required: true, message: '首字母必填项' }
                        ],
                        component: {
                            placeholder: '请输入首字母'
                        }
                    }
                },
                enable: {
                    title: '是否启用',
                    type: 'dict-radio',
                    dict: dict({
                        data: dictStore.dicts['button_status_bool']
                    }),
                    column: {
                        width: 90,
                    },
                    form: {
                        value: true,
                    }
                }
            }
        }
    };
}
