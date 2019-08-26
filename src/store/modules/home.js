const state = {
    
}

const getters = {

}

const actions = { //异步
    addTab({ commit }, payload) {
        commit('setTab', payload)
    }
}

const mutations = { //同步
    setTab(state, payload) {
        
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}