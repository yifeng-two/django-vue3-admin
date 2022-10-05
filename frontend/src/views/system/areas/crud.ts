/*
 * @Author: yifeng
 * @Date: 2022-09-28 21:46:49
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-28 22:37:59
 * @Description: 
 */
import * as api from "@/apis";
import useDictStore from "@/stores/system-dict";
import { dict } from "@fast-crud/fast-crud";
import axiosInstance from '@/utils/net/axiosInstance'
import XEUtils from 'xe-utils'

export default function ({ expose }) {
    const dictStore = useDictStore()

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
                defaultExpandAll:true,
                slots: {}    // 对应el-table ,a-table的插槽
            },
            form: {
                display: "flex",
                col: { span: 24 },
                labelWidth: "100px", //
            },
            rowHandle: {
                width: 240
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
                        formatter: (context:any) => {
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
                        getNodes(scope:any) {
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
                            name:'el-tree-select',
                            props: {
                                multiple: false,
                                select: {
                                    valueKey: "id"
                                },
                                tree: {
                                    valueKey: "id"
                                },
                                lazy: true,
                                highlightCurrent:true,
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
                    sortable: true,
                    search: { show: true },
                    column: {
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
                    sortable: true,
                    search: { show: true },
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
                    sortable: true,
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
                    sortable: true,
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
                    sortable: true,
                    type: 'number',
                    column: {
                        minWidth: 10,
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
                    sortable: true,
                    search: {
                        show: false
                    },
                    dict: dict({
                        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
                        data: dictStore.dicts['button_status_bool']
                    }),
                    column: {
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
// export default function ({ expose }) {

//     // 验证路由地址
//     const validateWebPath = (rule, value, callback) => {
//         const isLink = expose.getEditForm().is_link
//         let pattern = /^\/.*?/
//         if (isLink) {
//             pattern = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/g
//         } else {
//             pattern = /^\/.*?/
//         }
//         if (!pattern.test(value)) {
//             callback(new Error('请正确的地址'))
//         } else {
//             callback()
//         }
//     }

//     // 返回views目录下所有vue文件路径
//     const searchFiles = () => {
//         const files = require.context('@/views', true, /\.vue$/)
//         const result = [] as any
//         files.keys().forEach((key) => {
//             result.push({
//                 label: key.replace(/(\.\/|\.vue)/g, ''),
//                 value: key.replace(/(\.\/|\.vue)/g, '')
//             })
//         })
//         return result
//     }

//     const dictStore = useDictStore()

//     const pageRequest = async (query: any) => {
//         return await api.getMenuList(query);
//     };
//     const editRequest = async ({ form, row }) => {
//         form.id = row.id;
//         return await api.updateMenu(form);
//     };
//     const delRequest = async ({ row }) => {
//         return await api.deleteMenu(row.id);
//     };

//     const addRequest = async ({ form }) => {
//         return await api.createMenu(form);
//     };

//     return {
//         crudOptions: {
//             request: {
//                 pageRequest,
//                 addRequest,
//                 editRequest,
//                 delRequest
//             },
//             form: {
//                 display: "flex",
//                 col: { span: 24 },
//                 labelWidth: "100px", //
//                 // labelCol: { span: 8},
//                 // width: '35%'
//             },
//             columns: {
//                 _index: {
//                     title: "序号",
//                     form: { show: false },
//                     column: {
//                         // type: "index",
//                         align: "center",
//                         width: "55px",
//                         columnSetDisabled: true, //禁止在列设置中选择
//                         formatter: (context) => {
//                             //计算序号,你可以自定义计算规则，此处为翻页累加
//                             const index = context.index ?? 1;
//                             const pagination = expose.crudBinding.value.pagination;
//                             return ((pagination.currentPage ?? 1) - 1) * pagination.pageSize + index + 1;
//                         }
//                     }
//                 },
//                 id: {
//                     title: 'ID',
//                     column: {
//                         show: false,
//                         width: 60,
//                     },
//                     form: {
//                         component: {
//                             show: false
//                         }
//                     }
//                 },
//                 parent: {
//                     title: '父级菜单',
//                     column: {
//                         show: false,
//                     },
//                     type: 'dict-cascader',
//                     dict: dict({
//                         url: '/api/system/menu/',
//                         cache: false,
//                         isTree: true,
//                         value: 'id', // 数据字典中value字段的属性名
//                         label: 'name', // 数据字典中label字段的属性名
//                         children: 'children', // 数据字典中children字段的属性名
//                         async getData(dict: any) { // 配置此参数会覆盖全局的getRemoteDictFunc
//                             const ret = await axiosInstance({
//                                 url: dict.url,
//                                 params: {
//                                     limit: 999,
//                                     status: 1,
//                                     is_catalog: 1
//                                 }
//                             })
//                             const responseData = ret.data.data
//                             const result = XEUtils.toArrayTree(responseData, { parentKey: 'parent', strict: true })
//                             return [{ id: null, name: '根节点', children: result }]
//                         }
//                     }),
//                     form: {
//                         component: {
//                             props: {
//                                 select: {
//                                     valueKey: "id"
//                                 },
//                                 tree: {
//                                     valueKey: "id"
//                                 },
//                                 highlightCurrent: true,
//                                 props: {
//                                     // 为什么这里要写两层props
//                                     // 因为props属性名与fs的动态渲染的props命名冲突，所以要多写一层
//                                     label: "name",
//                                     key: "id",
//                                     value: "id",
//                                     valueKey: "id",
//                                 },
//                                 elProps: {
//                                     clearable: true,
//                                     showAllLevels: false, // 仅显示最后一级
//                                     props: {
//                                         checkStrictly: true, // 可以不需要选到最后一级
//                                         emitPath: false,
//                                         clearable: true
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 },
//                 name: {
//                     title: '菜单名称',
//                     sortable: true,
//                     type: 'input',
//                     column: {
//                         minWidth: 180,
//                     },
//                     form: {
//                         rules: [ // 表单校验规则
//                             { required: true, message: '菜单名称必填项' }
//                         ],
//                         component: {
//                             props: {
//                                 clearable: true
//                             },
//                             placeholder: '请输入菜单名称'
//                         },
//                     }
//                 },
//                 icon: {
//                     title: '图标',
//                     type: 'icon-selector',
//                     column: {
//                         width: 60,
//                     },
//                     form: {
//                         component: {
//                             placeholder: '请输入图标'
//                         }
//                     }
//                 },
//                 sort: {
//                     title: '排序',
//                     type: 'number',
//                     column: {
//                         width: 60,
//                     },
//                     form: {
//                         value: 1,
//                         component: {
//                             placeholder: '请输入排序'
//                         }
//                     }
//                 },
//                 is_catalog: {
//                     title: '是否目录',
//                     type: 'dict-switch',
//                     dict: dict({
//                         cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
//                         data: dictStore.dicts['button_whether_bool']
//                     }),
//                     column: {
//                         width: 100,
//                     },
//                     form: {
//                         value: false,
//                         component: {
//                             placeholder: '请选择是否目录'
//                         },
//                         // valueChange(key, value, form, { getColumn, mode, component, immediate, getComponent }) {
//                         //     if (!value) {
//                         //         form.web_path = undefined
//                         //         form.component = undefined
//                         //         form.component_name = undefined
//                         //         form.cache = false
//                         //         form.is_link = false
//                         //     }
//                         // }
//                     }
//                 },
//                 is_link: {
//                     title: '外链接',
//                     type: 'dict-radio',
//                     dict: dict({
//                         cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
//                         data: dictStore.dicts['button_whether_bool']
//                     }),
//                     column: {
//                         width: 70,
//                     },
//                     form: {
//                         value: false,
//                         component: {
//                             show(context) {
//                                 const { form } = context
//                                 return !form.is_catalog
//                             },
//                             placeholder: '请选择是否外链接'
//                         },
//                         // valueChange(key, value, form, { getColumn, mode, component, immediate, getComponent }) {
//                         //     form.web_path = undefined
//                         //     form.component = undefined
//                         //     form.component_name = undefined
//                         //     if (value) {
//                         //         getColumn('web_path').title = '外链接地址'
//                         //         getColumn('web_path').component.placeholder = '请输入外链接地址'
//                         //         getColumn('web_path').helper = {
//                         //             render(h) {
//                         //                 return (<el-alert title = "外链接地址,请以https|http|ftp|rtsp|mms开头" type = "warning" />
//                         //       )
//                         //             }
//                         //         }
//                         //     } else {
//                         //         getColumn('web_path').title = '路由地址'
//                         //         getColumn('web_path').component.placeholder = '请输入路由地址'
//                         //         getColumn('web_path').helper = {
//                         //             render(h) {
//                         //                 return (<el-alert title = "浏览器中url的地址,请以/开头" type = "warning" />
//                         //       )
//                         //             }
//                         //         }
//                         //     }
//                         // }
//                     }
//                 },
//                 web_path: {
//                     title: '路由地址',
//                     width: 150,
//                     show: false,
//                     form: {
//                         rules: [
//                             { required: true, message: '请输入正确的路由地址' },
//                             { validator: validateWebPath, trigger: 'change' }
//                         ],
//                         component: {
//                             show(context) {
//                                 const { form } = context
//                                 return !form.is_catalog
//                             },
//                             props: {
//                                 clearable: true
//                             },
//                             placeholder: '请输入路由地址'
//                         },
//                         helper: {
//                             //     render(h) {
//                             //         return (<el-alert title = "浏览器中url的地址,请以/开头" type = "warning" />
//                             //   )
//                             //     }
//                         }
//                     }
//                 },
//                 component: {
//                     title: '组件地址',
//                     type: 'dict-select',
//                     show: false,
//                     dict: dict({
//                         cache: false,
//                         data: searchFiles()
//                     }),
//                     form: {
//                         rules: [
//                             { required: true, message: '请选择组件地址' }
//                         ],
//                         component: {
//                             show(context) {
//                                 const { form } = context
//                                 return !form.is_catalog && !form.is_link
//                             },
//                             props: {
//                                 clearable: true,
//                                 filterable: true // 可过滤选择项
//                             },
//                             placeholder: '请输入组件地址'
//                         },
//                         helper: {
//                             //     render(h) {
//                             //         return (<el-alert title = "src/views下的文件夹地址" type = "warning" />
//                             //   )
//                             //     }
//                         }
//                     }
//                 },
//                 component_name: {
//                     title: '组件名称',
//                     width: 170,
//                     form: {
//                         rules: [
//                             { required: true, message: '请输入组件名称' }
//                         ],
//                         component: {
//                             show(context) {
//                                 const { form } = context
//                                 return !form.is_catalog && !form.is_link
//                             },
//                             props: {
//                                 clearable: true
//                             },
//                             placeholder: '请输入组件名称'
//                         },
//                         helper: {
//                             // render (h) {
//                             //   return (< el-alert title="xx.vue文件中的name" type="warning" />
//                             //   )
//                             // }
//                         }
//                     }
//                 },
//                 menuPermission: {
//                     title: '拥有权限',
//                     type: 'dict-select',
//                     column: {
//                         width: 300,
//                     },
//                     form: {
//                         disabled: true,
//                         component: {
//                             elProps: { // el-select的配置项，https://element.eleme.cn/#/zh-CN/component/select
//                                 filterable: true,
//                                 multiple: true,
//                                 clearable: true
//                             }
//                         }
//                     }
//                 },
//                 cache: {
//                     title: '缓存',
//                     search: {
//                         disabled: false
//                     },
//                     width: 60,
//                     type: 'dict-radio',
//                     dict: dict({
//                         cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
//                         data: dictStore.dicts['button_whether_bool']
//                     }),
//                     form: {
//                         value: false,
//                         component: {
//                             show(context) {
//                                 const { form } = context
//                                 return !form.is_catalog
//                             },
//                             placeholder: '请选择是否缓存'
//                         },
//                         helper: {
//                             // render () {
//                             //   return (< el-alert title="是否开启页面缓存,需要组件名称和xx.vue页面的name一致" type="warning" />
//                             //   )
//                             // }
//                         }
//                     }
//                 },
//                 visible: {
//                     title: '侧边可见',
//                     search: {
//                         disabled: false
//                     },
//                     width: 75,
//                     type: 'dict-radio',
//                     dict: dict({
//                         cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
//                         data: dictStore.dicts['button_whether_bool']
//                     }),
//                     form: {
//                         value: true,
//                         component: {
//                             placeholder: '请选择侧边可见'
//                         },
//                         rules: [ // 表单校验规则
//                             { required: true, message: '侧边可见必填项' }
//                         ],
//                         helper: {
//                             // render (h) {
//                             //   return (< el-alert title="是否显示在侧边菜单中" type="warning" />
//                             //   )
//                             // }
//                         }
//                     }
//                 },
//                 status: {
//                     title: '状态',
//                     sortable: true,
//                     search: {
//                         disabled: false
//                     },
//                     width: 70,
//                     type: 'dict-radio',
//                     dict: dict({
//                         cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
//                         data: dictStore.dicts['button_status_bool']
//                     }),
//                     form: {
//                         value: true,
//                         component: {
//                             placeholder: '请选择状态'
//                         },
//                         rules: [ // 表单校验规则
//                             { required: true, message: '状态必填项' }
//                         ]
//                     }
//                 }
//             }
//         }
//     };
// }