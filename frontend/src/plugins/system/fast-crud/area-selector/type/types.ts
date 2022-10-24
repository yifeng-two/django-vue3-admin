/*
 * @Author: yifeng
 * @Date: 2022-10-18 19:35:25
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-20 20:21:43
 * @Description: 
 */

import { dict } from '@fast-crud/fast-crud'
import pcaData from '../area-data'
const cacheKey = '__default_area_tree_dict_data__'
function getData() {
    return pcaData
}

export default function () {
    return {
        'area-selector': {
            dict: dict({
                url: cacheKey,
                label: 'name',
                value: 'code',
                isTree: true,
                cache: true,
                prototype: true,
                getData
            }),
            search: {
                show: false,
                component:
                {
                    value: []/* 修复重置表单时返回[null]的bug */,
                    props: {
                        elProps: {
                            clearable: true
                        }
                    }
                }
            },
            column: {
                component: {
                    name: 'fs-dict-cascader-format',
                    props: {}
                },
            },
            form: {
                component: {
                    name: 'fs-dict-cascader',
                    props: {
                        select: {
                            valueKey: "code"
                        },
                        tree: {
                            valueKey: "code"
                        },
                        elProps: {
                            filterable: true
                        },
                        props: {
                            // 为什么这里要写两层props
                            // 因为props属性名与fs的动态渲染的props命名冲突，所以要多写一层
                            label: "name",
                            key: "code",
                            value: "code",
                            valueKey: "code",
                        },
                    }
                }
            },
        },
        'area-multi-selector': {
            dict: dict({
                url: cacheKey,
                label: 'name',
                value: 'code',
                isTree: true,
                cache: true,
                prototype: true,
                getData,
            }),
            search: {
                show: false,
                component: {
                    value: []/* 修复重置表单时返回[null]的bug */,
                    props: {
                        elProps: {
                            clearable: true
                        }
                    }
                }
            },
            column: {
                component: {
                    name: 'fs-dict-cascader-format',
                    props: {
                        multiple: true
                    }
                },
            },
            form: {
                component: {
                    name: 'fs-dict-cascader',
                    props: {
                        select: {
                            valueKey: "code"
                        },
                        tree: {
                            valueKey: "code"
                        },
                        props: {
                            // 为什么这里要写两层props
                            // 因为props属性名与fs的动态渲染的props命名冲突，所以要多写一层
                            label: "name",
                            key: "code",
                            value: "code",
                            valueKey: "code",
                        },
                        elProps: {
                            filterable: true,
                            props: {
                                multiple: true
                            },
                            'collapse-tags': true
                        }
                    }
                }
            },
        },
        // 'area-tree-selector': {
        //     dict: dict({
        //         url: cacheKey,
        //         label: 'name',
        //         value: 'code',
        //         isTree: true,
        //         getData,
        //     }),
        //     column:{
        //         component: {
        //             name: 'fs-values-format',
        //             props: {}
        //         },
        //     },
        //     form: {
        //         component: {
        //             name: 'd2p-tree-selector',
        //             props: {}
        //         }
        //     },

        // }
    };
}