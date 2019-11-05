const state = {
    userInfo: {

    }
}

const getters = {

}


const actions = {
    setUserInfo({ commit }, payload) {
        commit('setUserInfo', payload)
    }
}

const mutations = {
    setUserInfo(state, payload) {
        state.userInfo = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}