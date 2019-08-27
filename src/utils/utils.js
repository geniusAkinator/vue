const Utils = {
    decounce(fn, t) { //防抖
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
    Throttle(fn, t) { //节流
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
    }
}
export default Utils