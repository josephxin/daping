import { debounce, throttle } from 'lodash'
import util from '@/util/util'

/**
 * 函数节流装饰器
 * @param {number} wait 节流的毫秒
 * @param {Object} options 节流选项对象
 * [options.leading=true] (boolean): 指定调用在节流开始前。
 * [options.trailing=true] (boolean): 指定调用在节流结束后。
 */
export const throttleDecorator = function(wait, options = {}) {
    return function(target, name, descriptor) {
        descriptor.value = throttle(descriptor.value, wait, options)
    }
}

/**
 * 函数防抖装饰器
 * @param {number} wait 需要延迟的毫秒数。
 * @param {Object} options 选项对象
 * [options.leading=false] (boolean): 指定在延迟开始前调用。
 * [options.maxWait] (number): 设置 func 允许被延迟的最大值。
 * [options.trailing=true] (boolean): 指定在延迟结束后调用。
 */
export const debounceDecorator = function(wait, options = {}) {
    return function(target, name, descriptor) {
        //console.log(target, name, descriptor);
        descriptor.value = debounce(descriptor.value, wait, options)
    }
}

const color_red = 'color:red;';
const color_blue = 'color:blue;';
const color_green = 'color:green;';
const color_orange = 'color:rgb(253,137,33);';
const color_gray = 'color:gray;';
let logNum = 0;
/**
 * 日志装饰器
 * @param {String} fileName 文件名
 * @param {Array} params 参数名
 */
export const logDecorator = function(fileName, params = []) {
    /**
     * @param target 对应调用方法的对象
     * @param name 对应属性方法的名称
     * @param descriptor 对应属性方法的修饰符
     */
    return function(target, name, descriptor) {
        //初始化的时候就会执行
        //console.log(target, name, descriptor)
        const fn = descriptor.value
        descriptor.value = function(...rest) {
            //执行方法的时候会执行
            //console.log(window.debug);
            if (window.debug) {
                let time = util.getNowTimeWithMs()
                    //console.log(params)
                let paramObj = {}
                if (params && Array.isArray(params) && params.length) {
                    params.map((item, i) => {
                        paramObj[item] = rest[i]
                    })
                }
                let useTime = `执行耗时`
                console.group(`事件日志-${new Date().getTime()}：`)
                console.time(useTime)
                let ret
                let level = "[info]";
                let func_error = null;
                try {
                    ret = fn.apply(this, rest)
                } catch (error) {
                    level = '[error]';
                    func_error = error
                }
                console.log(`%c${time} %c${fileName} %c${level} %c method:${name}`, color_green, color_orange, level === '[info]' ? color_gray : color_red, color_blue)
                console.log("params:", paramObj)
                console.log("return:", util.deepCopy(ret))
                func_error ? console.error(func_error) : '';
                console.timeEnd(useTime)
                console.groupEnd()
                return ret
            } else {
                let ret
                try {
                    ret = fn.apply(this, rest)
                } catch (error) {
                    console.error('函数内部报错：', error)
                }
                return ret
            }
        }
    }
}