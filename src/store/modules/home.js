const state = {
    isBreadcrumbShow: false,
    breadcrumbList: [  //父页面path必须可以在子页面路由中检索
        {
            path: '/',
            name: '首页'
        }
    ],
    isFirst: true
}

const getters = {

}

const actions = { //可异步
    updateBreadcrumb({ commit }, payload) {
        commit('updateBreadcrumb', payload)
    },
    toggleBreadcrumb({ commit }, payload) {
        commit('toggleBreadcrumb', payload)
    }
}

const mutations = { //同步
    updateBreadcrumb(state, payload) {
        let oldVal = payload.oldVal; //旧route信息
        let newVal = payload.newVal; //新route信息
        let v = {};
        if (newVal.path.indexOf(oldVal.path) == -1) { //不是父子关系
            if (state.isFirst) {
                state.isFirst = false
            } else {
                let len = state.breadcrumbList.length;
                let index = 0;
                for (let i = 1; i < len; i++) { //查找最后一个path的根path的索引
                    if (state.breadcrumbList[len - 1].path.indexOf(state.breadcrumbList[i].path) == 0 &&
                        state.breadcrumbList[len - 1].path != state.breadcrumbList[i].path) {
                        index = i;
                        break;
                    }
                }
                if (!index) {
                    state.breadcrumbList.pop();
                } else {
                    state.breadcrumbList.splice(index, len - index);
                }
            }
        }
        v.path = newVal.path;
        v.name = newVal.name;
        state.breadcrumbList.push(v);
    },
    toggleBreadcrumb(state, payload) {
        if (payload == '/desktop') {
            state.isBreadcrumbShow = false
        } else {
            state.isBreadcrumbShow = true
        }
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}