const state = {
    themeList: [],
    themeIndex: 0
}

const getters = {
    nowTheme: state => {
        return state.themeList[state.themeIndex].color
    }
}

const actions = {
    updateIndex({ commit }, payload) {
        commit('updateIndex', payload)
    },
    initThemeList({ commit }) {
        commit('initThemeList')
    }
}

const mutations = {
    updateIndex(state, payload) {
        state.themeIndex = payload
    },
    initThemeList(state) {
        state.themeList = [
            {
                name: "复古",
                color: [
                    "#0780cf",
                    "#765005",
                    "#fa6d1d",
                    "#0e2c82",
                    "#b6b51f",
                    "#da1f18",
                    "#701866",
                    "#f47a75",
                    "#009db2",
                    "#024b51",
                ]
            },
            {
                name: "新特性",
                color: [
                    "#63b2ee",
                    "#76da91",
                    "#f8cb7f",
                    "#f89588",
                    "#7cd6cf",
                    "#9192ab",
                    "#7898e1",
                    "#efa666",
                    "#eddd86",
                    "#9987ce",
                ]
            },
            {
                name: "渐变",
                color: [
                    "#71ae46",
                    "#96b744",
                    "#c4cc38",
                    "#ebe12a",
                    "#eab026",
                    "#e3852b",
                    "#d85d2a",
                    "#ce2626",
                    "#ac2026",
                ]
            },
            {
                name: "清新",
                color: [
                    "#00a8e1",
                    "#99cc00",
                    "#e30039",
                    "#fcd300",
                    "#800080",
                    "#00994e",
                    "#ff6600",
                    "#808000",
                    "#db00c2",
                    "#008080",
                    "#0000ff",
                    "#c8cc00"
                ]
            },
            {
                name: "科技",
                color: [
                    "#05f8d6",
                    "#0082fc",
                    "#fdd845",
                    "#22ed7c",
                    "#09b0d3",
                    "#1d27c9",
                    "#f9e264",
                    "#f47a75",
                    "#009db2",
                    "#024b51",
                    "#0780cf",
                ]
            }
        ]
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}