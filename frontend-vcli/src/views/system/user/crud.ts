/*
 * @Author: yifeng
 * @Date: 2022-09-17 22:58:09
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-18 22:51:46
 * @Description: 
 */
import * as api from "@/apis";
import useDictStore from "@/stores/system-dict";
import { dict } from "@fast-crud/fast-crud";
// md5加密
import md5 from 'js-md5'

export default function ({ expose }) {
    console.log("start expose");
    const dictStore = useDictStore()
    // const remoteDict = dict({
    //     cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
    //     url: "/mock/dicts/OpenStatusEnum",
    //     immediate: false
    //   });
    console.log(dictStore.dicts);
    const genderDict = dict({
        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
        data: dictStore.dicts['gender']
    })

    const pageRequest = async (query) => {
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
                        itemProps: {
                            class: { yxtInput: true }
                        }
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
                    type: 'tree-selector',
                    // dict: {
                    //     cache: false,
                    //     isTree: true,
                    //     url: deptPrefix,
                    //     value: 'id', // 数据字典中value字段的属性名
                    //     label: 'name' // 数据字典中label字段的属性名
                    // },
                    column: {
                        minWidth: 140,
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
                            pagination: true,
                            props: { multiple: false }
                        }
                    },
                    component: {
                        name: 'foreignKey',
                        valueBinding: 'dept_name'
                    }
                },
                mobile: {
                    title: '手机号码',
                    search: {
                        disabled: true
                    },
                    
                    type: 'input',
                    coulmn:{
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
                gender: {
                    title: "性别",
                    dict: genderDict,
                    type: "dict-select ",
                    column: {
                        width: 70,
                    },
                    form: {
                        // value: 1,
                        component: {
                            span: 12
                        }
                    },
                    // component: { props: { color: 'auto' } } // 自动染色
                },
                user_type: {
                    title: '用户类型',
                    dict: dict({
                        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
                        data: dictStore.dicts['user_type']
                    }),
                    type: 'dict-radio ',
                    column: {
                        width: 145,
                    },
                    form: {
                        show: false,
                        value: 0,
                        component: {
                            span: 12
                        }
                    }
                },
                role: {
                    title: "角色名称",
                    type: "text",
                    show: false,
                    search: { show: true },
                    // dict:{},
                    column: {
                        minWidth: 130,
                    },
                    form: {
                        rules: [ // 表单校验规则
                            {
                                required: true,
                                message: '必填项'
                            }
                        ],
                        itemProps: {
                            class: { yxtInput: true }
                        },
                        component: {
                            span: 12,
                            pagination: true,
                            props: { multiple: true },
                            elProps: {
                                columns: [
                                    {
                                        field: 'name',
                                        title: '角色名称'
                                    },
                                    {
                                        field: 'key',
                                        title: '权限标识'
                                    }
                                ]
                            }
                        }
                    },
                    component: {
                        name: 'manyToMany',
                        valueBinding: 'role_info',
                        children: 'name'
                    }
                },
                is_active: {
                    title: "状态",
                    type: "text",
                    dict: dict({
                        cloneable: false, // 关闭cloneable，任何情况下，都使用同一个dict
                        data: dictStore.dicts['button_status_bool']
                    }),
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
                    type: 'avatar-cropper',
                    column: {
                        width: 60,
                        align: 'left',
                    },
                    form: {
                        component: {
                            props: {
                                elProps: { // 与el-uploader 配置一致
                                    multiple: false,
                                    limit: 1 // 限制5个文件
                                },
                                sizeLimit: 500 * 1024 // 不能超过限制
                            },
                            span: 24
                        },
                        helper: '限制文件大小不能超过500k'
                    }
                },
            }
        }
    };
}