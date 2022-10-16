/*
 * @Author: yifeng
 * @Date: 2022-10-12 19:28:42
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-12 20:10:38
 * @Description: 
 */

import { axiosInstance } from "@/utils"
import { dict } from "@fast-crud/fast-crud"
import { h } from "vue"
import { deptBaseUrl } from "@/apis/system/dept"

interface paramSchema {
    description: {
        showForm: boolean | null,
        showTable: boolean | null
    },
    dept_belong_id: {
        showForm: boolean | null,
        showTable: boolean | null
    },
    modifier_name: {
        showForm: boolean | null,
        showTable: boolean | null
    },
    update_datetime: {
        showForm: boolean | null,
        showTable: boolean | null
    },
    create_datetime: {
        showForm: boolean | null,
        showTable: boolean | null
    }
}
const defaultParam: paramSchema = {
    description: {
        showForm: true,
        showTable: false
    },
    dept_belong_id: {
        showForm: false,
        showTable: false
    },
    modifier_name: {
        showForm: false,
        showTable: false
    },
    update_datetime: {
        showForm: false,
        showTable: true
    },
    create_datetime: {
        showForm: false,
        showTable: true
    }
}

// 默认Columns 结尾 showForm：显示在form中，showTable：显示在table中
export const commonEndColumns = function (param: paramSchema = defaultParam) {
    /**
     * @param {Object} {
      description: {
        showForm: true,
        showTable: false
      },
      dept_belong_id: {
        showForm: false,
        showTable: false
      },
      modifier_name: {
        showForm: false,
        showTable: false
      },
      update_datetime: {
        showForm: false,
        showTable: true
      },
      create_datetime: {
        showForm: false,
        showTable: true
      }
    }
     */
    const showData = {
        description: {
            showForm: (param.description && param.description.showForm) !== undefined ? param.description.showForm : true,
            showTable: (param.description && param.description.showTable) !== undefined ? param.description.showTable : false
        },
        dept_belong_id: {
            showForm: (param.dept_belong_id && param.dept_belong_id.showForm) !== undefined ? param.dept_belong_id.showForm : false,
            showTable: (param.dept_belong_id && param.dept_belong_id.showTable) !== undefined ? param.dept_belong_id.showTable : false
        },
        modifier_name: {
            showForm: (param.modifier_name && param.modifier_name.showForm) !== undefined ? param.modifier_name.showForm : false,
            showTable: (param.modifier_name && param.modifier_name.showTable) !== undefined ? param.modifier_name.showTable : false
        },
        update_datetime: {
            showForm: (param.update_datetime && param.update_datetime.showForm) !== undefined ? param.update_datetime.showForm : false,
            showTable: (param.update_datetime && param.update_datetime.showTable) !== undefined ? param.update_datetime.showTable : true
        },
        create_datetime: {
            showForm: (param.create_datetime && param.create_datetime.showForm) !== undefined ? param.create_datetime.showForm : false,
            showTable: (param.create_datetime && param.create_datetime.showTable) !== undefined ? param.create_datetime.showTable : true
        },
        is_deleted: {
            showForm: (param.is_deleted && param.is_deleted.showForm) !== undefined ? param.is_deleted.showForm : false,
            showTable: (param.is_deleted && param.is_deleted.showTable) !== undefined ? param.is_deleted.showTable : false
        }
    }
    return {
        description: {
            title: '备注',

            type: 'textarea',
            column: {
                show: showData.description.showTable,
            },
            form: {
                show: !showData.description.showForm,
                component: {
                    placeholder: '请输入内容',
                    showWordLimit: true,
                    maxlength: '200',
                    props: {
                        type: 'textarea'
                    }
                }
            }
        },
        modifier_name: {
            title: '修改人',
            column: {
                show: showData.modifier_name.showTable,
                width: 100,
            },
            form: {
                show: !showData.modifier_name.showForm
            }
        },
        dept_belong_id: {
            title: '数据归属部门',
            type: 'dict-tree',
            column: {
                width: 150,
                show: showData.dept_belong_id.showTable,
            },
            dict: dict({
                cache: true,
                url: deptBaseUrl,
                isTree: true,
                value: 'id', // 数据字典中value字段的属性名
                label: 'name', // 数据字典中label字段的属性名
                children: 'children', // 数据字典中children字段的属性名
                async getData() {
                    const ret = await axiosInstance({
                        url: url,
                        params: { limit: 999, status: 1 }
                    })
                    return ret.data.data
                },
            }),
            form: {
                show: !showData.dept_belong_id.showForm,
                component: {
                    props: {
                        elProps: {
                            select: {
                                valueKey: "id"
                            },
                            tree: {
                                valueKey: "id"
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
                    }
                },
                helper: {
                    render() {
                        return h(
                            // 1. 要渲染的标签名称：第一个参数【必需】
                            ElAlert,
                            // 2. 渲染标签的属性：第二个参数【可选】
                            {
                                title: "默认不填则为当前创建用户的部门ID",
                                type: "info",
                            },
                        );
                    },
                }
            }
        },
        update_datetime: {
            title: '更新时间',

            type: 'datetime',
            sortable: true,
            column: {
                width: 160,
                show: showData.update_datetime.showTable,
            },
            form: {
                show: !showData.update_datetime.showForm
            }
        },
        create_datetime: {
            title: '创建时间',
            type: 'datetime',
            sortable: true,
            search: {
                show: !showData.create_datetime.showForm,
                width: 240,
                component: { // 查询框组件配置，默认根据form配置生成
                    name: 'el-date-picker',
                    props: {
                        type: 'daterange',
                        'range-separator': '至',
                        'start-placeholder': '开始',
                        'end-placeholder': '结束',
                        valueFormat: 'yyyy-MM-dd'
                    }
                }
            },
            column: {
                width: 160,
                show: showData.create_datetime.showTable,
            },
            form: {
                show: !showData.create_datetime.showForm
            }
        },
        is_deleted: {
            title: '是否软删除',
            type: 'dict-radio',
            dict: dict({
                data: [{ label: '是', value: true }, { label: '否', value: false }]
            }),
            search: {
                show: !showData.is_deleted.showForm
            },
            column: {
                width: 160,
                show: showData.is_deleted.showTable,
            },
            form: {
                show: !showData.is_deleted.showForm
            }
        }
    }
}