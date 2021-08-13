import Vue from "vue";

export default {
    namespaced: true,
    state: {
        items : [
            {id: 1, name: 'Oksigen', slug: 'oksigen', total: 12},
            {id: 2, name: 'Rumah Sakit', slug: 'rumah-sakit', total: 24},
            {id: 3, name: 'Isolasi Mandiri', slug: 'isolasi-mandiri', total: 14},
            {id: 4, name: 'Isolasi Mandiri Berbayar', slug: 'isolasi-mandiri-berbayar', total: 34},
            {id: 5, name: 'Ambulan', slug: 'ambulan', total: 19},
            {id: 6, name: 'Donor Plasma', slug: 'donor-plasma', total: 20}
        ],
        detailItem: {},
        loading: false,
    },
    mutations: {
        setItems(state, items) {
            state.items = items
        },
        setDetailItem(state, payload){
            state.detailItem = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
    },
    actions: {
        getDetailItem({commit, dispatch}, dosenId){
            commit('setLoading', true)
            const promise = Vue.axios.get(Vue.api('dosen.show', {dosen : dosenId}))
            promise.then(res => commit('setDetailItem', res.data.data))
                .catch(e => dispatch('onNotificationError', e, { root: true}))
                .finally(() => commit('setLoading', false))
            return promise
        },

        getItems({state, commit, dispatch}){
            commit('setLoading', true)
            const promise = Vue.axios.get(Vue.api('dosen.index'), {
                params: {
                    ...state.filter
                }
            })
            promise.then(res =>  commit('setItems', res.data.data))
                .catch(e => dispatch('onNotificationError', e, { root: true}))
                .finally(() => commit('setLoading', false))
            return promise
        },

        create({commit, dispatch}, data){
            commit('setLoading', true)
            const promise = Vue.axios.post(Vue.api('dosen.store'), data)
            promise
                .then(res => dispatch('onNotificationSuccess', res.data.message, { root: true}))
                .catch(e => {
                    commit('notification/setError', e, {root: true})
                    dispatch('onNotificationError', e, {root: true})
                })
                .finally(() => commit('setLoading', false))
            return promise
        },

        update ({commit, dispatch}, { dosenId, data}) {
            commit('setLoading', true)
            const promise = Vue.axios.put(Vue.api('dosen.update', { dosen: dosenId }), data)
            promise.then(res => dispatch('onNotificationSuccess', res.data.message, {root: true}))
                .catch((e) => {
                    commit('notification/setError', e, {root: true})
                    dispatch('onNotificationError', e, {root: true})
                })
                .finally(() => commit('setLoading', false))
            return promise
        },

        delete ({commit, dispatch}, dosenId) {
            commit('setLoading', true)
            const promise =  Vue.axios.delete(Vue.api('dosen.destroy', { dosen: dosenId}))
            promise.then(res => dispatch('onNotificationSuccess', res.data.message, {root: true}))
                .catch(e => dispatch('onNotificationError', e, { root: true}))
                .finally(() => commit('setLoading', false))
            return promise
        },
    }
}
