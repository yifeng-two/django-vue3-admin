/*
 * @Author: yifeng
 * @Date: 2022-08-06 21:18:11
 * @LastEditors: yifeng
 * @LastEditTime: 2022-08-07 12:46:20
 * @Description: 
 */
import { createStore } from "vuex";
const store = createStore({
    state: {
        isCollapse: false
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        }
    },
    actions: {},
    modules: {
        
    }
})

export default store;