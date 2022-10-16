/*
 * @Author: yifeng
 * @Date: 2022-09-17 22:58:09
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-07 17:31:13
 * @Description: 
 */
import * as api from "@/apis/system";
import useDictStore from "@/stores/system-dict";
import { dict } from "@fast-crud/fast-crud";
import { getCurrentInstance } from "vue";

export default function ({ expose, props, ctx }) {
    const dictStore = useDictStore()
    const {proxy} =getCurrentInstance()
    const pageRequest = async (query) => {
        query.is_value = true
        query.parent = props.catagoryDict.id
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
                width: 240,
                buttons:{
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
                border: true,
                bordered: true,
                height: "100%",
                rowKey: 'id',
                stripe: true,
                highlightCurrentRow: true,
                // 监听 el-table的单行选中事件
                // onCurrentChange(currentRow) {
                //     console.log("选中行", currentRow);
                //     asideTableRef.value.setSearchFormData({ form: { gradeId: props.catagoryDict.id } });
                //     asideTableRef.value.doRefresh();
                // }
                slots: {}    // 对应el-table ,a-table的插槽
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
                    title: '名称',
                    type: 'input',
                    search: {
                        show: true,
                        component: {
                            props: {
                                clearable: true
                            }
                        }
                    },
                    column: {
                        minWidth: 100
                    },
                    form: {
                        rules: [ // 表单校验规则
                            { required: true, message: '名称必填项' }
                        ],
                        component: {
                            props: {
                                clearable: true
                            },
                            placeholder: '请输入名称'
                        },
                    }
                },
                type: {
                    title: '数据值类型',
                    type: 'dict-select',
                    dict: dict({
                        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
                        data: [
                            { label: 'text', value: 0 },
                            { label: 'number', value: 1 },
                            { label: 'date', value: 2 },
                            { label: 'datetime', value: 3 },
                            { label: 'time', value: 4 },
                            { label: 'file', value: 5 },
                            { label: 'boolean', value: 6 },
                            { label: 'images', value: 7 }
                        ]
                    }),
                    column: {
                        show: false,
                    },
                    form: {
                        rules: [ // 表单校验规则
                            { required: true, message: '数据值类型必填项' }
                        ],
                        value: 0,
                        component: {
                            props: {
                                clearable: true
                            },
                            placeholder: '请选择数据值类型'
                        },
                        // valueChange(key, value, form, { getColumn, mode, component, immediate, getComponent }) {
                        //     const template = vm.getEditFormTemplate('value')
                        //     // 选择框重新选择后，情况value值
                        //     if (!immediate) {
                        //         form.value = undefined
                        //     }
                        //     if (value === 0) {
                        //         template.component.name = 'el-input'
                        //     } else if (value === 1) {
                        //         template.component.name = 'el-input-number'
                        //     } else if (value === 2) {
                        //         template.component.name = 'el-date-picker'
                        //         template.component.props = {
                        //             type: 'date',
                        //             valueFormat: 'yyyy-MM-dd'
                        //         }
                        //     } else if (value === 3) {
                        //         template.component.name = 'el-date-picker'
                        //         template.component.props = {
                        //             type: 'datetime',
                        //             valueFormat: 'yyyy-MM-dd HH:mm:ss'
                        //         }
                        //     } else if (value === 4) {
                        //         template.component.name = 'el-time-picker'
                        //         template.component.props = {
                        //             pickerOptions: {
                        //                 arrowControl: true
                        //             },
                        //             valueFormat: 'HH:mm:ss'
                        //         }
                        //     } else if (value === 5) {
                        //         template.component.name = 'd2p-file-uploader'
                        //         template.component.props = { elProps: { listType: 'text' } }
                        //     } else if (value === 6) {
                        //         template.component.name = 'dict-switch'
                        //         template.component.value = true
                        //         template.component.props = {
                        //             dict: {
                        //                 data: [
                        //                     { label: '是', value: 'true' },
                        //                     { label: '否', value: 'false' }
                        //                 ]
                        //             }
                        //         }
                        //     } else if (value === 7) {
                        //         template.component.name = 'd2p-cropper-uploader'
                        //         template.component.props = { accept: '.png,.jpeg,.jpg,.ico,.bmp,.gif', cropper: { viewMode: 1 } }
                        //     }
                        // },
                        // valueChangeImmediate: true
                    }
                },
                value: {
                    title: '数据值',
                    type: 'input',
                    column: {
                        minWidth: 100,
                    },
                    form: {
                        rules: [ // 表单校验规则
                            { required: true, message: '数据值必填项' }
                        ],
                        component: {
                            props: {
                                clearable: true
                            },
                            placeholder: '请输入数据值'
                        },
                    },
                    // // 提交时,处理数据
                    // valueResolve(row, col) {
                    //     const value = row[col.key]
                    //     const type = row.type
                    //     if (type === 5 || type === 7) {
                    //         if (value != null) {
                    //             if (value.length >= 0) {
                    //                 if (value instanceof Array) {
                    //                     row[col.key] = value.toString()
                    //                 } else {
                    //                     row[col.key] = value
                    //                 }
                    //             } else {
                    //                 row[col.key] = null
                    //             }
                    //         }
                    //     } else {
                    //         row[col.key] = value
                    //     }
                    // },
                    // // 接收时,处理数据
                    // valueBuilder(row, col) {
                    //     const value = row[col.key]
                    //     const type = row.type
                    //     if (type === 5 || type === 7) {
                    //         if (value != null && value) {
                    //             row[col.key] = value.split(',')
                    //         }
                    //     } else {
                    //         row[col.key] = value
                    //     }
                    // },
                },
                status: {
                    title: '状态',
                    type: 'dict-radio',
                    dict: dict({
                        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
                        data: dictStore.dicts['button_status_bool']
                    }),
                    search: {
                        show: true
                    },
                    column: {
                        align: "center",
                        width: 80,
                    },

                    form: {
                        value: true,
                        rules: [ // 表单校验规则
                            { required: true, message: '状态必填项' }
                        ],
                    }
                },
                sort: {
                    title: '排序',
                    type: 'number',
                    column: {
                        align: "center",
                        width: 80,
                    },
                    form: {
                        value: 1,
                        rules: [ // 表单校验规则
                            { required: true, message: '排序必填项' }
                        ],
                    }
                },
                color: {
                    title: '标签颜色',
                    type: 'dict-select',
                    column: {
                        width: 100,
                    },
                    dict: dict({
                        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
                        data: [
                            { label: 'success', value: 'success', color: 'success' },
                            { label: 'primary', value: 'primary', color: 'primary' },
                            { label: 'info', value: 'info', color: 'info' },
                            { label: 'danger', value: 'danger', color: 'danger' },
                            { label: 'warning', value: 'warning', color: 'warning' }
                        ]
                    }),
                    form: {
                        component: {
                            props: {
                                clearable: true
                            }
                        },
                    }
                }
            }
        }
    };
}
