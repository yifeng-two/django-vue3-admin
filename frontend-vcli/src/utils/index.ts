/*
 * @Author: yifeng
 * @Date: 2022-08-14 21:54:03
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-11 10:09:19
 * @Description: 
 */
// import { initWebSocket, sendWebsocket, closeWebsocket } from "./websocket"
// export {
//     initWebSocket,
//     sendWebsocket,
//     closeWebsocket
// }
import { createSocket } from "./websocket"
import { loginUser, rules } from "../views/system/loginRegister/utils/loginValidators";
import { registerUser, registerRules } from "../views/system/loginRegister/utils/registerValidators";
export {
    createSocket,
    loginUser,
    rules,
    registerUser,
    registerRules
}