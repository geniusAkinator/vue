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
    },
    closest(el, selector) {      //查找祖先元素
        var matchesSelector =
            el.matches ||
            el.webkitMatchesSelector ||
            el.mozMatchesSelector ||
            el.msMatchesSelector;
        while (el) {
            if (matchesSelector.call(el, selector)) {
                break;
            }
            el = el.parentElement;
        }
        return el;
    },
    getLinearGradientColor(){ //计算梯度颜色

    }
}
export default Utils