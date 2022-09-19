/*
 * @Author: yifeng
 * @Date: 2022-09-17 22:58:09
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-18 13:12:22
 * @Description: 
 */
import * as api from "@/apis";
export default function ({ expose }) {

    const pageRequest = async (query) => {
        return await api.getDictList(query);
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
            form: {
                display: "flex"
            },
            columns: {
                _index: {
                    title: "序号",
                    form: { show: false },
                    column: {
                        // type: "index",
                        align: "center",
                        width: "90px",
                        columnSetDisabled: true, //禁止在列设置中选择
                        formatter: (context) => {
                            //计算序号,你可以自定义计算规则，此处为翻页累加
                            const index = context.index ?? 1;
                            const pagination = expose.crudBinding.value.pagination;
                            return ((pagination.currentPage ?? 1) - 1) * pagination.pageSize + index + 1;
                        }
                    }
                },
                label: {
                    title: "字典名称",
                    type: "text",
                    search: { show: true }
                },
                value: {
                    title: "字典编号",
                    type: "text",
                    search: { show: true }
                },
                status: {
                    title: "状态",
                    type: "radio",
                },
                sort: {
                    title: "排序",
                    type: "number",
                    form: {
                        show:false,
                        order: 0
                    }
                },
                remark: {
                    title: "备注",
                    type: "text",
                },
                create_datatime: {
                    title: "创建时间",
                    type: "datetime",
                    form: {
                        show:false,
                    }
                },
                update_datatime: {
                    title: "更新时间",
                    type: "datetime",
                    form: {
                        show:false,
                    }
                },
               
            }
        }
    };
}
