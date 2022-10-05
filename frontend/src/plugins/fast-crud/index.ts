/*
 * @Author: yifeng
 * @Date: 2022-09-18 10:15:09
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-28 22:40:00
 * @Description: 
 */
// 引入fast-crud
import { FastCrud } from "@fast-crud/fast-crud";
import "@fast-crud/fast-crud/dist/style.css";
// element 
import UiElement from "@fast-crud/ui-element";
import axiosInstance from '@/utils/net/axiosInstance'
import XEUtils from "xe-utils";
// // 引入fast-crud

function install(app, options: any = {}) {
    // // 先安装ui
    app.use(UiElement);
    // 然后安装FastCrud
    app.use(FastCrud, {
        //    i18n, //i18n配置，可选，默认使用中文，具体用法请看demo里的 src/i18n/index.js 文件
        // 此处配置公共的dictRequest（字典请求）
        //根据dict的url，异步返回一个字典数组
        async dictRequest({ dict }) {
            return await axiosInstance({
                url: dict.url,
                // params: dict.body,
                method: 'get'
            }).then(res => {
                if (dict.isTree) {
                    return XEUtils.toArrayTree(res.data.data, { parentKey: 'parent', strict: true })
                } else {
                    return res.data.data
                }
            })
        },
        //公共crud配置
        commonOptions(context: any = {}) {
            return {
                // table: {
                //     size: "default",
                //     pagination: false
                // },
                rowHandle: {
                    width: 300,
                    buttons: {
                        view: {
                            text: null,
                            icon: "ion:eye-outline",
                            size: "default"
                        },
                        edit: {
                            text: null,
                            icon: "ion:create-outline",
                            size: "default"
                        },
                        remove: {
                            type: "danger",
                            text: null,
                            icon: "ion:trash-outline",
                            size: "default"
                        }
                    },
                    dropdown: {
                        more: {
                            size: "default"
                        }
                    },
                },
                request: {
                    //接口请求配置
                    //你项目后台接口大概率与fast-crud所需要的返回结构不一致，所以需要配置此项
                    //请参考文档http://fast-crud.docmirror.cn/api/crud-options/request.html
                    transformQuery: ({ page, form, sort }) => {
                        // page: { pageSize: 每页条数, currentPage: 当前页码 }
                        // form:{查询框获得的参数}
                        // sort:{prop:排序字段key,order:string,升序还是降序,asc:boolean，是否升序}
                        // return { page, form, sort };

                        const limit = page.pageSize;
                        const currentPage = page.currentPage ?? 1;
                        const offset = limit * (currentPage - 1);

                        // sort = sort == null ? {} : sort;
                        // return {
                        //     page: {
                        //         limit,
                        //         offset
                        //     },
                        //     query: form,
                        //     sort
                        // };
                        //改造成你的后端所能接受的参数结构
                        return {  limit: limit,page: currentPage, ...form };
                    },
                    transformRes: ({ res }) => {
                        //将pageRequest的返回数据，转换为fast-crud所需要的格式
                        // const pageSize = res.limit;
                        // let currentPage = res.offset / pageSize;
                        // if (res.offset % pageSize === 0) {
                        //     currentPage++;
                        // }
                        // return { currentPage, pageSize, ...res };
                        //return {records,currentPage,pageSize,total};
                        // {records:[]列表数据,currentPage:number当前页码,pageSize:number每页条数,total:number总记录数}
                        return { records: res.data.data, currentPage: res.data.current, pageSize: res.data.limit, total: res.data.total };
                    },
                    form: {
                        display: "flex", //表单布局
                        // labelWidth: "100px" //表单label宽度
                    },
                },
            }
        },
    })
};

export default {
    install
}
