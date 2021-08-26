import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { vuexfireMutations } from 'vuexfire';

// import admin from './admin'
// import tests from './tests'
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
        // admin,
        // tests,
        submisi,
        ranking,
        users,
        breadcrumbs,
        notification,
        process
    }
})