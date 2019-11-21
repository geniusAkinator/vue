
import api from "@/api/index";
import global from "@/utils/global";
const state = {
    geo: {}
}

const getters = {}

const actions = {
    initGeo({ commit }) {
        let geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                api
                    .getGeoData({
                        ak: global.BAIDU_MAP_AK,
                        location: `${r.point.lat},${r.point.lng}`,
                        coordtype: "wgs84ll",
                        output: "json"
                    })
                    .then(res => {
                        if (res.status == BMAP_STATUS_SUCCESS) {
                            commit('initGeo', res.result)
                        }
                    }).catch(_ => { });
            }
        });
    },
}

const mutations = {
    initGeo(state, payload) { //初始化地理位置
        state.geo = Object.assign({}, payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}