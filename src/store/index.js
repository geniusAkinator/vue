import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
// import createPersistedState from "vuex-persistedstate"
// import * as Cookies from 'js-cookie'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules: {
        home
    },
    strict: debug,
    plugins: [
        // createPersistedState({
        //     storage: {
        //         getItem: key => Cookies.get(key),
        //         setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
        //         removeItem: key => Cookies.remove(key)
        //     }
        // })
    ]
})


export default store