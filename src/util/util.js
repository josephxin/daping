import { getComObj } from '@/compLib/CompTemplateReg'
import _ from "lodash"
import dayjs from "dayjs"
// 非标准时间需传入第二个参数指定时间格式
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

/**
 * 判断是否为空
 */
function validatenull(val) {
    // 特殊判断
    if (val && parseInt(val) === 0) return false;
    const list = ['$parent'];
    if (typeof val === 'boolean') {
        return false;
    }
    if (typeof val === 'number') {
        return false;
    }
    if (val instanceof Array) {
        if (val.length === 0) return true;
    } else if (val instanceof Object) {
        val = deepClone(val);
        list.forEach(ele => {
            delete val[ele];
        });
        if (JSON.stringify(val) === '{}') return true;
    } else {
        if (
            val === 'null' ||
            val == null ||
            val === 'undefined' ||
            val === undefined ||
            val === ''
        ) {
            return true;
        }
        return false;
    }
    return false;
}

/**
 * 设置px像素
 */
export const setPx = (val, defval = '') => {
    if (validatenull(val)) val = defval;
    if (validatenull(val)) return '';
    val = val + '';
    if (val.indexOf('%') === -1) {
        val = val + 'px';
    }
    return val;
};

export function getFixed(val = 0, len = 2) {
    return Number(val.toFixed(len));
}
export default {
    localMode: 1,
    serverMode: 2,
    isBigScreen: true, //是否大屏模式

    /**
     * 数据保存的模式：分为本地存储和服务器存储；
     * 1为本地存储，即localstorage
     * 2为服务器存储
     */
    dataSaveMode: function() {
        return this.localMode
    },

    appServerURL: function() {
        return `${process.env.VUE_APP_BASE_URL}${process.env.VUE_APP_BUILD_DIR}/designer/`
    },
    disapiURL: function() {
        return `${process.env.VUE_APP_BASE_URL}${process.env.VUE_APP_BUILD_DIR}/disapi/`
    },
    apiURL: function() {
        return `${process.env.VUE_APP_BASE_URL}${process.env.VUE_APP_BUILD_DIR}/api/`
    },
    metadataURL: function() {
        return `${process.env.VUE_APP_BASE_URL}${process.env.VUE_APP_BUILD_DIR}/metadata-manage/`
    },
    getServelURL: function() {
        return `${process.env.VUE_APP_BASE_URL}${process.env.VUE_APP_BUILD_DIR}/datavisual_app/`
    },

    isNum: function(value) {
        return /^[1-9]\d*(\.\d*)?$/.test(value)
    },

    isEmpty: (val) => {
        return !val || val === ''
    },
    guid: function() {
        /**
         * @return {string}
         */
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16)
                .substring(1); //如："9c3f"
        }

        return ('a' + S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    },
    getLocalStore: function(key) {
        if (this.isEmpty(key)) {
            return null
        }

        if (window.localStorage) {
            return window.localStorage.getItem(key)
        }
    },

    setLocalStore: function(key, value) {
        if (this.isEmpty(key)) {
            return
        }

        if (window.localStorage) {
            window.localStorage.setItem(key, value)
        }
    },
    screenType: () => this.isBigScreen,
    // 深度复制js对象
    // 来自vuex的util
    deepCopy: function(obj) {
        // just return if obj is immutable value
        if (obj === null || typeof obj !== 'object') {
            return obj
        }

        const copy = Array.isArray(obj) ? [] : {}

        Object.keys(obj).forEach(key => {
            copy[key] = this.deepCopy(obj[key])
        })

        return copy
    },
    entries: function(obj) {
        let arr = [];
        for (let key in obj) {
            arr.push(JSON.parse(`{"${key}":"${obj[key]}"}`))
        }
        return arr;
    },
    randomStr(n) {
        const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        let res = '',
            len = chars.length - 1
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * len)
            res += chars[id]
        }
        return res
    },

    getQueryString(name) {
        let query = window.location.search
        if (!query) {
            return null
        }
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        let result = query.substr(1).match(reg)
        if (result != null) {
            return unescape(result[2])
        }
        return null
    },
    //获取url中"?"符后的字串，返回值为对象
    getAllUrlParams() {
        var search = window.location.search.substr(1);
        //console.log(search);
        if (search) {
            var searchArr = search.split('&');
            var obj = {};
            searchArr.map((item, i) => {
                var arr = item.split('=');
                let key = decodeURI(arr[0]);
                let value = decodeURI(arr[1]);
                //console.log(key, value);
                obj[key] = value;
            });
            return obj;
        } else {
            return null;
        }
    },
    getNowTime(separator = '-') {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        var date = now.getDate();
        date = date < 10 ? "0" + date : date;
        var hour = now.getHours();
        hour = hour < 10 ? "0" + hour : hour;
        var minute = now.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        var second = now.getSeconds();
        second = second < 10 ? "0" + second : second;
        if (separator == 'chinese') {
            return year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
        }
        return year + separator + month + separator + date + ' ' + hour + ':' + minute + ':' + second;
    },
    getNowTimeWithMs(separator = '-') {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        var date = now.getDate();
        date = date < 10 ? "0" + date : date;
        var hour = now.getHours();
        hour = hour < 10 ? "0" + hour : hour;
        var minute = now.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        var second = now.getSeconds();
        second = second < 10 ? "0" + second : second;
        var ss = now.getMilliseconds();
        ss = ss < 10 ? "0" + ss : ss;
        return year + separator + month + separator + date + ' ' + hour + ':' + minute + ':' + second + '.' + ss;
    },
    showFun(val, styleConf) {
        //console.log("showFun -> val, styleConf", val, val.rules)
        let showVal = val.rules ? val.rules(styleConf) : true
        return showVal;
    },
    // 获取组件本地配置
    getCompLocalConf(compType) {
        //console.log("getCompLocalConf -> compType", compType)
        let template = getComObj(compType)
        if (!template) {
            return null
        }
        let compConf = {
            'name': template.cn_name,
            'state': null,
            'box': this.deepCopy(template.style.box),
            'style': this.deepCopy(template.style.conf),
            'property': this.deepCopy(template.style.property),
            'isHighlight': false,
            'isActive': false,
            'customCode': ''
        }
        if (template.data) {
            compConf.data = {
                conf: this.deepCopy(template.data.conf),
                datasource: this.deepCopy(template.data.datasource)
            }
            if (template.getStaticTemplateData) {
                let staticTemplate = template.getStaticTemplateData();
                compConf.staticTempletData = this.deepCopy(staticTemplate.datasource)
                compConf.staticTempletDataConf = this.deepCopy(staticTemplate.conf)
            }
        }

        if (template.linkage) {
            compConf.linkage = this.deepCopy(template.linkage.conf)
        }

        if (template.carousel) {
            compConf.carousel = this.deepCopy(template.carousel.conf)
        }
        if (template.tooltip) {
            compConf.tooltip = this.deepCopy(template.tooltip.conf)
        }
        return compConf
    },
    // 去掉字符串左右空格
    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "")
    },
    // 获取自定义表达式
    getCustomExpressionParams(str) {
        if (!str) return null
        let preg = /\${([^\}]+)\}/g
        return str.match(preg)
    },
    //将表达式解析为以数组
    getCustomExpressionCloumn(expressionParam) {
        let str = expressionParam.replace(/\${/, '').replace(/}/, '')
        str = str.split("|")
        let exp = {}
        exp.exp = this.trim(str[0]).split('.')
        exp.format = ''
        if (str.length > 1) exp.format = this.trim(str[1])
        return exp
    },
    dateFormat(value, format, vm) {
        if (!value) {
            return '';
        }
        let isValid = dayjs(value).isValid();
        //console.log(isValid);
        if (!isValid) {
            vm.$message.error(vm.compConf.name + '组件接收的时间格式不合法！')
            return '';
        }
        let dateObj = new Date(value);
        if (!format) {
            return dateObj;
        }
        if (format == 'timestamp') {
            return dateObj.getTime();
        }

        var year = dateObj.getFullYear();
        var month = dateObj.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        var date = dateObj.getDate();
        date = date < 10 ? "0" + date : date;
        var hour = dateObj.getHours();
        hour = hour < 10 ? "0" + hour : hour;
        var minute = dateObj.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        var second = dateObj.getSeconds();
        second = second < 10 ? "0" + second : second;

        if (format == 'yyyy') {
            return year;
        }
        if (format == 'yyyy-MM') {
            return year + '-' + month;
        }
        if (format == 'yyyy/MM') {
            return year + '/' + month;
        }
        if (format == 'yyyy-MM-dd') {
            return year + '-' + month + '-' + date;
        }
        if (format == 'yyyy/MM/dd') {
            return year + '/' + month + '/' + date;
        }
        if (format == 'yyyy-MM-dd HH:mm:ss') {
            return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
        }
        if (format == 'yyyy/MM/dd HH:mm:ss') {
            return year + '/' + month + '/' + date + ' ' + hour + ':' + minute + ':' + second;
        }
        return value;
    },
    //保存、修改、另存页面时，需要提供页面中引用的数据集code列表，需要去重。
    getDataSetCodeList(compMap) {
        let dataSetCodeList = [];
        for (let compId in compMap) {
            let comp = compMap[compId];
            let data = comp.data;
            if (_.isPlainObject(data)) {
                let datasource = data.datasource;
                if (_.isPlainObject(datasource)) {
                    let type = datasource.type;
                    if (type != 'static') {
                        let conf = data.conf;
                        if (_.isPlainObject(conf)) {
                            let datasetSelectedIds = conf.datasetSelectedIds;
                            if (_.isArray(datasetSelectedIds) && datasetSelectedIds.length) {
                                //console.log(compId, datasetSelectedIds);
                                datasetSelectedIds.map((item, i) => {
                                    if (!dataSetCodeList.includes(item)) {
                                        dataSetCodeList.push(item)
                                    }
                                })
                            }
                        }
                    }
                }
            }
        }
        console.log('dataSetCodeList', dataSetCodeList);
        return dataSetCodeList;
    },
}