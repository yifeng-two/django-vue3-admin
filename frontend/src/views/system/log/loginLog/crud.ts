/*
 * @Author: yifeng
 * @Date: 2022-10-05 14:52:33
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-10 20:58:59
 * @Description: 
 */
import * as api from "@/apis/system";
import useDictStore from "@/stores/system-dict";
import {dict } from "@fast-crud/fast-crud";
import { getCurrentInstance } from "vue";

export default function ({ expose }) {

    const dictStore = useDictStore()
    const { proxy } = getCurrentInstance()
    const pageRequest = async (query: any) => {
        const ret = await api.getSystemLogList(query);
        return ret
    };

    return {
        crudOptions: {
            request: {
                pageRequest,
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
                    colum: {
                        width: 90,
                        show: false
                    },
                    form: {
                        show: false
                    }
                },
                username: {
                    title: '登录用户名',
                    type: 'input',
                    search: {
                        show: true
                    },
                    column: {
                        width: 140,
                    },
                    form: {
                        show: false,
                        component: {
                            placeholder: '请输入登录用户名'
                        }
                    }
                },
                ip: {
                    title: '登录ip',
                    type: 'input',
                    search: {
                        show: false
                    },
                    column: {
                        width: 130,
                    },
                    form: {
                        show: false,
                        component: {
                            placeholder: '请输入登录ip'
                        }
                    }
                },
                isp: {
                    title: '运营商',
                    type: 'input',
                    search: {
                        show: false
                    },
                    column: {
                        width: 180,
                        show: false
                    },
                    form: {
                        component: {
                            placeholder: '请输入运营商'
                        }
                    }
                },
                continent: {
                    title: '大州',
                    type: 'input',
                    column: {
                        width: 80,
                    },
                    form: {
                        disabled: true,
                        component: {
                            placeholder: '请输入大州'
                        }
                    },
                    component: { props: { color: 'auto' } } // 自动染色
                },
                country: {
                    title: '国家',
                    type: 'input',
                    search:{
                        show:true
                    },
                    column: {
                        width: 80,
                    },
                    form: {
                        component: {
                            placeholder: '请输入国家'
                        }
                    },
                    component: { props: { color: 'auto' } } // 自动染色
                },
                province: {
                    title: '省份',
                    type: 'input',
                    column: {
                        width: 80,
                    },
                    form: {
                        component: {
                            placeholder: '请输入省份'
                        }
                    },
                    component: { props: { color: 'auto' } } // 自动染色
                },
                city: {
                    title: '城市',
                    type: 'input',
                    column: {
                        width: 80,
                    },
                    form: {
                        component: {
                            placeholder: '请输入城市'
                        }
                    },
                    component: { props: { color: 'auto' } } // 自动染色
                },
                district: {
                    title: '县区',
                    type: 'input',
                    column: {
                        width: 80,
                    },
                    form: {
                        component: {
                            placeholder: '请输入县区'
                        }
                    },
                    component: { props: { color: 'auto' } } // 自动染色
                },
                area_code: {
                    title: '区域代码',
                    type: 'input',
                    column: {
                        width: 100,
                    },
                    form: {
                        component: {
                            placeholder: '请输入区域代码'
                        }
                    },
                    component: { props: { color: 'auto' } } // 自动染色
                },
                country_english: {
                    title: '英文全称',
                    type: 'input',
                    column: {
                        width: 120,
                    },
                    form: {
                        component: {
                            placeholder: '请输入英文全称'
                        }
                    },
                    component: { props: { color: 'auto' } } // 自动染色
                },
                country_code: {
                    title: '简称',
                    type: 'input',
                    column: {
                        width: 100,
                    },
                    form: {
                        component: {
                            placeholder: '请输入简称'
                        }
                    },
                    component: { props: { color: 'auto' } } // 自动染色
                },
                longitude: {
                    title: '经度',
                    type: 'input',
                    column: {
                        width: 80,
                    },
                    disabled: true,
                    form: {
                        component: {
                            placeholder: '请输入经度'
                        }
                    },
                    component: { props: { color: 'auto' } } // 自动染色
                },
                latitude: {
                    title: '纬度',
                    type: 'input',
                    column: {
                        width: 80,
                        show: false
                    },
                    form: {
                        component: {
                            placeholder: '请输入纬度'
                        }
                    },
                    component: { props: { color: 'auto' } } // 自动染色
                },
                login_type: {
                    title: '登录类型',
                    type: 'dict-select',
                    search: {
                        show: false
                    },
                    column: {
                        width: 100,
                    },
                    dict: dict({
                        data: [{ label: '普通登录', value: 1 }]
                    }),
                    form: {
                        component: {
                            placeholder: '请选择登录类型'
                        }
                    },
                    component: { props: { color: 'auto' } } // 自动染色
                },
                os: {
                    title: '操作系统',
                    type: 'input',
                    column: {
                        width: 180,
                    },
                    form: {
                        component: {
                            placeholder: '请输入操作系统'
                        }
                    }
                },
                browser: {
                    title: '浏览器名',
                    type: 'input',
                    column: {
                        width: 180,
                    },
                    form: {
                        component: {
                            placeholder: '请输入浏览器名'
                        }
                    }
                },
                agent: {
                    title: 'agent信息',
                    type: 'input',
                    column: {
                        width: 180,
                        show: false
                    },
                    form: {
                        component: {
                            placeholder: '请输入agent信息'
                        }
                    }
                },
                create_datetime: {
                    fixed: 'right',
                    title: '登录时间',
                    type: 'datetime',
                    column: {
                        width: 160,
                    },
                }
            }

        }
    }
}