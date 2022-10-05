/*
 * @Author: yifeng
 * @Date: 2022-08-23 23:35:28
 * @LastEditors: yifeng
 * @LastEditTime: 2022-08-25 22:26:08
 * @Description: 
 */
import { ElMessage } from "element-plus";

 interface Ioptions {
    // token
    token?: string;
    // 发送心跳间隔时间
    heart_time?: number;
    //检查链接状态时间
    check_time?: number;
    //断线后重连间隔时间
    lock_time?: number;
    // 重连次数 -1 则不限制
    reconnectCount?: number;
}

const createSocket = (url: string, callback: (e: any) => void) => {

    class Ws {
        private url: string = url //socket 地址
        private callback: (e: any) => void = callback
        private heart_time: number = 3000 //心跳时间
        private check_time: number = 3000 //检查链接状态时间
        private lock_time: number = 4000 //重连时间
        private reconnectCount: number = 3 // 重连次数 -1 则不限制
        public ws: WebSocket | undefined  //socket实例
        private h_timer: NodeJS.Timeout | undefined //心跳定时器
        private c_timer: NodeJS.Timeout | undefined //检查链接定时器
        private l_timer: NodeJS.Timeout | undefined //重连定时器
        private isLock: boolean = false //重连锁
        private token: string | undefined //token
        private reconnect_count: number | undefined // 重连次数 -1 则不限制

        constructor() {
            this.init()
          }

        public init(options: Ioptions = {}): void {

            const { token, heart_time, check_time, lock_time, reconnectCount } = options

            if (token) {
                this.token = token
            }

            if (heart_time) {
                this.heart_time = heart_time
            }

            if (check_time) {
                this.check_time = check_time
            }

            if (lock_time) {
                this.lock_time = lock_time
            }

            if (reconnectCount) {
                this.reconnectCount = reconnectCount
            }

            if (this.url == '') {
                throw new Error('socket链接地址不能为空')
            }

            this.wsInit()
        }

        // 处理有token时的socket链接地址
        private getUrl(): string {
            if (this.token !== undefined) {
                return `${this.url}?token=${this.token}`
            } else {
                return `${this.url}`
            }
        }

        // 心跳
        private heartCheck(): void {
            this.reset()
            this.h_timer = setTimeout(() => {
                (this.ws as WebSocket).send('type:ping')
                this.c_timer = setTimeout(() => {
                    if ((this.ws as WebSocket).readyState !== 1) {
                        (this.ws as WebSocket).close()
                    }
                }, this.check_time)
            }, this.heart_time)
        }

        // 重连
        private reconnect(): void {
            if (this.isLock) {
                return
            }

            this.isLock = true
            this.l_timer && clearTimeout(this.l_timer)
            this.l_timer = setTimeout(() => {
                this.wsInit()
                this.isLock = false
            }, this.lock_time)
        }

        // 重置
        private reset(): void {
            this.h_timer && clearTimeout(this.h_timer)
            this.c_timer && clearTimeout(this.c_timer)
        }

        // 初始化socket
        public wsInit(): void {

            if (!window.WebSocket) {
                ElMessage.error({
                    message: "您的浏览器不支持websocket,请升级或更换浏览器！",
                    type: "error",
                    center: true,
                });
                return;
            } else {
                this.ws = new WebSocket(this.getUrl())
            }
            
            this.ws.onopen = () => {
                // console.log("open web socket");
                this.heartCheck()
            }

            this.ws.onclose = (e) => {
                this.reconnect_count = this.reconnectCount
                if (e.code == 1006) {
                    if (this.reconnect_count) {
                        // console.log("reconnect",this.reconnect_count);
                        this.reconnect()
                        this.reconnect_count--;
                    } else {
                        ElMessage.error({
                            message: "websocket连接不上,请刷新页面或联系开发人员",
                            type: "error",
                            center: true,
                        });
                    }
                }
                // this.reconnect()
            }

            this.ws.onerror = () => {

                this.reconnect()
            }

            this.ws.onmessage = (e) => {
                const data = JSON.parse(e.data);//根据自己的需要对接收到的数据进行格式化
                // console.log("webSocketOnMessage",data);
                this.heartCheck()
                this.callback(data)
            }
        }
    }

    return new Ws
}

export {
    createSocket
}


