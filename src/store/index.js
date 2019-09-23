import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import theme from './modules/theme'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules: {
        home,
        theme
    },
    strict: debug,
    plugins: [
        createPersistedState()
    ]
})


export default store