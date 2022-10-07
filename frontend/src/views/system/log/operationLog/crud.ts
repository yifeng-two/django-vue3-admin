/*
 * @Author: yifeng
 * @Date: 2022-10-05 15:20:55
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-07 18:46:11
 * @Description: 
 */
import * as api from "@/apis/system";
import useDictStore from "@/stores/system-dict";
import { dict } from "@fast-crud/fast-crud";

export default function ({ expose }) {

    const dictStore = useDictStore()

    const pageRequest = async (query: any) => {
        const ret = await api.getOperationLogList(query);
        return ret
    };

    return {
        crudOptions: {
            request: {
                pageRequest,
            },
            // rowHandle: {
            //     fixed: 'right',
            //     view: {
            //         thin: true,
            //         text: '',
            //         disabled() {
            //             return !vm.hasPermissions('Retrieve')
            //         }
            //     },
            //     width: 70,
            //     edit: {
            //         thin: true,
            //         text: '',
            //         show: false,
            //         disabled() {
            //             return !vm.hasPermissions('Update')
            //         }
            //     },
            //     remove: {
            //         thin: true,
            //         text: '删除',
            //         show: false,
            //         disabled() {
            //             return !vm.hasPermissions('Delete')
            //         }
            //     }
            // },
            form: {
                col: { span: 12 },
                display: "flex",
                labelWidth: "100px", //
                // labelCol: { span: 8 },
                // wrapperCol: { span: 14 }
            },
            table: {
                // 对应 el-table / a-table的配置
                border: true,
                bordered: true,
                height: "100%",
                rowKey: 'id',
                // defaultExpandAll: true,
                indent: "30"
            },
            columns: {
                _index: {
                    title: "序号",
                    form: { show: false },
                    column: {
                        // type: "index",
                        align: "center",
                        width: 100,
                        columnSetDisabled: true, //禁止在列设置中选择
                        formatter: (context) => {
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
                        show: false,
                    },
                    form: {
                        show: false,
                    }
                },
                request_modular: {
                    title: '请求模块',
                    type: 'input',
                    search:{
                        show:true
                    },
                    column: {
                        width: 140,
                    },
                    form: {
                        show: false,
                        component: {
                            placeholder: '请输入请求模块'
                        }
                    }
                },
                request_path: {
                    title: '请求地址',
                    type: 'input',
                    column: {
                        width: 220,
                    },
                    form: {
                        show: false,
                        component: {
                            placeholder: '请输入请求地址'
                        }
                    }
                },
                request_body: {
                    title: '请求参数',
                    type: 'textarea',
                    column: {
                        width: 220,
                        show: false,
                    },
                    form: {
                        show: false,
                        component: {
                            props: {
                                type: 'textarea'
                            },
                            autosize: {
                                minRows: 2, maxRows: 8
                            },
                            placeholder: '请输入关键词'
                        }
                    }
                },
                request_method: {
                    title: '请求方法',
                    type: 'input',
                    search:{
                        show:true
                    },
                    column: {
                        width: 100,
                    },
                    form: {
                        show: false,
                        component: {
                            placeholder: '请输入请求方法'
                        }
                    },
                    component: { props: { color: 'auto' } } // 自动染色
                },
                request_msg: {
                    title: '操作说明',
                    column: {
                        show:false,
                    },
                    form: {
                        component: {
                            span: 12
                        }
                    }
                },
                request_ip: {
                    title: 'IP地址',
                    type: 'input',
                    column: {
                        width: 130,
                        show:false,
                    },
                    form: {
                        show:false,
                        component: {
                            placeholder: '请输入IP地址'
                        }
                    },
                    component: { props: { color: 'auto' } } // 自动染色
                },
                request_browser: {
                    title: '请求浏览器',
                    type: 'input',
                    column: {
                        width: 180,
                    },
                    form: {
                        show:false,
                    },
                    component: { props: { color: 'auto' } } // 自动染色
                },
                response_code: {
                    title: '响应码',
                    type: 'input',
                    column: {
                        width: 80,
                    },
                    form: {
                        show:false,
                    },
                    component: { props: { color: 'auto' } } // 自动染色
                },
                request_os: {
                    title: '操作系统',
                    type: 'input',
                    column: {
                        width: 80,
                        show:false,
                    },
                    form: {
                        show:false,
                    },
                    component: { props: { color: 'auto' } } // 自动染色
                },
                json_result: {
                    title: '返回信息',

                    type: 'input',
                    column: {
                        minWidth: 240,
                    },
                    form: {
                        show:false,
                    },
                    component: { props: { color: 'auto' } } // 自动染色
                },
                creator_name: {
                    title: '操作人',
                    column: {
                        width: 100,
                    },
                    form: {
                        show:false,
                    }
                },
                update_datetime: {
                    title: '更新时间',
                    type: 'datetime',
                    column: {
                        width: 160,
                        show: false,
                    },
                    form: {
                        show:false,
                    }
                },
                create_datetime: {
                    fixed: 'right',
                    title: '操作时间',
                    type: 'datetime',
                    column: {
                        width: 160,
                    },
                    form: {
                        show:false,
                    }
                }

            }
        }
    }
}