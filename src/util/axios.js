import axios from "axios";
import { Message } from "element-ui";

const http = axios.create({
    baseURL: "",
    timeout: process.env.NODE_ENV !== 'production' ? 1000 * 60 * 1 : 1000 * 60,
    headers: {
        "Cache-Control": "no-store"
    }
});

/**
 * 判断字符中有没有？
 * @param url
 * @returns {boolean}
 */
function getParamsEndFlag(url) {
    if (url.indexOf("?") > 0) {
        // 有参数
        return "&";
    } else {
        return "?";
    }
}

// http request 拦截器
http.interceptors.request.use(
    config => {
        if (config.url && config.method == 'get') {
            // 添加时间戳，每次请求加载服务器，防止IE浏览器缓存
            config.url +=
                getParamsEndFlag(config.url) +
                "timestamp=" +
                new Date().getTime();
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// 响应拦截器及异常处理
http.interceptors.response.use(
    response => {
        //console.log("response", response)
        let res = response.data;
        // 请求成功
        switch (res.code) {
            case 500: // 请求失败
                Message.error(res.message ? res.message : "请求服务发生异常！");
                break;
            case 200: // 请求成功
                return Promise.resolve(res);
            case 401: // 401: 未登录或者登录状态过期，跳转登录页
                Message.warning(res.message ? res.message : "未登录或者登录状态过期");
                //window.location.href = res.data;
                break;
            case 403: // 403: 没有权限
                Message.warning(res.message ? res.message : "没有权限！");
                // window.location.href = res.data
                break;
            case 505: // 505: 没有数据
                return Promise.resolve(res);
            default:
                Message.warning(res.message ? res.message : res.code + ' 错误');
                break;
        }
        return Promise.reject(response);
    },
    err => {
        if (err && err.response) {
            switch (err.response.status) {
                case 404:
                    console.error("请求错误，未找到该资源！");
                    break;
                case 500:
                    console.error("服务端出错！");
                    break;
                default:
                    console.error(`连接错误${err.response.status}！`);
            }
        } else {
            console.error(
                "连接到服务器失败或者服务器" +
                axios.defaults.timeout / 1000 +
                "秒内没有响应！"
            );
        }
        return Promise.resolve(err.response);
    }
);

export default http;
