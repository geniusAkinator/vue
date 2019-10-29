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
    // config.headers.Authorization = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzIzNTg4NDksInVzZXJuYW1lIjoiYWRtaW4ifQ.atwpyjpzSvHx5Hi6ppL7I6HcwZq7kl-0SL_7YKUTBD8"
    return config
}, error => {
    // Do something with request error
    //show error message
    console.log(error)
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
            message: "网络异常 连接超时",
            type: "error",
        });
        return Promise.reject(error)
    }
);

export default Request