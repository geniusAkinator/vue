const state = {
    isBreadcumbShow: false
}

const getters = {

}

const actions = { //异步
    updateBreadcrumb({ commit }, payload) {
        commit('setTab', payload)
    }
}

const mutations = { //同步
    setTab(state, payload) {
        if (payload == '/desktop') {
            state.isBreadcumbShow = false
        } else {
            state.isBreadcumbShow = true
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