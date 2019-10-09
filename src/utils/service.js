/**
 * axios拦截http请求
 * @module Request
 */
import axios from "axios"
import baseURL from "./baseUrl"
import { Message } from 'element-ui';

const Request = axios.create({
    baseURL: baseURL, // api的base_url
    timeout: 30000 // 请求超时时间
});

// request拦截器
Request.interceptors.request.use(config => {
    //此处进行token等数据处理
    //showLoding
    config.headers['Content-Type'] = "application/json";
    return config
}, error => {
    // Do something with request error
    //show error message
    Message({
        showClose: true,
        message: "登录身份失效",
        type: "warning"
    });
    return Promise.reject(error)
});

// respone拦截器
Request.interceptors.response.use(
    response => {
        let res = response.data;
        if (res.code !== 200) {
            Message({
                showClose: true,
                message: res.message,
                type: "error"
            });
            return Promise.reject(res);
        }
        return res

    },
    error => {
        //此处进行异常处理
        Message({
            showClose: true,
            message: "接口异常",
            type: "error",
        });
        return Promise.reject(error)
    }
);

export default Request