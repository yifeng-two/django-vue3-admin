/*
 * @Author: yifeng
 * @Date: 2022-09-28 21:46:49
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-30 23:22:22
 * @Description: 
 */
import * as api from "@/apis";
import useDictStore from "@/stores/system-dict";
import { compute, dict } from "@fast-crud/fast-crud";
import axiosInstance from '@/utils/net/axiosInstance'
import XEUtils from 'xe-utils'
import { h } from "vue";
import { ElAlert } from "element-plus";

export default function ({ expose }) {

    // 验证路由地址
    const validateWebPath = (rule, value, callback) => {
        const isLink = expose.getEditForm().is_link
        let pattern = /^\/.*?/
        if (isLink) {
            pattern = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/g
        } else {
            pattern = /^\/.*?/
        }
        if (!pattern.test(value)) {
            callback(new Error('请正确的地址'))
        } else {
            callback()
        }
    }

    // 返回views目录下所有vue文件路径
    const searchFiles = () => {
        const files = import.meta.glob("/src/views/**/**.vue", { eager: true })
        const result = [] as any

        for (const key in files) {
            if (Object.prototype.hasOwnProperty.call(files, key)) {
                // result[key.replace(/(\.\/|\.vue)/g, '')] = files[key].default
                const file = key.replace(/(\.\/|\.vue)/g, '').replace("/src/views/", '')
                result.push({
                    label: file,
                    value: file
                })
            }
        }
        // console.log(result);
        return result
    }

    const dictStore = useDictStore()

    const pageRequest = async (query: any) => {
        const ret = await api.getMenuList(query);
        ret.data.data = XEUtils.toArrayTree(ret.data.data, { parentKey: 'parent' })
        return ret
    };
    const editRequest = async ({ form, row }) => {
        form.id = row.id;
        return await api.updateMenu(form);
    };
    const delRequest = async ({ row }) => {
        return await api.deleteMenu(row.id);
    };

    const addRequest = async ({ form }) => {
        return await api.createMenu(form);
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
                        show: false,
                        width: 60,
                    },
                    form: {
                        show: false,
                        component: {
                            show: false
                        }
                    }
                },
                parent: {
                    title: '父级菜单',
                    column: {
                        show: false,
                    },
                    type: 'dict-cascader',
                    dict: dict({
                        url: '/api/system/menu/',
                        cache: false,
                        isTree: true,
                        value: 'id', // 数据字典中value字段的属性名
                        label: 'name', // 数据字典中label字段的属性名
                        children: 'children', // 数据字典中children字段的属性名
                        async getData(dict: any) { // 配置此参数会覆盖全局的getRemoteDictFunc
                            const ret = await axiosInstance({
                                url: dict.url,
                                params: {
                                    limit: 999,
                                    status: 1,
                                    is_catalog: 1
                                }
                            })
                            const responseData = ret.data.data
                            const result = XEUtils.toArrayTree(responseData, { parentKey: 'parent', strict: true })
                            return [{ id: null, name: '根节点', children: result }]
                        }
                    }),
                    form: {
                        component: {
                            props: {
                                select: {
                                    valueKey: "id"
                                },
                                tree: {
                                    valueKey: "id"
                                },
                                highlightCurrent: true,
                                props: {
                                    // 为什么这里要写两层props
                                    // 因为props属性名与fs的动态渲染的props命名冲突，所以要多写一层
                                    label: "name",
                                    key: "id",
                                    value: "id",
                                    valueKey: "id",
                                },
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
                    title: '菜单名称',
                    type: 'input',
                    search: {
                        show: true
                    },
                    column: {
                        sortable: true,
                        minWidth: 240,
                    },
                    form: {
                        rules: [ // 表单校验规则
                            { required: true, message: '菜单名称必填项' }
                        ],
                        component: {
                            props: {
                                clearable: true
                            },
                            placeholder: '请输入菜单名称'
                        },
                    }
                },
                icon: {
                    title: '图标',
                    type: "text",
                    column: {
                        width: 80,
                        align: 'center',
                        component: {
                            name: "fs-icon",
                            vModel: "icon",
                            style: "font-size:18px"
                        }
                    },
                    form: {
                        component: {
                            placeholder: '请输入图标'
                        }
                    }
                },
                sort: {
                    title: '排序',
                    type: 'number',
                    column: {
                        width: 80,
                        align: 'center',
                    },
                    form: {
                        value: 1,
                        component: {
                            placeholder: '请输入排序'
                        }
                    }
                },
                is_catalog: {
                    title: '是否目录',
                    type: 'dict-radio',
                    dict: dict({
                        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
                        data: dictStore.dicts['button_whether_bool']
                    }),
                    column: {
                        width: 100,
                        align: 'center',
                    },
                    form: {
                        value: false,
                        component: {
                            placeholder: '请选择是否目录'
                        },
                        valueChange({ key, value, form }) {
                            console.log(key, value, form);
                            if (!value) {
                                form.web_path = undefined
                                form.component = undefined
                                form.component_name = undefined
                                form.cache = false
                                form.is_link = false
                            }
                        }
                    }
                },
                is_link: {
                    title: '外链接',
                    type: 'dict-radio',
                    dict: dict({
                        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
                        data: dictStore.dicts['button_whether_bool']
                    }),
                    column: {
                        width: 70,
                    },
                    form: {
                        show: compute(({ form }) => {
                            return !form.is_catalog;
                        }),
                        value: false,
                        component: {
                            placeholder: '请选择是否外链接'
                        },
                        valueChange({ key, value, form }) {
                            form.web_path = undefined
                            form.component = undefined
                            form.component_name = undefined
                            // if (value) {
                            //     getColumn('web_path').title = '外链接地址'
                            //     getColumn('web_path').component.placeholder = '请输入外链接地址'
                            //     getColumn('web_path').helper = {
                            //         render() {
                            //             return h(
                            //                 // 1. 要渲染的标签名称：第一个参数【必需】
                            //                 ElAlert,
                            //                 // 2. 渲染标签的属性：第二个参数【可选】
                            //                 {
                            //                     title: "外链接地址,请以https|http|ftp|rtsp|mms开头",
                            //                     type: "warning",
                            //                 },
                            //             );
                            //         },
                            //     }
                            // } else {
                            //     getColumn('web_path').title = '路由地址'
                            //     getColumn('web_path').component.placeholder = '请输入路由地址'
                            //     getColumn('web_path').helper = {
                            //         render() {
                            //             return h(
                            //                 // 1. 要渲染的标签名称：第一个参数【必需】
                            //                 ElAlert,
                            //                 // 2. 渲染标签的属性：第二个参数【可选】
                            //                 {
                            //                     title: "浏览器中url的地址,请以/开头",
                            //                     type: "warning",
                            //                 },
                            //             );
                            //         },
                            //     }
                            // }
                        }
                    }
                },
                web_path: {
                    title: '路由地址',
                    column: {
                        minWidth: 120,
                    },
                    form: {
                        show: compute(({ form }) => {
                            return !form.is_catalog;
                        }),
                        rules: [
                            { required: true, message: '请输入正确的路由地址' },
                            { validator: validateWebPath, trigger: 'change' }
                        ],
                        component: {
                            props: {
                                clearable: true
                            },
                            placeholder: '请输入路由地址'
                        },
                        helper: {
                            render() {
                                return h(
                                    // 1. 要渲染的标签名称：第一个参数【必需】
                                    ElAlert,
                                    // 2. 渲染标签的属性：第二个参数【可选】
                                    {
                                        title: "浏览器中url的地址,请以/开头",
                                        type: "warning",
                                    },
                                );
                            },
                        }
                    }
                },
                component: {
                    title: '组件地址',
                    type: 'dict-select',
                    dict: dict({
                        cache: false,
                        data: searchFiles()
                    }),
                    column: {
                        minWidth: 150,
                    },
                    form: {
                        show: compute(({ form }) => {
                            return !form.is_catalog && !form.is_link
                        }),
                        rules: [
                            { required: true, message: '请选择组件地址' }
                        ],
                        component: {

                            props: {
                                clearable: true,
                                filterable: true // 可过滤选择项
                            },
                            placeholder: '请输入组件地址'
                        },
                        helper: {
                            render() {
                                return h(
                                    // 1. 要渲染的标签名称：第一个参数【必需】
                                    ElAlert,
                                    // 2. 渲染标签的属性：第二个参数【可选】
                                    {
                                        title: "src/views下的文件夹地址",
                                        type: "warning",
                                    },
                                );
                            },
                        }
                    }
                },
                component_name: {
                    title: '组件名称',
                    search: {
                        show: true
                    },
                    column: {
                        width: 170,
                    },
                    form: {
                        show: compute(({ form }) => {
                            return !form.is_catalog && !form.is_link
                        }),
                        rules: [
                            { required: true, message: '请输入组件名称' }
                        ],
                        component: {
                           
                            props: {
                                clearable: true
                            },
                            placeholder: '请输入组件名称'
                        },
                        helper: {
                            render() {
                                return h(
                                    // 1. 要渲染的标签名称：第一个参数【必需】
                                    ElAlert,
                                    // 2. 渲染标签的属性：第二个参数【可选】
                                    {
                                        title: "xx.vue文件中的name",
                                        type: "warning",
                                    },
                                );
                            },
                        }
                    }
                },
                menuPermission: {
                    title: '拥有权限',
                    type: 'dict-select',
                    column: {
                        minWidth: 200,
                        component: {
                            color: "auto", // 自动染色
                        }
                    },
                    form: {
                        show: false,
                        component: {
                            // el-select的配置项，https://element-plus.gitee.io/zh-CN/component/select.html
                            filterable: true,
                            multiple: true,
                            clearable: true
                        }
                    }
                },
                cache: {
                    title: '缓存',
                    type: 'dict-radio',
                    dict: dict({
                        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
                        data: dictStore.dicts['button_whether_bool']
                    }),
                    search: {
                        show: true
                    },
                    column: {
                        width: 80,
                        align: 'center'
                    },
                    form: {
                        show: compute(({ form }) => {
                            return !form.is_catalog
                        }),
                        value: false,
                        component: {
                            
                            placeholder: '请选择是否缓存'
                        },
                        helper: {
                            render() {
                                return h(
                                    // 1. 要渲染的标签名称：第一个参数【必需】
                                    ElAlert,
                                    // 2. 渲染标签的属性：第二个参数【可选】
                                    {
                                        title: "是否开启页面缓存,需要组件名称和xx.vue页面的name一致",
                                        type: "warning",
                                    },
                                );
                            },
                        }
                    }
                },
                visible: {
                    title: '侧边可见',
                    type: 'dict-radio',
                    dict: dict({
                        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
                        data: dictStore.dicts['button_whether_bool']
                    }),
                    search: {
                        show: true
                    },
                    column: {
                        width: 100,
                        align: 'center'
                    },
                    form: {
                        value: true,
                        component: {
                            placeholder: '请选择侧边可见'
                        },
                        rules: [ // 表单校验规则
                            { required: true, message: '侧边可见必填项' }
                        ],
                        helper: {
                            // render () {
                            //   return <elAlert title={"是否显示在侧边菜单中"} type={"warning" }</elAlert>
                            // }
                            render() {
                                return h(
                                    // 1. 要渲染的标签名称：第一个参数【必需】
                                    ElAlert,
                                    // 2. 渲染标签的属性：第二个参数【可选】
                                    {
                                        title: "是否显示在侧边菜单中",
                                        type: "warning",
                                    },
                                );
                            },

                        }
                    }
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
                        sortable: true,
                        width: 80,
                        align: 'center'
                    },
                    form: {
                        value: true,
                        component: {
                            placeholder: '请选择状态'
                        },
                        rules: [ // 表单校验规则
                            { required: true, message: '状态必填项' }
                        ]
                    }
                }
            }
        }
    };
}