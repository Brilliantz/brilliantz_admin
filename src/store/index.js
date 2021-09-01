import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { vuexfireMutations } from 'vuexfire';

import webinar from './webinar'
import bimbinganPrakuliah from './bimbinganPrakuliah'
import tryout from './tryout'
import transaksi from './transaksi'
import submisi from './submisi'
import ranking from './ranking'
import users from './users'
import breadcrumbs from './breadcrumbs';
import notification from './notification'
import process from './process'

Vue.use(Vuex)

export default new Vuex.Store({
    state() {
        return {}
    },
    mutations: vuexfireMutations,
    plugins: [createPersistedState()],
    modules: {
        bimbinganPrakuliah,
        webinar,
        tryout,
        transaksi,
        submisi,
        ranking,
        users,
        breadcrumbs,
        notification,
        process
    }
})