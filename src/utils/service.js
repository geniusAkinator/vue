/** 
 * 拦截HTTP请求
*/
import axios from "axios"
import baseURL from "./baseUrl"
import { Message } from 'element-ui';

const request = axios.create({
    baseURL: baseURL, // api的base_url
    timeout: 30000 // 请求超时时间
});

// request拦截器
request.interceptors.request.use(config => {
    //此处进行token等数据处理
    //showLoding
    config.headers['Content-Type'] = "application/json";
    return config
}, error => {
    // Do something with request error
    //show error message
    Message({
        showClose: true,
        message: error,
        type: "warning"
    });
    return Promise.reject(error)
});

// respone拦截器
request.interceptors.response.use(
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
            message: "请求错误",
            type: "error",
        });
        return Promise.reject(error)
    }
);

export default request