import axios from 'axios'
import qs from "qs"
import { Message } from 'element-ui'

const apifix = ''
// create an axios instance
const http = axios.create({
    baseURL: "",
    timeout: process.env.NODE_ENV !== 'production' ? 1000 * 60 * 1 : 1000 * 60,
    headers: {
        token: '',
        'content-type': 'application/json',
    }
})
// request interceptor
http.interceptors.request.use(
    config => {
        //console.log(config);
        config.url = apifix + config.url
        config.cancelToken = new axios.CancelToken(cancel => {
            if (!window._axiosPromiseCancelAll) window._axiosPromiseCancelAll = []
            window._axiosPromiseCancelAll.push({ cancel })
        })
        return config
    },
    error => {
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// respone interceptor
http.interceptors.response.use(
    response => {
        if (response.status === 401) {
            Message.error('您没有访问权限，请联系管理员')
            return Promise.reject(false)
        }
        const res = response.data
        return Promise.resolve(res)
    },
    error => {
        if (error.code === 'ECONNABORTED') {
            Message.error('网络请求超时，请稍后重试')
            return Promise.reject(error)
        }
        if (error.message) Message.error(error.message)
        return Promise.reject(error)
    }
)
export default http