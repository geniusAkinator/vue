import axios from "axios"
import originJSONP from 'jsonp'
import utils from "./utils"

const HttpRequest = {
    getRequest({ url, data = {}, method = "GET" }) {
        return new Promise((resolve, reject) => {
            this._getRequest(url, resolve, reject, data, method)
        })
    },
    _getRequest(url, resolve, reject, data, method) {
        axios({
            url: url,
            data: data,
            method: method,
            header: {
                "content-type": "application/json"
            },
            transformRequest: [function (data) {
                return utils.param(data)
            }],
        }).then(
            res => {
                resolve(res.data)
            }
        ).catch(() => {
            reject()
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