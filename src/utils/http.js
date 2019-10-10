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
    uploadFile({ payload, callback }) { //文件上传
        return new Promise((resolve, reject) => {
            axios({
                url: url,
                method: 'POST',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: payload,
                onUploadProgress: function (progressEvent) { //callback回调上传进度
                    if (progressEvent.lengthComputable) { callback(progressEvent); }
                },
            }).then(
                res => {
                    resolve(res.data)
                }
            ).catch(
                err => {
                    reject(err)
                }
            )
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