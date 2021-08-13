import Vue from "vue";

export default {
    namespaced: true,
    state: {
        items : {
            data:[
                {id: 1, name: 'Oksigen',description: 'oksigen', slug: 'oksigen', contact: '09824124', total: 12},
                {id: 2, name: 'Oksigen Budi', description: 'oksigen budi', contact: '09824124', total: 24},
                {id: 3, name: 'Oksigen Remi', description: 'oksigen remi', contact: '09824241', total: 14},
                {id: 4, name: 'Oksigen Lord yoshi', description: 'oksigen Lord yoshi', contact: '098241512', total: 34},
                {id: 5, name: 'Oksigen Maju', description: 'oksigen maju', contact: '098241523', total: 19},
                {id: 6, name: 'Oksigen Plasma', description: 'oksigen plasma', contact: '0982412424', total: 20}
            ]
        },
        filter: {
            per_page: 5,
            page: 1,
            total: 12,
            sortBy: [],
            desc: [],
            search: ''
        },
        detailItem: {},
        loading: false,
    },
    getters: {
        filter(state) {
            state.filter.per_page = state.filter.per_page ? parseInt(state.filter.per_page) : 5
            state.filter.page = state.filter.page ? parseInt(state.filter.page) : 1
            state.filter.total = state.filter.total ? parseInt(state.filter.total) : null
            state.filter.sortBy = state.filter.sortBy ? state.filter.sortBy : []
            state.filter.desc = state.filter.desc ? state.filter.desc : []
            state.filter.search = state.filter.search ? state.filter.search : null
            return state.filter
        }
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
        setFilter (state, filter) {
            filter.per_page ? state.filter.per_page = filter.per_page : ''
            filter.page ? state.filter.page = filter.page : ''
            filter.sortBy ? state.filter = {...state.filter, ...filter}  : null
            filter.desc ? state.filter = {...state.filter, ...filter} : null
            filter.search ? state.filter = {...state.filter, ...filter} : null
        },
    },
    actions: {
        getDetailItem({ state, commit}, categoryItemId){
            commit('setLoading', true)
            // const promise = Vue.axios.get(Vue.api('dosen.show', {dosen : dosenId}))
            // promise.then(res => commit('setDetailItem', res.data.data))
            //     .catch(e => dispatch('onNotificationError', e, { root: true}))
            //     .finally(() => commit('setLoading', false))
            const promise = state.items.data
              .find(data => data.id === categoryItemId)
            console.log(promise)
            commit('setDetailItem', promise)
            commit('setLoading', false)

            return true
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
