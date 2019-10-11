/**
 * axios http请求和jsonp
 * @module HttpRequest
 */
import axios from "axios"
import originJSONP from 'jsonp'
import utils from "./utils"
import baseURL from "./baseUrl"

const HttpRequest = {
    // getRequest({ url, data = {}, method = "GET" }) {
    //     return new Promise((resolve, reject) => {
    //         this._getRequest(url, resolve, reject, data, method)
    //     }).catch((e) => { })
    // },
    // _getRequest(url, resolve, reject, data, method) {
    //     axios({
    //         url: url,
    //         baseURL: baseURL,
    //         data: data,
    //         method: method,
    //         params: data,
    //         header: {
    //             "content-type": "application/json"
    //         },
    //         // transformRequest: [function (data) {
    //         //     return utils.param(data)
    //         // }],
    //     }).then(
    //         res => {
    //             resolve(res.data)
    //         }
    //     ).catch((err) => {
    //         reject(err)
    //     })
    // },
    getRequestUpload(url, data, callback) { //文件上传
        console.log(baseURL, url, data)
        return new Promise((resolve, reject) => {
            // axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'; 

            axios.post(baseURL + url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            });
            // axios({
            //     url: baseURL + url,
            //     method: 'POST',
            //     data: data,
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     },
            //     onUploadProgress: function (progressEvent) { //callback回调上传进度
            //         if (progressEvent.lengthComputable) { callback(progressEvent); }
            //     },
            // }).then(
            //     res => {
            //         resolve(res.data)
            //     }
            // ).catch(
            //     err => {
            //         reject(err)
            //     }
            // )
        })
    },
    getRequestJsonp({ url, data }) {
        url += (url.indexOf('?') < 0 ? '?' : '&') + utils.param(data)
        return new Promise(function (resolve, reject) {
            originJSONP(url, '', function (err, data) {
                if (!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        })
    }
}
export default HttpRequest