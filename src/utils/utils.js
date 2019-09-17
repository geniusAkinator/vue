const Utils = {
    decounce(fn, t) { //函数防抖
        let delay = t || 500;
        let timer = null;
        return function () {
            let _this = this;
            let args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(_this, args);
            }, delay);
        };
    },
    throttle(fn, t) { //函数节流
        let last;
        let timer;
        let interval = t || 500;
        return function () {
            let args = arguments;
            let now = +new Date();
            if (last && now - last < interval) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    last = now;
                    fn.apply(this, args);
                }, interval);
            } else {
                last = now;
                fn.apply(this, args);
            }
        }
    },
    param(data) {
        let url = ''
        for (var k in data) {
            let value = data[k] !== undefined ? data[k] : ''
            url += '&' + k + '=' + encodeURIComponent(value)
        }
        return url ? url.substring(1) : ''
    }
}
export default Utils