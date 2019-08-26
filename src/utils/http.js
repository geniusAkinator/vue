import axios from "axios"
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
            }
        }).then(
            res => {
                resolve(res)
            }
        ).catch(() => {
            reject()
        })
    }
}
export default HttpRequest