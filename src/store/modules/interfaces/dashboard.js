export default {
    name: "setting",
    namespaced: true,
    state: {
        drawer: false,
        barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
        barImage: "",
    },
    mutations: {
        SET_BAR_IMAGE (state, payload) {
            state.barImage = payload
        },
        SET_DRAWER (state, payload) {
            state.drawer = payload
        }
    },
    actions: {
        SET_DRAWER: ({commit}, val) => {
            commit('drawer', val);
        }
    },
}
