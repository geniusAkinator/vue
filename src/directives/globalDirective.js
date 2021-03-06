/**
 *点击外侧指令 
 */
const clickoutside = {
    bind(el, binding, vnode) {
        function documentHandler(e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener("click", documentHandler);
    },
    unbind(el, binding) {
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    }
};

/**
 *拖拽指令（无边缘检测） 
 */
const drag = {
    bind(el, binding, vnode) {
        let odiv = el;
        odiv.onmousedown = (e) => {
            let disX = e.clientX - odiv.offsetLeft;
            let disY = e.clientY - odiv.offsetTop;
            document.onmousemove = (e) => {
                let left = e.clientX - disX;
                let top = e.clientY - disY;
                odiv.style.left = left + 'px';
                odiv.style.top = top + 'px';
            };
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }
}

/**
 * 
 */

const permission = {
    bind(el, binding, vnode) {
        console.log(el, binding.value);
    }
}

export default {
    clickoutside,
    drag,
    permission
}