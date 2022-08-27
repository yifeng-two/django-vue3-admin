/*
 * @Author: yifeng
 * @Date: 2022-08-14 21:54:03
 * @LastEditors: yifeng
 * @LastEditTime: 2022-08-24 20:45:39
 * @Description: 
 */
// import { initWebSocket, sendWebsocket, closeWebsocket } from "./websocket"
// export {
//     initWebSocket,
//     sendWebsocket,
//     closeWebsocket
// }
import { createSocket } from "./websocket"
import { loginUser, rules } from "./loginValidators";
import { registerUser, registerRules } from "./registerValidators";
export {
    createSocket,
    loginUser,
    rules,
    registerUser,
    registerRules
}