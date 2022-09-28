/*
 * @Author: yifeng
 * @Date: 2022-09-17 22:58:09
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-26 22:29:11
 * @Description: 
 */
import * as api from "@/apis";
import useDictStore from "@/stores/system-dict";
import { dict } from "@fast-crud/fast-crud";
// md5加密
import md5 from 'js-md5'
import axiosInstance from '@/utils/axiosInstance'

export default function ({ expose }) {
    const dictStore = useDictStore()
    // dictStore.load()
    // const remoteDict = dict({
    //     cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
    //     url: "/mock/dicts/OpenStatusEnum",
    //     immediate: false
    //   });
    const genderDict = dict({
        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
        data: dictStore.dicts['gender']
    })
    const userTypeDict = dict({
        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
        data: dictStore.dicts['user_type']
    })
    const statusDict = dict({
        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
        data: dictStore.dicts['button_status_bool']
    })

    const pageRequest = async (query: any) => {
        return await api.getUserList(query);
    };
    const editRequest = async ({ form, row }) => {
        form.id = row.id;
        return await api.updateUser(form);
    };
    const delRequest = async ({ row }) => {
        return await api.deleteUser(row.id);
    };

    const addRequest = async ({ form }) => {
        return await api.addUser(form);
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
                // buttons: {
                //     //自定义按钮，可以任意命名,任意数量
                //     resetPassword: {
                //         type: "danger",
                //         text: '密码重置',
                //         title: "重置",//鼠标停留显示的信息
                //         icon: "RefreshLeft",
                //         size: "default",
                //         click(opts) {
                //             console.log("自定义操作列按钮点击", opts);
                //             selectResetDialogVisible.value = true
                //             resetPwdForm.id = id
                //         },
                //         order: 5
                //     }
                // },
            },
            form: {
                display: "flex"
            },
            columns: {
                $checked: {
                    title: "选择",
                    form: { show: false },
                    column: {
                        type: "selection",
                        align: "center",
                        width: "55px",
                        columnSetDisabled: true, //禁止在列设置中选择
                        selectable(row, index) {
                            return row.id !== 1; //设置第一行不允许选择
                        }
                    }
                },
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
                username: {
                    title: "账号",
                    search: { show: true },
                    type: 'input',
                    column: {
                        minWidth: 100,
                    },
                    form: {
                        rules: [ // 表单校验规则
                            {
                                required: true,
                                message: '账号必填项'
                            }
                        ],
                        component: {
                            placeholder: '请输入账号'
                        },
                    }
                },
                password: {
                    title: '密码',
                    type: 'input',
                    column: {
                        minWidth: 90,
                    },
                    form: {
                        rules: [ // 表单校验规则
                            {
                                required: true,
                                message: '密码必填项'
                            }
                        ],
                        component: {
                            span: 12,
                            showPassword: true,
                            placeholder: '请输入密码'
                        },
                        // vm.systemConfig('base.default_password')
                        value: "123456",
                        editDisabled: true,
                        itemProps: {
                            class: { yxtInput: true }
                        }
                    },
                    show: true,
                    valueResolve(row, key) {
                        if (row.password) {
                            row.password = md5(row.password)
                        }
                    }
                },
                name: {
                    title: "姓名",
                    search: { show: true },
                    type: 'input',
                    column: {
                        minWidth: 100,
                    },
                    form: {
                        rules: [ // 表单校验规则
                            {
                                required: true,
                                message: '姓名必填项'
                            }
                        ],
                        component: {
                            span: 12,
                            placeholder: '请输入姓名'
                        },
                    }
                },
                dept: {
                    title: "部门",
                    search: { show: true },
                    type: 'dict-tree',
                    column: {
                        minWidth: 140,
                    },
                    dict: dict({
                        // cache: false,
                        isTree: true,
                        url: '/api/system/dept/',
                        value: "id", // 数据字典中value字段的属性名
                        label: "name"// 数据字典中label字段的属性名
                    }),
                    form: {
                        // 表单校验规则
                        rules: [{
                            required: true,
                            message: '必填项'
                        }],
                        component: {
                            span: 12,
                            pagination: true,
                            pmultiple: false,
                            select: {
                                valueKey: "id"
                            },
                            tree: {
                                valueKey: "id"
                            },
                            props: {
                                props: {
                                    // 为什么这里要写两层props
                                    // 因为props属性名与fs的动态渲染的props命名冲突，所以要多写一层
                                    label: "name",
                                    key: "id",
                                    value: "id",
                                    valueKey: "id"
                                }
                            }
                        }
                    },
                    component: {
                        name: 'foreignKey',
                        vModel: 'dept_name'
                    }
                },
                mobile: {
                    title: '手机号码',
                    search: {
                        disabled: true
                    },

                    type: 'input',
                    coulmn: {
                        minWidth: 110,
                    },
                    form: {
                        rules: [
                            {
                                max: 20,
                                message: '请输入正确的手机号码',
                                trigger: 'blur'
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '请输入正确的手机号码'
                            }
                        ],
                        itemProps: {
                            class: { yxtInput: true }
                        },
                        component: {
                            placeholder: '请输入手机号码'
                        }
                    }
                },
                email: {
                    title: '邮箱',
                    column: {
                        minWidth: 180,
                    },
                    form: {
                        rules: [
                            {
                                type: 'email',
                                message: '请输入正确的邮箱地址',
                                trigger: ['blur', 'change']
                            }
                        ],
                        component: {
                            placeholder: '请输入邮箱'
                        }
                    }
                },
                roles: {
                    title: "角色",
                    type: "dict-select",
                    dict: dict({
                        cache: false,
                        url: '/api/system/role/',
                        value: 'id', // 数据字典中value字段的属性名
                        label: 'name', // 数据字典中label字段的属性名
                        //本dict将会走此方法来获取远程字典数据
                        async getData(dict: { url: any; }) {
                            return axiosInstance({
                                url: dict.url,
                                params: {
                                    page: 1,
                                    limit: 10
                                }
                            }).then(res => {
                                return res.data.data
                            })
                        }
                    }),
                    column: {
                        minWidth: 120,
                    },
                    form: {
                        rules: [ // 表单校验规则
                            {
                                required: true,
                                message: '必填项'
                            }
                        ],
                        component: {
                            span: 12,
                            // pagination: true,
                            multiple: true,
                        }
                    },
                    component: {
                        name: 'manyToMany',
                        vModel: 'role_info',
                        children: 'name'
                    }
                },
                gender: {
                    title: "性别",
                    type: "dict-select",
                    // dict: genderDict,
                    dict: dict({
                        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
                        data: dictStore.dicts['gender']
                    }),
                    column: {
                        width: 70,
                    },
                    form: {
                        value: 0,
                        component: {
                            span: 12
                        }
                    },
                },
                user_type: {
                    title: '用户类型',
                    type: 'dict-select',
                    // dict: userTypeDict,
                    dict: dict({
                        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
                        data: dictStore.dicts['user_type']
                    }),
                    column: {
                        width: 145,
                    },
                    form: {
                        value: 0,
                        component: {
                            span: 12
                        }
                    }
                },
                is_active: {
                    title: "状态",
                    type: 'dict-radio',
                    dict: statusDict,
                    column: {
                        width: 70,
                    },
                    form: {
                        value: true,
                        component: {
                            span: 12
                        }
                    }
                },
                avatar: {
                    title: '头像',
                    type: "cropper-uploader",
                    column: {
                        width: 60,
                        align: 'left',
                        show: false,
                    },
                    form: {
                        component: {
                            // multiple: false,
                            limit: 1,// 限制5个文件
                            sizeLimit: 500 * 1024,// 不能超过限制
                            // span: 24
                            uploader: {
                                type: "form"
                            }
                        },
                        helper: '限制文件大小不能超过500k'
                    }
                },
            }
        }
    };
}