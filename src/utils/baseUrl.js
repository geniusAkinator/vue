/**
 * api baseUrl
 * @module HttpRequest
 */
let BaseUrl = "";   //这里是一个默认的url，可以没有
switch (process.env.NODE_ENV) {
    case 'development':
        BaseUrl = "http://192.168.1.146:8888"  //开发环境url
        break
    case 'production':
        BaseUrl = ""   //生产环境url
        break
}
export default BaseUrl;
