/*
 * @Author: yifeng
 * @Date: 2022-09-17 16:57:51
 * @LastEditors: yifeng
 * @LastEditTime: 2022-09-17 17:18:50
 * @Description: 
 */

interface LogInterface {
    capsule(title: any, info: any, type: string): void,
    default(text: any): void,
    primary(text: any): void,
    success(text: any): void,
    warning(text: any): void,
    danger(text: any): void,
}
class Log implements LogInterface {
    /**
     * @description 打印一个 [ title | text ] 样式的信息
     * @param {String} title title text
     * @param {String} info info text
     * @param {String} type style
     */
    capsule(title: string, info: string, type: string = 'primary') {
        console.log(
            `%c ${title} %c ${info} %c`,
            'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
            `background:${typeColor(type)}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
            'background:transparent'
        )
    }
    /**
     * @description 打印 default 样式的文字
     */
    default (text: any) {
        colorful([{ text }])
    }

    /**
     * @description 打印 primary 样式的文字
     */
    primary (text: any) {
        colorful([{ text, type: 'primary' }])
    }

    /**
     * @description 打印 success 样式的文字
     */
    success(text: any) {
        colorful([{ text, type: 'success' }])
    }

    /**
     * @description 打印 warning 样式的文字
     */
    warning (text: any) {
        colorful([{ text, type: 'warning' }])
    }

    /**
     * @description 打印 danger 样式的文字
     */
    danger(text: any) {
        colorful([{ text, type: 'danger' }])
    }


}

/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | text ]
 */
function typeColor(type: string = 'default') {
    let color = ''
    switch (type) {
        case 'default': color = '#35495E'; break
        case 'primary': color = '#3488ff'; break
        case 'success': color = '#43B883'; break
        case 'warning': color = '#e6a23c'; break
        case 'danger': color = '#f56c6c'; break
        default: break
    }
    return color
}

/**
 * @description 打印彩色文字
 */
const colorful = function (textArr) {
    console.log(
        `%c${textArr.map((t: { text: any }) => t.text || '').join('%c')}`,
        ...textArr.map((t: { type: string | undefined }) => `color: ${typeColor(t.type)};`)
    )
}

const log = new Log()
export default log
